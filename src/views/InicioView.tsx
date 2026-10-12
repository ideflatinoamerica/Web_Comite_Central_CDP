import React, { useState } from 'react';
import { TabType } from '../types';
import { ASSETS, LEADERSHIP_TEAM } from '../data/initialData';

interface InicioViewProps {
  onNavigate: (tab: TabType, extra?: any) => void;
  onShowToast: (msg: string) => void;
}

export const InicioView: React.FC<InicioViewProps> = ({ onNavigate, onShowToast }) => {
  const [isLegalExpanded, setIsLegalExpanded] = useState(false);
  const [selectedNews, setSelectedNews] = useState<string | null>(null);

  const newsItems = [
    {
      id: 'news-1',
      tag: 'Taekwondo',
      badge: 'Medallero Oro',
      tagColor: 'bg-primary text-on-primary',
      title: 'Podio Intercolegial Pichincha 2026',
      desc: 'Nuestros atletas de Taekwondo consiguieron 6 preseas doradas con equipamiento respaldado por el Comité.',
      date: 'Hace 2 días',
      image: ASSETS.newsTaekwondo
    },
    {
      id: 'news-2',
      tag: 'Salud Integral',
      badge: 'Jornada Médica',
      tagColor: 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold',
      title: 'Valoración Fisiológica Integral',
      desc: 'Alianza con deportología CDP: screening postural, cardiovascular y plan nutricional personalizado.',
      date: '15 Feb 2026',
      image: ASSETS.newsDoctor
    },
    {
      id: 'news-3',
      tag: 'Infraestructura',
      badge: 'Gimnasio & Pista',
      tagColor: 'bg-secondary-fixed text-on-secondary-fixed',
      title: 'Mantenimiento de Pista y Gimnasio',
      desc: 'Se entregaron las adecuaciones de iluminación y tatamis para el bloque de entrenamiento formativo.',
      date: 'En curso',
      image: ASSETS.newsGym
    }
  ];

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Micro Bulletin Bar */}
      <aside className="w-full bg-primary text-on-primary px-3 py-2 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2 min-w-0">
          <span
            className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim shrink-0 animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            campaign
          </span>
          <p className="font-label-sm text-xs truncate">
            Asamblea Ordinaria de Bienvenida: Jueves 18h30 vía PWA
          </p>
        </div>
        <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0">
          Activo
        </span>
      </aside>

      {/* Hero Card: Athletic Inspiration */}
      <section className="relative w-full overflow-hidden rounded-xl bg-primary text-on-primary shadow-md">
        {/* Atmospheric athlete backdrop with fallback */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-luminosity bg-cover bg-center"
          style={{ backgroundImage: `url('${ASSETS.heroAthletes}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        <div className="relative z-10 p-5 flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between gap-2">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm font-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Período Oficial 2026–2027
            </span>
            <div className="flex items-center gap-1.5 bg-on-primary/10 backdrop-blur-md px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">
                sports_kabaddi
              </span>
              <span className="text-xs font-bold tracking-wide text-on-primary">
                UEP CDP
              </span>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-tertiary-fixed-dim text-xs tracking-wider uppercase font-bold">
              Comité Central de Padres
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-[28px] text-on-primary mt-1 leading-snug">
              En equipo, les damos alas al futuro.
            </h2>
            <p className="text-xs sm:text-sm text-on-primary-container mt-1 font-medium">
              Su talento deportivo, nuestro compromiso institucional.
            </p>
          </div>

          {/* Quick Metrics Ribbon Inside Hero */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 bg-black/20 backdrop-blur-sm rounded-lg p-2.5 text-center">
            <div>
              <span className="font-headline font-bold text-base sm:text-lg text-tertiary-fixed-dim block">
                8
              </span>
              <span className="text-[10px] sm:text-xs text-on-primary opacity-90 block">
                Ejes Clave
              </span>
            </div>
            <div>
              <span className="font-headline font-bold text-base sm:text-lg text-on-primary block">
                100%
              </span>
              <span className="text-[10px] sm:text-xs text-on-primary opacity-90 block">
                Transparencia
              </span>
            </div>
            <div>
              <span className="font-headline font-bold text-base sm:text-lg text-on-primary block">
                480+
              </span>
              <span className="text-[10px] sm:text-xs text-on-primary opacity-90 block">
                Estudiantes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Tactical Widget */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-headline font-semibold text-base text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary-container text-[20px]">
              grid_view
            </span>
            Gestión Rápida
          </h3>
          <span className="text-xs text-on-surface-variant font-medium">Acceso directo</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Shortcut 1: Plan */}
          <button
            type="button"
            onClick={() => onNavigate('plan')}
            className="group text-left bg-surface-container-lowest p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[92px] active:scale-[0.98] border border-outline-variant/20"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">flag</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline font-bold text-sm text-on-surface block leading-tight">
                8 Ejes
              </span>
              <span className="text-xs text-on-surface-variant block mt-0.5">Plan de Trabajo</span>
            </div>
          </button>

          {/* Shortcut 2: Próxima Actividad / Agenda */}
          <button
            type="button"
            onClick={() => onNavigate('agenda')}
            className="group text-left bg-surface-container-lowest p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[92px] active:scale-[0.98] border border-outline-variant/20"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline font-bold text-sm text-on-surface block leading-tight">
                Chequeos
              </span>
              <span className="text-xs text-on-surface-variant block mt-0.5">Agenda Deportiva</span>
            </div>
          </button>

          {/* Shortcut 3: Cuentas Claras */}
          <button
            type="button"
            onClick={() => onNavigate('cuentas')}
            className="group text-left bg-surface-container-lowest p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[92px] active:scale-[0.98] border border-outline-variant/20"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline font-bold text-sm text-on-surface block leading-tight">
                Cuentas Claras
              </span>
              <span className="text-xs text-on-surface-variant block mt-0.5">Libro & Facturas</span>
            </div>
          </button>

          {/* Shortcut 4: Tu Voz Suma */}
          <button
            type="button"
            onClick={() => onNavigate('participa')}
            className="group text-left bg-surface-container-lowest p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[92px] active:scale-[0.98] border border-outline-variant/20"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline font-bold text-sm text-on-surface block leading-tight">
                Tu Voz Suma
              </span>
              <span className="text-xs text-on-surface-variant block mt-0.5">Buzón & Votaciones</span>
            </div>
          </button>
        </div>
      </section>

      {/* News & Milestones Section: Horizontal High-Density Feed */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-headline font-semibold text-base text-on-surface flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-tertiary-container text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
              Alas que Inspiran
            </h3>
            <p className="text-xs text-on-surface-variant">Nuevos logros y pasos institucionales</p>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Mostrando todas las novedades deportivas')}
            className="text-xs font-bold text-primary hover:underline"
          >
            Ver todo
          </button>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="flex space-x-3 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar snap-x snap-mandatory">
          {newsItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNews(item.id === selectedNews ? null : item.id)}
              className="min-w-[270px] max-w-[280px] snap-center bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col justify-between shrink-0 border border-outline-variant/20 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative h-28 w-full bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${item.tagColor}`}>
                  {item.tag}
                </span>
                <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              </div>
              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-surface-variant flex items-center justify-between text-on-surface-variant text-[11px]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {item.date}
                  </span>
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    chevron_right
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Team of Representatives Section */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-headline font-semibold text-base text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
              Equipo Directivo
            </h3>
            <p className="text-xs text-on-surface-variant">Representación y roles activos</p>
          </div>
          <span className="bg-surface-container-high text-on-surface-variant font-bold text-[10px] px-2 py-0.5 rounded-full">
            2026–2027
          </span>
        </div>
        <div className="space-y-2">
          {LEADERSHIP_TEAM.map((leader, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/20"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover"
                    src={leader.photo}
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                  />
                  {idx === 0 && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-fixed-dim rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline font-bold text-xs sm:text-sm text-on-surface truncate">
                      {leader.name}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        leader.status === 'Electo'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      {leader.status}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">{leader.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 shrink-0 ml-2">
                <a
                  href={`mailto:${leader.email}`}
                  onClick={() => onShowToast(`Abriendo correo para contactar a ${leader.name}`)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                  aria-label={`Contactar a ${leader.name}`}
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Framework Accordion Card (MINEDUC-2023-00075-A) */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
            </div>
            <div>
              <span className="text-[10px] text-primary font-bold tracking-wide uppercase">
                Marco Normativo
              </span>
              <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface mt-0.5">
                Acuerdo MINEDUC-2023-00075-A
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                Garantía de corresponsabilidad, autonomía organizada y asambleas democráticas.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLegalExpanded(!isLegalExpanded)}
            className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors shrink-0"
            aria-label="Desplegar detalles de normativa"
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                isLegalExpanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
        </div>

        {/* Collapsible content */}
        {isLegalExpanded && (
          <div className="mt-3 pt-3 border-t border-surface-container space-y-2.5 text-on-surface-variant">
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                check_circle
              </span>
              <p className="text-xs leading-snug">
                <strong className="text-on-surface">Art. 12 Corresponsabilidad:</strong> La
                comunidad de madres, padres y representantes acompaña activamente el desarrollo
                físico, psicológico y académico.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                check_circle
              </span>
              <p className="text-xs leading-snug">
                <strong className="text-on-surface">Art. 18 Rendición Periódica:</strong>{' '}
                Obligatoriedad de informes económicos transparentes y digitalizados para consulta
                directa de las familias.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                check_circle
              </span>
              <p className="text-xs leading-snug">
                <strong className="text-on-surface">Art. 24 Representatividad:</strong> Acreditación
                formal de delegaturas por disciplina deportiva y paralelo pedagógico.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Call to Action Banner */}
      <section className="w-full bg-gradient-to-r from-secondary to-primary text-on-primary p-4 rounded-xl shadow-md flex items-center justify-between">
        <div className="min-w-0 pr-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">
              volunteer_activism
            </span>
            <span className="text-[10px] text-tertiary-fixed-dim uppercase tracking-wider font-bold">
              Comunidad Activa
            </span>
          </div>
          <h4 className="font-headline font-bold text-sm sm:text-base leading-snug">
            ¿Quieres sumarte a una comisión?
          </h4>
          <p className="text-xs text-on-primary-container mt-0.5">
            Salud, Logística de Viajes, Deporte o Auditoría.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('participa', { initialCategory: 'voluntariado' })}
          className="bg-tertiary-fixed text-on-tertiary-fixed text-xs sm:text-sm px-4 py-2.5 rounded-lg shrink-0 font-bold shadow-sm active:scale-95 transition-transform hover:bg-tertiary-fixed-dim"
        >
          Postular
        </button>
      </section>
    </div>
  );
};
