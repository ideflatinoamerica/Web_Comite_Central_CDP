import React, { useState, useMemo } from 'react';
import { AgendaEvent } from '../types';

interface AgendaViewProps {
  events: AgendaEvent[];
  bookmarkedEvents: Record<string, boolean>;
  onToggleBookmark: (eventId: string) => void;
  onShowToast: (msg: string) => void;
}

const MONTHS: Array<{ code: string; year: string; label: string }> = [
  { code: 'ALL', year: 'PERIODO', label: 'Todos' },
  { code: 'OCT', year: '2026', label: 'OCT' },
  { code: 'NOV', year: '2026', label: 'NOV' },
  { code: 'DIC', year: '2026', label: 'DIC' },
  { code: 'ENE', year: '2027', label: 'ENE' },
  { code: 'FEB', year: '2027', label: 'FEB' },
  { code: 'MAR', year: '2027', label: 'MAR' },
  { code: 'ABR', year: '2027', label: 'ABR' },
  { code: 'MAY', year: '2027', label: 'MAY' },
  { code: 'JUN', year: '2027', label: 'JUN' }
];

const CATEGORIES: Array<{ code: string; label: string; icon: string }> = [
  { code: 'ALL', label: 'Todos', icon: 'apps' },
  { code: 'DEPORTE', label: 'Deporte', icon: 'fitness_center' },
  { code: 'APRENDIZAJE', label: 'Aprendizaje', icon: 'psychology' },
  { code: 'COMUNIDAD', label: 'Comunidad', icon: 'diversity_3' },
  { code: 'BIENESTAR', label: 'Bienestar', icon: 'spa' }
];

