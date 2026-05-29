import { useState, useCallback } from 'react';
import horariosDisponibles, { generarSlots, esDiaBloqueado, esFechaValida } from '../data/horariosDisponibles';
import { obtenerCitasPorDia, guardarCita, generarMensajeWhatsApp, generarICS } from '../services/bookingService';
import { formatFechaConDia } from '../utils/formatDate';
import servicios from '../data/servicios';

const PASOS = ['servicio', 'fecha', 'hora', 'confirmacion'];

const useBooking = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    telefono: '',
    email: '',
    nota: ''
  });
  const [citaConfirmada, setCitaConfirmada] = useState(null);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [citasDelDia, setCitasDelDia] = useState([]);

  const paso = PASOS[pasoActual];

  const seleccionarServicio = useCallback((servicioId) => {
    const servicio = servicios.find(s => s.id === servicioId);
    setServicioSeleccionado(servicio);
  }, []);

  const seleccionarFecha = useCallback(async (fecha) => {
    setFechaSeleccionada(fecha);
    setHoraSeleccionada(null);
    setCargando(true);
    try {
      const citas = await obtenerCitasPorDia(fecha);
      setCitasDelDia(citas);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, []);

  const seleccionarHora = useCallback((hora) => {
    setHoraSeleccionada(hora);
  }, []);

  const actualizarDatosCliente = useCallback((campo, valor) => {
    setDatosCliente(prev => ({ ...prev, [campo]: valor }));
    setErrores(prev => ({ ...prev, [campo]: null }));
  }, []);

  const obtenerSlotsDisponibles = useCallback(() => {
    if (!fechaSeleccionada || !servicioSeleccionado) return [];
    
    const fecha = new Date(fechaSeleccionada + 'T00:00:00');
    const diaSemana = fecha.getDay();
    const duracion = parseInt(servicioSeleccionado.duracion) || 60;
    
    const slots = generarSlots(diaSemana, fechaSeleccionada, duracion);
    
    return slots.map(slot => ({
      ...slot,
      disponible: !citasDelDia.some(c => c.hora === slot.hora)
    }));
  }, [fechaSeleccionada, servicioSeleccionado, citasDelDia]);

  const validarPaso = useCallback(() => {
    const nuevosErrores = {};

    switch (paso) {
      case 'servicio':
        if (!servicioSeleccionado) {
          nuevosErrores.servicio = 'Selecciona un servicio';
        }
        break;
      case 'fecha':
        if (!fechaSeleccionada) {
          nuevosErrores.fecha = 'Selecciona una fecha';
        }
        break;
      case 'hora':
        if (!horaSeleccionada) {
          nuevosErrores.hora = 'Selecciona un horario';
        }
        break;
      case 'confirmacion':
        if (!datosCliente.nombre.trim()) {
          nuevosErrores.nombre = 'El nombre es requerido';
        }
        if (!datosCliente.telefono.trim()) {
          nuevosErrores.telefono = 'El teléfono es requerido';
        }
        if (!datosCliente.email.trim()) {
          nuevosErrores.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosCliente.email)) {
          nuevosErrores.email = 'Email inválido';
        }
        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }, [paso, servicioSeleccionado, fechaSeleccionada, horaSeleccionada, datosCliente]);

  const siguiente = useCallback(() => {
    if (!validarPaso()) return false;
    if (pasoActual < PASOS.length - 1) {
      setPasoActual(prev => prev + 1);
      return true;
    }
    return false;
  }, [pasoActual, validarPaso]);

  const anterior = useCallback(() => {
    if (pasoActual > 0) {
      setPasoActual(prev => prev - 1);
      setErrores({});
    }
  }, [pasoActual]);

  const confirmarCita = useCallback(async () => {
    if (!validarPaso()) return null;

    setCargando(true);
    setErrores({});
    try {
      const fechaFormateada = formatFechaConDia(fechaSeleccionada);

      const datosCita = {
        servicio: servicioSeleccionado.nombre,
        servicioId: servicioSeleccionado.id,
        fecha: fechaSeleccionada,
        fechaFormateada,
        hora: horaSeleccionada,
        ...datosCliente
      };

      const citaGuardada = await guardarCita(datosCita);
      setCitaConfirmada(citaGuardada);
      return citaGuardada;
    } catch (error) {
      setErrores(prev => ({ ...prev, confirmacion: error.message || 'Error al guardar cita' }));
      return null;
    } finally {
      setCargando(false);
    }
  }, [validarPaso, servicioSeleccionado, fechaSeleccionada, horaSeleccionada, datosCliente]);

  const enviarWhatsApp = useCallback(() => {
    if (!citaConfirmada) return;
    const numero = import.meta.env.VITE_WHATSAPP_NUMBER || '573001234567';
    const mensaje = generarMensajeWhatsApp(citaConfirmada);
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
  }, [citaConfirmada]);

  const descargarICS = useCallback(() => {
    if (!citaConfirmada) return;
    generarICS(citaConfirmada);
  }, [citaConfirmada]);

  const reiniciar = useCallback(() => {
    setPasoActual(0);
    setServicioSeleccionado(null);
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
    setDatosCliente({ nombre: '', telefono: '', email: '', nota: '' });
    setCitaConfirmada(null);
    setErrores({});
    setCitasDelDia([]);
  }, []);

  return {
    // Estado
    paso,
    pasoActual,
    totalPasos: PASOS.length,
    servicioSeleccionado,
    fechaSeleccionada,
    horaSeleccionada,
    datosCliente,
    citaConfirmada,
    errores,
    cargando,

    // Acciones
    seleccionarServicio,
    seleccionarFecha,
    seleccionarHora,
    actualizarDatosCliente,
    obtenerSlotsDisponibles,
    siguiente,
    anterior,
    confirmarCita,
    enviarWhatsApp,
    descargarICS,
    reiniciar,
  };
};

export default useBooking;
