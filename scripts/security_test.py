import os
import re
import json
import subprocess
from pathlib import Path

# Configuraciones
PROJECT_ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = PROJECT_ROOT / 'src'
ENV_FILE = PROJECT_ROOT / '.env'

# Patrones para detectar posibles secretos (SAST básico)
# Evitar falsos positivos tanto como sea posible
SECRET_PATTERNS = {
    'API_KEY': re.compile(r'(?i)(?:api_key|apikey|secret|token|password)[\s]*[:=][\s]*["\'][a-zA-Z0-9_\-]{16,}["\']'),
    'JWT_TOKEN': re.compile(r'eyJ[a-zA-Z0-9_=]+(?:\.[a-zA-Z0-9_=]+){2,}'),
    'PRIVATE_KEY': re.compile(r'-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----')
}

def check_for_secrets():
    print("[*] Iniciando Análisis Estático (SAST) en busca de secretos expuestos...")
    findings = []
    
    # 1. Escanear src/
    if SRC_DIR.exists():
        for root, _, files in os.walk(SRC_DIR):
            for file in files:
                if file.endswith(('.js', '.jsx', '.css', '.html', '.json')):
                    filepath = Path(root) / file
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            content = f.read()
                            for name, pattern in SECRET_PATTERNS.items():
                                matches = pattern.finditer(content)
                                for match in matches:
                                    # Ocultar el secreto encontrado por privacidad
                                    findings.append(f"[!] Posible {name} encontrado en: {filepath.relative_to(PROJECT_ROOT)} (Línea {content[:match.start()].count(chr(10)) + 1})")
                    except Exception as e:
                        print(f"[-] Error leyendo {file}: {e}")
    else:
        print("[-] El directorio src/ no existe.")

    # 2. Revisar si hay un .env local no ignorado por git (teóricamente no debería)
    if ENV_FILE.exists():
        print("[!] Nota: Archivo .env detectado localmente. Asegúrate de que esté en tu .gitignore.")

    if findings:
        print("\n[!] ¡PELIGRO! Se encontraron los siguientes posibles secretos (Revisa y elimina):")
        for f in findings:
            print("  ", f)
    else:
        print("[+] Análisis estático finalizado. No se detectaron secretos obvios en el código fuente.")
    return len(findings)

def check_npm_audit():
    print("\n[*] Ejecutando auditoría de dependencias (npm audit)...")
    try:
        # Ejecutar npm audit en formato json
        result = subprocess.run(
            ['npm', 'audit', '--json'], 
            cwd=PROJECT_ROOT, 
            capture_output=True, 
            text=True, 
            shell=True # Necesario en Windows para npm
        )
        
        try:
            audit_data = json.loads(result.stdout)
            metadata = audit_data.get('metadata', {}).get('vulnerabilities', {})
            total_vulns = sum(metadata.values())
            
            if total_vulns == 0:
                print("[+] npm audit completado: 0 vulnerabilidades encontradas.")
            else:
                print(f"[!] npm audit encontró vulnerabilidades: {metadata}")
                print("    Te sugerimos ejecutar 'npm audit fix' para resolverlas de ser posible.")
        except json.JSONDecodeError:
            print("[-] Error: No se pudo parsear la salida de npm audit.")

    except Exception as e:
        print(f"[-] Ocurrió un error al ejecutar npm audit: {e}")

if __name__ == '__main__':
    print("=" * 60)
    print("        AUDITORÍA DE CIBERSEGURIDAD (TEST)       ")
    print("=" * 60)
    secrets_count = check_for_secrets()
    check_npm_audit()
    print("=" * 60)
    if secrets_count > 0:
        print("ESTADO: ADVERTENCIA (Secretos encontrados)")
    else:
        print("ESTADO: OK")
