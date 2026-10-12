import React, { useState, useMemo } from 'react';
import { PlanAxis, TabType } from '../types';
import { generatePlanExecutiveSummary, downloadFile } from '../utils/documentGenerator';

interface PlanViewProps {
  axes: PlanAxis[];
  userLikes: Record<string, boolean>;
  onToggleLike: (axisId: string) => void;
  onNavigate: (tab: TabType, extra?: any) => void;
  onShowToast: (msg: string) => void;
}

export const PlanView: React.FC<PlanViewProps> = ({
  axes,
  userLikes,
  onToggleLike,
  onNavigate,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gestion' | 'bienestar' | 'comunidad'>('all');

  const filteredAxes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return axes.filter((axis) => {
      const matchesCat = selectedCategory === 'all' || axis.category === selectedCategory;
      const matchesSearch =
        !q ||
        axis.title.toLowerCase().includes(q) ||
        axis.description.toLowerCase().includes(q) ||
        axis.meta.toLowerCase().includes(q) ||
        axis.indicator.toLowerCase().includes(q) ||
        axis.keywords.toLowerCase().includes(q) ||
        axis.code.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [axes, searchQuery, selectedCategory]);

  const handleDownloadSummary = () => {
    const summary = generatePlanExecutiveSummary();
    downloadFile('Plan_Maestro_8_Ejes_UEP_CDP_2026_2027.txt', summary);
    onShowToast('Descargando Resumen Ejecutivo Oficial...');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plan de Gobierno Comité UEP CDP 2026-2027',
          text: 'Conoce los 8 ejes del Plan de Gobierno para nuestra comunidad de estudiantes deportistas de Pichincha.',
          url: window.location.href
        });
        onShowToast('Compartido con éxito');
      } catch {
        onShowToast('Enlace del plan copiado al portapapeles');
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Banner Motivacional & Visión Institucional */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary p-4 text-on-primary shadow-sm">
        <div className="relative z-10 flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">flag</span>
              Plan Maestro
            </span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
              Período 2026-2027
            </span>
          </div>
          <h2 className="font-headline font-bold text-xl sm:text-2xl tracking-tight text-white leading-tight">
            Ocho ejes para transformar la comunidad de familias
          </h2>
          <p className="text-xs text-on-primary-container leading-relaxed">
            Construcción participativa, rigor atlético y transparencia activa orientada al bienestar de nuestros estudiantes deportistas.
          </p>
          {/* Mini resumen métrico de consenso */}
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/15 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">
                how_to_vote
              </span>
              <span>8 Propuestas de debate</span>
            </div>
            <div className="text-on-primary-container text-[11px]">
              <span>100% deliberativas</span>
            </div>
          </div>
        </div>
        {/* Decoración sutil de fondo */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Buscador y Filtros de Categorías */}
      <div className="flex flex-col space-y-2.5">
        {/* Barra de búsqueda táctil */}
        <div className="relative flex items-center w-full">
          <span className="absolute left-3 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-11 pl-10 pr-9 bg-surface-container-lowest rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-outline-variant/20"
            placeholder="Buscar por eje, meta o palabras clave..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              aria-label="Limpiar búsqueda"
              className="absolute right-2.5 text-on-surface-variant hover:text-on-surface p-1"
              type="button"
              onClick={() => setSearchQuery('')}
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Filtros de categoría horizontales scrolleables */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              selectedCategory === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
            }`}
          >
            Todos ({axes.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('gestion')}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'gestion'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
            }`}
          >
            Gestión
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('bienestar')}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'bienestar'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
            }`}
          >
            Bienestar
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('comunidad')}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'comunidad'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
            }`}
          >
            Comunidad
          </button>
        </div>
      </div>

      {/* Barra de Acciones / Compartir Rápido */}
      <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
            picture_as_pdf
          </span>
          <span className="text-xs font-bold text-on-surface truncate">
            Resumen Ejecutivo Oficial
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 bg-surface-container-lowest text-on-surface px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-transform border border-outline-variant/20 hover:bg-surface-variant"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            <span>Compartir</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadSummary}
            className="inline-flex items-center gap-1 bg-secondary text-on-secondary px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm active:scale-95 transition-transform hover:bg-secondary/90"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Descargar</span>
          </button>
        </div>
      </div>

      {/* Contador dinámico de resultados */}
      <div className="flex items-center justify-between text-on-surface-variant text-[11px] px-1 font-medium">
        <span>
          Mostrando {filteredAxes.length} eje{filteredAxes.length === 1 ? '' : 's'} de trabajo
        </span>
        <span className="flex items-center gap-1 text-primary font-bold">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          Fase: Debate Activo
        </span>
      </div>

      {/* Contenedor Principal de Ejes */}
      <div className="flex flex-col space-y-3.5">
        {filteredAxes.map((axis) => {
          const isLiked = !!userLikes[axis.id];
          const totalLikes = axis.initialLikes + (isLiked ? 1 : 0);

          return (
            <div
              key={axis.id}
              className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 transition-all"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed tracking-wide">
                      {axis.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        axis.category === 'gestion'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : axis.category === 'bienestar'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {axis.categoryLabel}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-tertiary font-semibold">
                    <span className="material-symbols-outlined text-[14px]">how_to_vote</span>
                    En deliberación
                  </span>
                </div>

                <div>
                  <h3 className="font-headline font-bold text-sm sm:text-base text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      {axis.category === 'gestion'
                        ? 'forum'
                        : axis.category === 'bienestar'
                        ? 'spa'
                        : 'diversity_3'}
                    </span>
                    {axis.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface mt-1 leading-relaxed">
                    {axis.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  <div className="bg-surface-container-low p-2 rounded-lg flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary-container text-[18px] shrink-0 mt-0.5">
                      track_changes
                    </span>
                    <div>
                      <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Meta sugerida
                      </span>
                      <p className="text-xs text-on-surface">{axis.meta}</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-2 rounded-lg flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      analytics
                    </span>
                    <div>
                      <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Indicador propuesto
                      </span>
                      <p className="text-xs text-on-surface">{axis.indicator}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-variant/40">
                  <button
                    type="button"
                    onClick={() => {
                      onToggleLike(axis.id);
                      onShowToast(
                        isLiked
                          ? `Has retirado tu apoyo a ${axis.title}`
                          : `¡Apoyaste la iniciativa: ${axis.title}!`
                      );
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs py-1 px-2.5 rounded-lg transition-all active:scale-95 ${
                      isLiked
                        ? 'bg-primary-fixed text-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container font-semibold'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      thumb_up
                    </span>
                    <span>
                      {isLiked ? `Apoyado (${totalLikes})` : `Apoyar eje (${totalLikes})`}
                    </span>
                  </button>

                  <span className="inline-flex items-center gap-1 text-on-surface-variant text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    {axis.phase}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estado Vacío cuando la búsqueda no coincide */}
      {filteredAxes.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/20">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[28px]">search_off</span>
          </div>
          <h4 className="font-headline font-bold text-sm text-on-surface">No se encontraron ejes</h4>
          <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
            Intenta con otro término como "nutrición", "seguridad", "aporte" o cambia el filtro de categoría.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 px-3 py-1.5 rounded-lg bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      )}

      {/* Micro-banner de Participación */}
      <div className="p-3.5 rounded-xl bg-surface-container flex items-center justify-between gap-3 border border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">contact_support</span>
          </div>
          <div>
            <p className="font-headline font-bold text-xs text-on-surface">
              ¿Deseas proponer una enmienda?
            </p>
            <p className="text-[11px] text-on-surface-variant">
              Los delegados de curso recogen sugerencias los martes.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('participa', { initialCategory: 'idea' })}
          className="shrink-0 bg-primary text-on-primary px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-sm active:scale-95 transition-transform hover:bg-primary-container"
        >
          Enviar aporte
        </button>
      </div>
    </div>
  );
};
