import os
import time
import subprocess
import requests
import psutil
import threading
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PREVIEW_PORT = 4173
PREVIEW_URL = f"http://localhost:{PREVIEW_PORT}"

# Configuración del Benchmark
TOTAL_REQUESTS = 200
CONCURRENCY = 20

class Benchmark:
    def __init__(self):
        self.success_count = 0
        self.error_count = 0
        self.response_times = []
        self.cpu_usage = []
        self.mem_usage = []
        self._lock = threading.Lock()
        self.is_running = True

    def fetch(self):
        start = time.time()
        try:
            res = requests.get(PREVIEW_URL, timeout=5)
            duration = time.time() - start
            with self._lock:
                if res.status_code == 200:
                    self.success_count += 1
                else:
                    self.error_count += 1
                self.response_times.append(duration)
        except Exception:
            with self._lock:
                self.error_count += 1

    def monitor_resources(self, pid):
        try:
            process = psutil.Process(pid)
            # Find the actual node process (since npm might spawn node)
            node_process = process
            children = process.children(recursive=True)
            for child in children:
                if 'node' in child.name().lower():
                    node_process = child
                    break
                    
            while self.is_running:
                try:
                    cpu = node_process.cpu_percent(interval=0.1)
                    mem = node_process.memory_info().rss / (1024 * 1024) # MB
                    with self._lock:
                        self.cpu_usage.append(cpu)
                        self.mem_usage.append(mem)
                except psutil.NoSuchProcess:
                    break
        except Exception as e:
            print(f"[-] Error monitoreando recursos: {e}")

def run_tests():
    print("=" * 60)
    print("     TEST DE RENDIMIENTO Y BENCHMARK DE RECURSOS     ")
    print("=" * 60)

    print("[*] Iniciando servidor de previsualización (npm run preview)...")
    
    # Iniciar servidor
    server_process = subprocess.Popen(
        ['npm', 'run', 'preview'],
        cwd=PROJECT_ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        shell=True # Windows
    )

    try:
        # Esperar a que levante
        print("[*] Esperando a que el servidor esté listo...")
        server_ready = False
        for _ in range(30): # esperar max 15 segundos
            try:
                res = requests.get(PREVIEW_URL, timeout=1)
                if res.status_code == 200:
                    server_ready = True
                    break
            except:
                pass
            time.sleep(0.5)

        if not server_ready:
            print("[-] Error: El servidor no se inició a tiempo. Asegúrate de ejecutar 'npm run build' antes.")
            return

        print(f"[+] Servidor listo en {PREVIEW_URL}. Iniciando Benchmark...")
        benchmark = Benchmark()
        
        # Iniciar thread de monitoreo
        monitor_thread = threading.Thread(target=benchmark.monitor_resources, args=(server_process.pid,))
        monitor_thread.start()

        # Ejecutar peticiones concurrentes
        start_time = time.time()
        with ThreadPoolExecutor(max_workers=CONCURRENCY) as executor:
            for _ in range(TOTAL_REQUESTS):
                executor.submit(benchmark.fetch)

        total_time = time.time() - start_time
        benchmark.is_running = False
        monitor_thread.join()

        # Calcular resultados
        avg_time = sum(benchmark.response_times) / len(benchmark.response_times) if benchmark.response_times else 0
        avg_cpu = sum(benchmark.cpu_usage) / len(benchmark.cpu_usage) if benchmark.cpu_usage else 0
        max_cpu = max(benchmark.cpu_usage) if benchmark.cpu_usage else 0
        max_mem = max(benchmark.mem_usage) if benchmark.mem_usage else 0

        print("\n=== RESULTADOS DEL BENCHMARK ===")
        print(f"Peticiones totales: {TOTAL_REQUESTS}")
        print(f"Concurrencia:       {CONCURRENCY}")
        print(f"Tiempo total:       {total_time:.2f} segundos")
        print(f"Reqs/segundo:       {TOTAL_REQUESTS/total_time:.2f}")
        print(f"Éxitos:             {benchmark.success_count}")
        print(f"Errores:            {benchmark.error_count}")
        print(f"Tiempo res. prom.:  {avg_time*1000:.2f} ms")
        
        print("\n=== USO DE RECURSOS (Node.js) ===")
        print(f"CPU Pico:           {max_cpu:.1f}%")
        print(f"CPU Promedio:       {avg_cpu:.1f}%")
        print(f"Memoria (RAM) Pico: {max_mem:.1f} MB")
        print("=================================\n")

        if benchmark.error_count == 0 and avg_time < 0.5:
            print("ESTADO: OK (Rendimiento Óptimo)")
        else:
            print("ESTADO: ADVERTENCIA (Revisar posibles cuellos de botella)")

    finally:
        print("[*] Deteniendo servidor...")
        # Matar proceso (en Windows matar shell y subprocessos)
        subprocess.call(['taskkill', '/F', '/T', '/PID', str(server_process.pid)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

if __name__ == '__main__':
    run_tests()
