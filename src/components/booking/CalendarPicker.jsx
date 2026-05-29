import { useState } from 'react';
import { esDiaBloqueado } from '../../data/horariosDisponibles';
import horariosDisponibles from '../../data/horariosDisponibles';
import { getNombreMes, getDiasSemanaCortos } from '../../utils/formatDate';
import styles from './CalendarPicker.module.css';

const CalendarPicker = ({ selectedDate, onSelectDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const diasSemana = getDiasSemanaCortos();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDayDisabled = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    if (date < todayStart) return true;

    const maxDate = new Date(todayStart);
    maxDate.setDate(maxDate.getDate() + horariosDisponibles.maxDiasFuturo);
    if (date > maxDate) return true;

    const dayOfWeek = date.getDay();
    if (!horariosDisponibles.horariosPorDia[dayOfWeek]) return true;

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (esDiaBloqueado(dateStr)) return true;

    return false;
  };

  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === selectedDate;
  };

  const handleDayClick = (day) => {
    if (isDayDisabled(day)) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSelectDate(dateStr);
  };

  const canGoPrev = currentMonth > today.getMonth() || currentYear > today.getFullYear();

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navBtn} onClick={prevMonth} disabled={!canGoPrev} aria-label="Mes anterior">
          ‹
        </button>
        <span className={styles.monthYear}>
          {getNombreMes(currentMonth)} {currentYear}
        </span>
        <button className={styles.navBtn} onClick={nextMonth} aria-label="Siguiente mes">
          ›
        </button>
      </div>

      <div className={styles.weekdays}>
        {diasSemana.map((dia) => (
          <div key={dia} className={styles.weekday}>{dia}</div>
        ))}
      </div>

      <div className={styles.days}>
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className={`${styles.day} ${styles.empty}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const disabled = isDayDisabled(day);

          return (
            <button
              key={day}
              className={[
                styles.day,
                disabled ? styles.disabled : styles.available,
                isToday(day) ? styles.today : '',
                isSelected(day) ? styles.selected : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              aria-label={`${day} de ${getNombreMes(currentMonth)}`}
              type="button"
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPicker;