export const AgendaView: React.FC<AgendaViewProps> = ({
  events,
  bookmarkedEvents,
  onToggleBookmark,
  onShowToast
}) => {
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchMonth = selectedMonth === 'ALL' || evt.month === selectedMonth;
      const matchCat = selectedCategory === 'ALL' || evt.category === selectedCategory;
      return matchMonth && matchCat;
    });
  }, [events, selectedMonth, selectedCategory]);

  const activeTitle = useMemo(() => {
    if (selectedMonth === 'ALL' && selectedCategory === 'ALL') return 'Todas las Actividades';
    if (selectedMonth !== 'ALL' && selectedCategory === 'ALL') return `Mes de ${selectedMonth}`;
    if (selectedMonth === 'ALL' && selectedCategory !== 'ALL') return `Categoría: ${selectedCategory}`;
    return `${selectedMonth} • ${selectedCategory}`;
  }, [selectedMonth, selectedCategory]);

  return (
    <div className="flex flex-col w-full pb-6 gap-4">
      {/* Resumen Dinámico & Alerta Institucional */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container via-primary to-on-primary-fixed text-on-primary p-4 shadow-md">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">
                verified
              </span>
              <span className="text-[10px] uppercase tracking-wider text-tertiary-fixed font-bold">
                Cronograma Oficial 2026-2027
              </span>
            </div>
            <h2 className="font-headline font-bold text-xl sm:text-2xl text-on-primary tracking-tight">
              Agenda Deportiva y Escolar
            </h2>
            <p className="text-xs text-on-primary-container mt-1 lg:max-w-[65ch]">
              Sincroniza tus actividades formativas y asambleas del Comité Central.
            </p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <div className="bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full text-right">
              <span className="font-headline font-bold text-xs sm:text-sm text-on-primary">
                {events.length}
              </span>
              <span className="text-[10px] text-on-primary-container ml-1">eventos</span>
            </div>
          </div>
        </div>

        {/* Micro-stat row */}
        <div className="relative z-10 grid grid-cols-2 gap-2 mt-4 pt-1">
          <div className="flex items-center gap-2 bg-on-primary/10 backdrop-blur-sm p-2 rounded-lg">
            <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">
              sports_handball
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-on-primary-container truncate font-medium">
                Enfoque Atlético
              </span>
              <span className="font-headline font-bold text-xs text-on-primary truncate">
                CDP Pichincha
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-on-primary/10 backdrop-blur-sm p-2 rounded-lg">
            <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">
              groups
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-on-primary-container truncate font-medium">
                Participación
              </span>
              <span className="font-headline font-bold text-xs text-on-primary truncate">
                100% Familias
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selector Horizontal de Meses (Carrusel Táctil) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
            Ciclo Escolar
          </span>
          <span className="text-[11px] text-primary font-bold lg:hidden">Desliza para explorar</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth lg:grid lg:grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] lg:overflow-visible">
          {MONTHS.map((m) => {
            const isSelected = selectedMonth === m.code;
            return (
              <button
                key={m.code}
                type="button"
                onClick={() => setSelectedMonth(m.code)}
                className={`shrink-0 flex flex-col items-center justify-center min-w-[62px] h-16 rounded-xl transition-all shadow-sm lg:min-w-0 lg:w-full ${
                  isSelected
                    ? 'bg-primary text-on-primary ring-2 ring-primary ring-offset-1'
                    : 'bg-surface-container text-on-surface hover:bg-surface-variant'
                }`}
              >
                <span
                  className={`text-[10px] uppercase font-semibold ${
                    isSelected ? 'opacity-80' : 'text-on-surface-variant'
                  }`}
                >
                  {m.year}
                </span>
                <span className="font-headline font-bold text-sm">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs por Categoría */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:grid lg:grid-cols-5 lg:overflow-visible">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.code;
          return (
            <button
              key={cat.code}
              type="button"
              onClick={() => setSelectedCategory(cat.code)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all lg:w-full lg:justify-center ${
                isSelected
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline & Feed de Eventos */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              calendar_today
            </span>
            <span className="font-headline font-bold text-sm sm:text-base text-on-surface">
              {activeTitle}
            </span>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            {filteredEvents.length} encontrada{filteredEvents.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Feed Container */}
        <div className="flex flex-col gap-2.5 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))]">
          {filteredEvents.map((evt) => {
            const isSaved = !!bookmarkedEvents[evt.id];
            return (
              <article
                key={evt.id}
                className="relative flex flex-col bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  {/* Date badge */}
                  <div
                    className={`flex flex-col items-center justify-center rounded-lg w-14 h-14 shrink-0 shadow-sm text-center ${
                      evt.category === 'APRENDIZAJE'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : evt.category === 'DEPORTE'
                        ? 'bg-primary-container text-on-primary'
                        : evt.category === 'COMUNIDAD'
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-surface-variant text-on-surface-variant'
                    }`}
                  >
                    <span className="font-headline font-bold text-sm sm:text-base leading-tight">
                      {evt.dayRange}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wide">
                      {evt.month}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="bg-surface-container text-on-surface px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          {evt.badgeType}
                        </span>
                        {evt.category}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-semibold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {evt.timeOrPlace}
                      </span>
                    </div>
                    <h3 className="font-headline font-bold text-xs sm:text-sm text-on-surface tracking-tight">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2 leading-relaxed lg:max-w-[65ch]">
                      {evt.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-3 bg-surface-container-low -mx-4 -mb-4 px-4 py-2 rounded-b-xl border-t border-surface-variant/40">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      assignment_ind
                    </span>
                    <span className="text-[11px] text-on-surface font-semibold truncate">
                      {evt.responsible}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onToggleBookmark(evt.id);
                      onShowToast(
                        isSaved
                          ? `Recordatorio eliminado: ${evt.title}`
                          : `¡Recordatorio guardado para ${evt.title}!`
                      );
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold active:scale-95 transition-all ${
                      isSaved
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isSaved ? 'notifications_active' : 'notification_add'}
                    </span>
                    <span>{isSaved ? 'Guardado' : 'Recordar'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Estado Vacío */}
        {filteredEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 bg-surface-container-low rounded-xl text-center border border-outline-variant/20">
            <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px]">event_busy</span>
            </div>
            <h4 className="font-headline font-bold text-sm text-on-surface">
              No hay eventos en este criterio
            </h4>
            <p className="text-xs text-on-surface-variant mt-1 max-w-[260px]">
              Prueba seleccionando otro mes o restableciendo los filtros para ver la agenda anual.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedMonth('ALL');
                setSelectedCategory('ALL');
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-sm active:scale-95 transition-transform hover:bg-primary-container"
            >
              Ver Todas las Actividades
            </button>
          </div>
        )}
      </div>

      {/* Nota de Verificación Institucional */}
      <div className="flex items-start gap-3 bg-surface-container-high rounded-xl p-4 border border-outline-variant/20">
        <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">
          info
        </span>
        <div className="flex flex-col">
          <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
            Verificación y Validez Institucional
          </span>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed lg:max-w-[65ch]">
            Las fechas y horarios están sujetos a ratificación según el calendario de competencias de la Concentración Deportiva de Pichincha y disposiciones ministeriales. Los cambios serán notificados vía boletín digital del Comité.
          </p>
          <div className="flex items-center gap-2 mt-2 pt-1 border-t border-outline-variant/20 text-[11px]">
            <span className="text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">done_all</span>
              Secretaría General UEP CDP
            </span>
            <span className="text-on-surface-variant font-medium">Actualizado: Octubre 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
