import React, { useState, useEffect } from "react";
import { Clock, CheckCircle } from "lucide-react";
import { servicioAgendadoStore } from '../../../stores/ServicesScheduling';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSchedulerProps {
  selectedDate: Date | null;
  onTimeSelect: (time: string) => void;
  selectedTime: string | null;
}

interface TimeSlotsByCategory {
  earlyMorning: TimeSlot[];
  morning: TimeSlot[];
  afternoon: TimeSlot[];
  evening: TimeSlot[];
}

export default function TimeScheduler({ selectedDate, onTimeSelect, selectedTime }: TimeSchedulerProps) {
  const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlotsByCategory>({
    earlyMorning: [],
    morning: [],
    afternoon: [],
    evening: []
  });

  // Efecto para actualizar los horarios cuando cambia la fecha seleccionada
  useEffect(() => {
    if (selectedDate) {
      // Obtenemos el servicio seleccionado para conocer su duración
      const servicio = servicioAgendadoStore.get().data.servicio;
      const profesional = servicioAgendadoStore.get().data.persona;
      
      // Generamos franjas horarias según la duración del servicio
      const allSlots = generateTimeSlots(servicio?.duracion || 30);
      
      // Filtramos los horarios según las franjas que trabaja el profesional
      let filteredSlots = filterSlotsByProfessionalSchedule(allSlots, profesional);
      
      // Filtramos los horarios que ya han pasado si la fecha seleccionada es la fecha actual
      const now = new Date();
      if (isSameDay(selectedDate, now)) {
        filteredSlots = filterPastTimeSlots(filteredSlots, now);
      }
      
      setFilteredTimeSlots(filteredSlots);
    }
  }, [selectedDate]);
  
  // Función para convertir una cadena de hora ("9:00 AM") a minutos desde medianoche
  const timeToMinutes = (timeString: string): number => {
    const [timePart, ampm] = timeString.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    
    let totalMinutes = hours * 60 + minutes;
    
    // Ajustar para PM
    if (ampm === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    }
    // Ajustar para 12 AM
    else if (ampm === 'AM' && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    
    return totalMinutes;
  };
  
  // Función para determinar si dos fechas son el mismo día
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  // Función para filtrar los horarios que ya han pasado en el día actual
  const filterPastTimeSlots = (slots: TimeSlotsByCategory, currentTime: Date): TimeSlotsByCategory => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;
    
    // Creamos una copia profunda del objeto slots para no modificar el original
    const filteredSlots: TimeSlotsByCategory = {
      earlyMorning: [...slots.earlyMorning],
      morning: [...slots.morning],
      afternoon: [...slots.afternoon],
      evening: [...slots.evening]
    };
    
    // Filtramos cada categoría para marcar como no disponibles los horarios que ya pasaron
    const filterCategory = (category: TimeSlot[]): TimeSlot[] => {
      return category.map(slot => {
        const slotMinutes = timeToMinutes(slot.time);
        if (slotMinutes <= currentTotalMinutes) {
          return { ...slot, available: false };
        }
        return slot;
      });
    };
    
    // Aplicamos el filtro a cada categoría
    filteredSlots.earlyMorning = filterCategory(filteredSlots.earlyMorning);
    filteredSlots.morning = filterCategory(filteredSlots.morning);
    filteredSlots.afternoon = filterCategory(filteredSlots.afternoon);
    filteredSlots.evening = filterCategory(filteredSlots.evening);
    
    return filteredSlots;
  };

  // Función para filtrar horarios por las franjas que trabaja el profesional
  const filterSlotsByProfessionalSchedule = (slots: TimeSlot[], profesional: any): TimeSlotsByCategory => {
    // Iniciamos con todas las categorías vacías
    const filtered: TimeSlotsByCategory = {
      earlyMorning: [],
      morning: [],
      afternoon: [],
      evening: []
    };
    
    // Si no hay profesional seleccionado, devolvemos vacío
    if (!profesional) return filtered;
    
    // Clasificamos los slots en las categorías correspondientes
    const slotsByCategory = classifySlotsByCategory(slots);
    
    // Filtramos cada slot en earlyMorning según la hora específica
    if (profesional.earlyMorning) {
      filtered.earlyMorning = slotsByCategory.earlyMorning.filter(slot => {
        const timeInMinutes = timeToMinutes(slot.time);
        // 12am-1am
        if (timeInMinutes >= 0 && timeInMinutes < 60) {
          return profesional.earlyMorning12am1am;
        }
        // 1am-2am
        else if (timeInMinutes >= 60 && timeInMinutes < 120) {
          return profesional.earlyMorning1am2am;
        }
        // 2am-3am
        else if (timeInMinutes >= 120 && timeInMinutes < 180) {
          return profesional.earlyMorning2am3am;
        }
        // 3am-4am
        else if (timeInMinutes >= 180 && timeInMinutes < 240) {
          return profesional.earlyMorning3am4am;
        }
        // 4am-5am
        else if (timeInMinutes >= 240 && timeInMinutes < 300) {
          return profesional.earlyMorning4am5am;
        }
        // 5am-6am
        else if (timeInMinutes >= 300 && timeInMinutes < 360) {
          return profesional.earlyMorning5am6am;
        }
        return false;
      });
    }
    
    // Filtramos cada slot en morning según la hora específica
    if (profesional.inTheMorning) {
      filtered.morning = slotsByCategory.morning.filter(slot => {
        const timeInMinutes = timeToMinutes(slot.time);
        // 6am-7am
        if (timeInMinutes >= 360 && timeInMinutes < 420) {
          return profesional.inTheMorning6am7am;
        }
        // 7am-8am
        else if (timeInMinutes >= 420 && timeInMinutes < 480) {
          return profesional.inTheMorning7am8am;
        }
        // 8am-9am
        else if (timeInMinutes >= 480 && timeInMinutes < 540) {
          return profesional.inTheMorning8am9am;
        }
        // 9am-10am
        else if (timeInMinutes >= 540 && timeInMinutes < 600) {
          return profesional.inTheMorning9am10am;
        }
        // 10am-11am
        else if (timeInMinutes >= 600 && timeInMinutes < 660) {
          return profesional.inTheMorning10am11am;
        }
        // 11am-12pm
        else if (timeInMinutes >= 660 && timeInMinutes < 720) {
          return profesional.inTheMorning11am12pm;
        }
        return false;
      });
    }
    
    // Filtramos cada slot en afternoon según la hora específica
    if (profesional.inTheAfternoon) {
      filtered.afternoon = slotsByCategory.afternoon.filter(slot => {
        const timeInMinutes = timeToMinutes(slot.time);
        // 12pm-1pm
        if (timeInMinutes >= 720 && timeInMinutes < 780) {
          return profesional.inTheAfternoon12pm1pm;
        }
        // 1pm-2pm
        else if (timeInMinutes >= 780 && timeInMinutes < 840) {
          return profesional.inTheAfternoon1pm2pm;
        }
        // 2pm-3pm
        else if (timeInMinutes >= 840 && timeInMinutes < 900) {
          return profesional.inTheAfternoon2pm3pm;
        }
        // 3pm-4pm
        else if (timeInMinutes >= 900 && timeInMinutes < 960) {
          return profesional.inTheAfternoon3pm4pm;
        }
        // 4pm-5pm
        else if (timeInMinutes >= 960 && timeInMinutes < 1020) {
          return profesional.inTheAfternoon4pm5pm;
        }
        // 5pm-6pm
        else if (timeInMinutes >= 1020 && timeInMinutes < 1080) {
          return profesional.inTheAfternoon5pm6pm;
        }
        return false;
      });
    }
    
    // Filtramos cada slot en evening según la hora específica
    if (profesional.atNight) {
      filtered.evening = slotsByCategory.evening.filter(slot => {
        const timeInMinutes = timeToMinutes(slot.time);
        // 6pm-7pm
        if (timeInMinutes >= 1080 && timeInMinutes < 1140) {
          return profesional.atNight6pm7pm;
        }
        // 7pm-8pm
        else if (timeInMinutes >= 1140 && timeInMinutes < 1200) {
          return profesional.atNight7pm8pm;
        }
        // 8pm-9pm
        else if (timeInMinutes >= 1200 && timeInMinutes < 1260) {
          return profesional.atNight8pm9pm;
        }
        // 9pm-10pm
        else if (timeInMinutes >= 1260 && timeInMinutes < 1320) {
          return profesional.atNight9pm10pm;
        }
        // 10pm-11pm
        else if (timeInMinutes >= 1320 && timeInMinutes < 1380) {
          return profesional.atNight10pm11pm;
        }
        // 11pm-12am
        else if (timeInMinutes >= 1380 && timeInMinutes < 1440) {
          return profesional.atNight11pm12am;
        }
        return false;
      });
    }
    
    return filtered;
  };

  // Clasifica los slots por categoría de horario
  const classifySlotsByCategory = (slots: TimeSlot[]): TimeSlotsByCategory => {
    return {
      earlyMorning: slots.filter(slot => {
        const minutes = timeToMinutes(slot.time);
        return minutes >= 0 && minutes < 360; // 12am-6am
      }),
      morning: slots.filter(slot => {
        const minutes = timeToMinutes(slot.time);
        return minutes >= 360 && minutes < 720; // 6am-12pm
      }),
      afternoon: slots.filter(slot => {
        const minutes = timeToMinutes(slot.time);
        return minutes >= 720 && minutes < 1080; // 12pm-6pm
      }),
      evening: slots.filter(slot => {
        const minutes = timeToMinutes(slot.time);
        return minutes >= 1080 && minutes < 1440; // 6pm-12am
      })
    };
  };

  // Función para generar un array de slots de tiempo basándonos en la duración del servicio
  const generateTimeSlots = (duracionServicio: number = 30): TimeSlot[] => {
    const slots: TimeSlot[] = []
    
    // Lista completa de todos los horarios en intervalos de 30 minutos
    const allTimes = [
      // Madrugada (12am-6am)
      "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM",
      "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM",
      
      // Mañana (6am-12pm)
      "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
      
      // Tarde (12pm-6pm)
      "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
      "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
      
      // Noche (6pm-12am)
      "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
      "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
    ];
    
    // Seleccionamos los horarios según la duración del servicio
    let timesToShow = [];
    
    if (duracionServicio <= 30) {
      // Si el servicio dura 30 minutos o menos, mostramos todos los slots cada 30 minutos
      timesToShow = allTimes;
    } else if (duracionServicio <= 60) {
      // Si el servicio dura entre 31 y 60 minutos, mostramos slots cada hora
      timesToShow = allTimes.filter((_, index) => index % 2 === 0);
    } else if (duracionServicio <= 90) {
      // Si el servicio dura entre 61 y 90 minutos, mostramos slots cada hora y media
      timesToShow = allTimes.filter((_, index) => index % 3 === 0);
    } else {
      // Si el servicio dura más de 90 minutos, mostramos slots cada 2 horas
      timesToShow = allTimes.filter((_, index) => index % 4 === 0);
    }
    
    // Creamos los slots con los horarios seleccionados
    timesToShow.forEach((time) => {
      const slot: TimeSlot = {
        time,
        available: true
      }
      slots.push(slot)
    })
    
    return slots;
  };
  
  // Estado inicial de slots de tiempo
  const [timeSlots] = useState<TimeSlot[]>([]);

  if (!selectedDate) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6 text-center">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">Selecciona una fecha</h3>
        <p className="text-sm text-gray-500">Primero elige una fecha para ver los horarios disponibles</p>
      </div>
    )
  }

  const formatSelectedDate = (date: Date) => {
    return date
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase()
  }

  // Removimos la función auxiliar duplicada timeToMinutes ya que está definida arriba
  
  const TimeSlotButton = ({ slot }: { slot: TimeSlot }) => {
    const isSelected = selectedTime === slot.time

    return (
      <button
        className={`
          h-16 relative transition-all duration-200 border rounded-md px-3
          ${isSelected
            ? "bg-gray-800 text-white shadow-md"
            : slot.available
              ? "hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm"
              : "opacity-50 cursor-not-allowed bg-gray-100"
          }
        `}
        disabled={!slot.available}
        onClick={() => slot.available && onTimeSelect(slot.time)}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-medium">{slot.time}</span>
          {!slot.available && (
            <span className="text-xs text-red-500 font-medium">No disponible</span>
          )}
        </div>

        {isSelected && <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-white bg-gray-800 rounded-full" />}
      </button>
    )
  }

  const TimeSection = ({ title, slots, icon }: { title: string; slots: TimeSlot[]; icon: React.ReactNode }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        <span>{title}</span>
        <span className="text-xs border border-gray-200 rounded px-2 py-0.5">
          {slots.filter((s) => s.available).length} disponibles
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {slots.map((slot, index) => (
          <TimeSlotButton key={index} slot={slot} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg bg-white">
      <div className="border-b border-gray-200 pb-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold">Horarios disponibles del {formatSelectedDate(selectedDate)}</h2>
          </div>
          <span className="text-sm border border-gray-200 rounded-full px-3 py-1">
            {
              filteredTimeSlots.earlyMorning.filter(s => s.available).length +
              filteredTimeSlots.morning.filter(s => s.available).length +
              filteredTimeSlots.afternoon.filter(s => s.available).length +
              filteredTimeSlots.evening.filter(s => s.available).length
            } espacios libres
          </span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Early Morning Slots - Madrugada */}
        {filteredTimeSlots.earlyMorning.length > 0 && (
          <TimeSection
            title="Madrugada"
            slots={filteredTimeSlots.earlyMorning}
            icon={<div className="w-3 h-3 rounded-full bg-indigo-400" />}
          />
        )}
        
        {/* Morning Slots - Mañana */}
        {filteredTimeSlots.morning.length > 0 && (
          <TimeSection
            title="Mañana"
            slots={filteredTimeSlots.morning}
            icon={<div className="w-3 h-3 rounded-full bg-yellow-400" />}
          />
        )}

        {/* Afternoon Slots - Tarde */}
        {filteredTimeSlots.afternoon.length > 0 && (
          <TimeSection
            title="Tarde"
            slots={filteredTimeSlots.afternoon}
            icon={<div className="w-3 h-3 rounded-full bg-orange-400" />}
          />
        )}

        {/* Evening Slots - Noche */}
        {filteredTimeSlots.evening.length > 0 && (
          <TimeSection 
            title="Noche" 
            slots={filteredTimeSlots.evening} 
            icon={<div className="w-3 h-3 rounded-full bg-blue-400" />} 
          />
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-4 border-t text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border bg-white" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-800" />
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-100" />
            <span>No disponible</span>
          </div>
        </div>
      </div>
    </div>
  )
}
