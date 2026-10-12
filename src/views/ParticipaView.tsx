import React, { useState, useEffect } from 'react';
import { Proposal, ProposalCategory, SponsorApplication } from '../types';
import { ASSETS } from '../data/initialData';
import {
  generateProposalTicketText,
  generateSponsorReceiptText,
  downloadFile
} from '../utils/documentGenerator';

interface ParticipaViewProps {
  initialCategory?: ProposalCategory;
  onAddProposal: (proposal: Proposal) => void;
  onAddSponsor: (sponsor: SponsorApplication) => void;
  onShowToast: (msg: string) => void;
}

const CATEGORY_DATA: Record<
  ProposalCategory,
  { title: string; subtitle: string; icon: string; badge: string }
> = {
  idea: {
    title: '1. Comparte una Idea o Sugerencia',
    subtitle: 'Mejoras logísticas, convivencias, eventos y dinámica escolar diaria.',
    icon: 'lightbulb',
    badge: 'Idea o Sugerencia'
  },
  voluntariado: {
    title: '2. Suma tu Experiencia o Voluntariado',
    subtitle: 'Apoyo profesional en medicina, psicología, derecho, diseño o logística deportiva.',
    icon: 'handshake',
    badge: 'Experiencia / Voluntariado'
  },
  escuela: {
    title: '3. Escuela para Familias UEP',
    subtitle: 'Talleres de crianza consciente, neurodiversidad, nutrición y descanso del atleta.',
    icon: 'psychology',
    badge: 'Escuela para Familias'
  }
};

export const ParticipaView: React.FC<ParticipaViewProps> = ({
  initialCategory,
  onAddProposal,
  onAddSponsor,
  onShowToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProposalCategory>(
    initialCategory || 'idea'
  );
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('Básica Superior (8vo - 10mo)');
  const [discipline, setDiscipline] = useState('Taekwondo');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedProposal, setLastSubmittedProposal] = useState<Proposal | null>(null);

  // Sponsor modal state
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [sponsorOrg, setSponsorOrg] = useState('');
  const [sponsorType, setSponsorType] = useState('Equipamiento & Doboks (Taekwondo)');
  const [sponsorPhone, setSponsorPhone] = useState('');
  const [sponsorNotes, setSponsorNotes] = useState('');

  // FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleGenerateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Por favor ingresa tu nombre o el de tu representante');
      return;
    }
    if (!description.trim()) {
      onShowToast('Por favor describe tu propuesta o sugerencia');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `UEP-2026-P${Math.floor(10 + Math.random() * 90)}`;
      const newProp: Proposal = {
        id: `prop-${Date.now()}`,
        ticketNumber: ticketId,
        category: selectedCategory,
        categoryTitle: CATEGORY_DATA[selectedCategory].badge,
        author: name.trim(),
        grade,
        discipline,
        description: description.trim(),
        createdAt: new Date().toLocaleDateString('es-EC', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        status: 'Recibido'
      };

      onAddProposal(newProp);
      setLastSubmittedProposal(newProp);
      setIsSubmitting(false);
      setDescription('');
      onShowToast(`¡Borrador generado con ticket #${ticketId}!`);
    }, 600);
  };

  const handleDownloadTicket = (prop: Proposal) => {
    const text = generateProposalTicketText(prop);
    downloadFile(`Comprobante_${prop.ticketNumber}.txt`, text);
    onShowToast(`Descargando comprobante ${prop.ticketNumber}...`);
  };

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorOrg.trim()) {
      onShowToast('Por favor indica la empresa o familia patrocinadora');
      return;
    }
    if (!sponsorPhone.trim()) {
      onShowToast('Por favor incluye un teléfono de contacto');
      return;
    }

    const ticket = `UEP-2026-PAT${Math.floor(100 + Math.random() * 900)}`;
    const newSponsor: SponsorApplication = {
      id: `spon-${Date.now()}`,
      ticketNumber: ticket,
      orgName: sponsorOrg.trim(),
      modality: sponsorType,
      phone: sponsorPhone.trim(),
      notes: sponsorNotes.trim(),
      createdAt: new Date().toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: 'Recibido'
    };

    onAddSponsor(newSponsor);
    setIsSponsorModalOpen(false);
    setSponsorOrg('');
    setSponsorPhone('');
    setSponsorNotes('');

    const text = generateSponsorReceiptText(newSponsor);
    downloadFile(`Comprobante_Patrocinio_${ticket}.txt`, text);
    onShowToast(`¡Postulación registrada! Comprobante descargado (${ticket})`);
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Banner Superior de Impacto / Orgullo Institucional */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container p-4 text-on-primary shadow-md">
        <div className="relative z-10 flex flex-col space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-fixed px-2 py-0.5 text-[10px] text-on-tertiary-fixed font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              Alianza UEP CDP
            </span>
            <span className="text-on-primary/80 text-[11px] font-medium">Período 2026-2027</span>
          </div>
          <h2 className="font-headline font-bold text-xl sm:text-2xl leading-tight tracking-tight text-white">
            Tu voz y apoyo impulsan a nuestros estudiantes deportistas
          </h2>
          <p className="text-xs text-on-primary/90 leading-relaxed pt-0.5">
            Construyamos juntos el ecosistema de alto rendimiento y formación integral para nuestras futuras promesas deportivas de Pichincha.
          </p>
          {/* Mini KPI counters */}
          <div className="grid grid-cols-3 gap-2 pt-3">
            <div className="bg-black/20 rounded-lg p-2 text-center backdrop-blur-sm">
              <p className="font-headline font-bold text-base sm:text-lg text-tertiary-fixed-dim leading-none">
                128
              </p>
              <p className="text-[10px] text-white/80 mt-1 font-semibold">Atletas UEP</p>
            </div>
            <div className="bg-black/20 rounded-lg p-2 text-center backdrop-blur-sm">
              <p className="font-headline font-bold text-base sm:text-lg text-tertiary-fixed-dim leading-none">
                34
              </p>
              <p className="text-[10px] text-white/80 mt-1 font-semibold">Iniciativas</p>
            </div>
            <div className="bg-black/20 rounded-lg p-2 text-center backdrop-blur-sm">
              <p className="font-headline font-bold text-base sm:text-lg text-tertiary-fixed-dim leading-none">
                100%
              </p>
              <p className="text-[10px] text-white/80 mt-1 font-semibold">Transparente</p>
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-tertiary-fixed/15 blur-2xl pointer-events-none" />
        <div className="absolute right-2 top-2 opacity-15 pointer-events-none">
          <span className="material-symbols-outlined text-[96px]">sports_martial_arts</span>
        </div>
      </div>

      {/* SECCIÓN 1: CANAL DE PROPUESTAS DE FAMILIAS */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">diversity_3</span>
            <h3 className="font-headline font-bold text-sm sm:text-base text-on-surface">
              Canal de Propuestas de Familias
            </h3>
          </div>
          <span className="text-primary text-[10px] font-bold bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full">
            Activo
          </span>
        </div>

        {/* Interactive Category Selector Cards */}
        <div className="grid grid-cols-1 gap-2.5">
          {(['idea', 'voluntariado', 'escuela'] as ProposalCategory[]).map((catKey) => {
            const item = CATEGORY_DATA[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`group w-full text-left p-3.5 rounded-xl bg-surface-container-lowest shadow-sm transition-all active:scale-[0.99] border relative overflow-hidden ${
                  isSelected
                    ? 'ring-2 ring-primary border-primary'
                    : 'border-outline-variant/20 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-high text-on-surface-variant group-hover:bg-primary-fixed group-hover:text-on-primary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                        {item.title}
                      </span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Formulario Móvil de Propuesta */}
        <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm space-y-3.5 border border-outline-variant/20">
          <div className="flex items-center justify-between border-b border-surface-variant pb-2">
            <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">edit_note</span>
              Redacción del Borrador
            </span>
            <span className="text-[10px] text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-full">
              {CATEGORY_DATA[selectedCategory].badge}
            </span>
          </div>

          <form onSubmit={handleGenerateProposal} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-on-surface mb-1 block">
                Tu Nombre y Apellido (o Representante)
              </label>
              <input
                className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition-all border border-outline-variant/20 placeholder:text-on-surface-variant/60"
                placeholder="Ej. Lcda. Carmen Morales"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface mb-1 block">
                Curso / Grado del Estudiante Deportista
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition-all border border-outline-variant/20"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="Básica Superior (8vo - 10mo)">Básica Superior (8vo - 10mo)</option>
                  <option value="1ro - 2do Bachillerato">1ro - 2do Bachillerato</option>
                  <option value="3ro Bachillerato (Promoción)">3ro Bachillerato (Promoción)</option>
                  <option value="Básica Elemental / Media">Básica Elemental / Media</option>
                </select>
                <select
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition-all border border-outline-variant/20"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                >
                  <option value="Taekwondo">Taekwondo</option>
                  <option value="Atletismo">Atletismo</option>
                  <option value="Natación">Natación</option>
                  <option value="Gimnasia">Gimnasia</option>
                  <option value="Otra Disciplina">Otra Disciplina</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-on-surface">
                  Detalle de la propuesta o necesidad
                </label>
                <span className="text-[10px] text-on-surface-variant font-medium">
                  {description.length} / 300
                </span>
              </div>
              <textarea
                className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition-all border border-outline-variant/20 placeholder:text-on-surface-variant/60 resize-none"
                maxLength={300}
                placeholder="Describe cómo esta idea impacta positivamente a la comunidad deportiva escolar..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-lg bg-primary text-on-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:bg-primary-container hover:bg-primary-container transition-all disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    refresh
                  </span>
                  <span>Guardando borrador...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    assignment_turned_in
                  </span>
                  <span>Generar borrador de propuesta</span>
                </>
              )}
            </button>
          </form>

          {/* Confirmation Toast Placeholder & Ticket Actions */}
          {lastSubmittedProposal && (
            <div className="p-3 rounded-lg bg-primary-fixed text-on-primary-fixed text-xs flex flex-col space-y-2 animate-in fade-in border border-primary/20">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                  check_circle
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs">¡Borrador listo y enviado a mesa directiva!</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Se asignó el ticket preliminar{' '}
                    <span className="font-bold text-primary">
                      #{lastSubmittedProposal.ticketNumber}
                    </span>
                    . Recibirás respuesta por la agenda oficial.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-primary/10">
                <button
                  type="button"
                  onClick={() => handleDownloadTicket(lastSubmittedProposal)}
                  className="px-2.5 py-1 bg-primary text-on-primary rounded text-[11px] font-bold flex items-center gap-1 shadow-sm hover:bg-primary-container"
                >
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  <span>Descargar Comprobante</span>
                </button>
                <span className="text-[10px] text-on-surface-variant">
                  Guardado en almacenamiento local
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 2: PROGRAMA PATROCINA A NUESTROS DEPORTISTAS */}
      <section className="flex flex-col space-y-3.5 pt-2">
        <div className="flex flex-col space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary-container text-[22px]">
              workspace_premium
            </span>
            <h3 className="font-headline font-bold text-sm sm:text-base text-on-surface">
              Programa 'Patrocina un Atleta CDP'
            </h3>
          </div>
          <p className="text-xs text-on-surface-variant">
            Impulso prioritario para la disciplina de Taekwondo y ramas de alto rendimiento.
          </p>
        </div>

        {/* Visual Highlight: Disciplina Taekwondo y Atletas */}
        <div className="relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm border border-outline-variant/20">
          <img
            className="w-full h-40 object-cover"
            src={ASSETS.taekwondoAction}
            alt="Taekwondo Cantera Olímpica Pichincha"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
            <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold w-fit mb-1">
              Foco Destacado: Taekwondo UEP
            </span>
            <h4 className="font-headline font-bold text-sm sm:text-base leading-tight">
              Cantera Olímpica Pichincha
            </h4>
            <p className="text-xs text-white/80 line-clamp-1">
              Implementación de petos electrónicos, cascos homologados y giras zonales.
            </p>
          </div>
        </div>

        {/* Líneas de Apoyo (3 Cards con athletic border accent) */}
        <div className="grid grid-cols-1 gap-2.5">
          {/* Línea 1: Implementos Deportivos */}
          <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm relative overflow-hidden pl-4 border border-outline-variant/20">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    sports_kabaddi
                  </span>
                  <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                    1. Implementos y Equipamiento
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-snug">
                  Donación de doboks de entrenamiento, protectores tibiales, antebrazos y sacos de pateo para el dojang colegial.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    Meta: 15 kits completos
                  </span>
                  <span className="text-[10px] font-bold text-primary">8 kits cubiertos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Línea 2: Becas Cambio de Cinturón y Torneos */}
          <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm relative overflow-hidden pl-4 border border-outline-variant/20">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary-fixed-dim" />
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">
                    military_tech
                  </span>
                  <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                    2. Becas de Graduación y Torneos
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-snug">
                  Cobertura de aranceles de exámenes de grados (cintas), homologación Kukkiwon y traslados a selectivos provinciales.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    Fondo rotativo
                  </span>
                  <span className="text-[10px] font-bold text-tertiary">Desde $25 / mes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Línea 3: Aliados Institucionales y Empresas */}
          <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm relative overflow-hidden pl-4 border border-outline-variant/20">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary" />
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    domain
                  </span>
                  <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                    3. Alianzas Corporativas y Salud
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-snug">
                  Empresas que proveen suplementación deportiva certificada, fisioterapia o hidratación para delegaciones de la UEP CDP.
                </p>
                <div className="pt-1">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    Beneficio tributario e imagen institucional
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flujo Transparente de 4 Pasos */}
        <div className="rounded-xl bg-surface-container p-4 space-y-2 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
              Ruta de Transparencia (4 Pasos)
            </h4>
            <span className="text-[10px] text-primary font-bold">Comité CDP</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-center pt-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs mb-1">
                1
              </div>
              <p className="text-[11px] font-bold text-on-surface leading-tight">Propuesta</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Postulación</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-xs mb-1">
                2
              </div>
              <p className="text-[11px] font-bold text-on-surface leading-tight">Evaluación</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Comisión Téc.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-xs mb-1">
                3
              </div>
              <p className="text-[11px] font-bold text-on-surface leading-tight">Acuerdo</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Firma Convenio</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs mb-1">
                4
              </div>
              <p className="text-[11px] font-bold text-on-surface leading-tight">Rendición</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Informe Público</p>
            </div>
          </div>
        </div>

        {/* CTA Postulación de Patrocinio */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-surface-container-high to-surface-container-lowest shadow-sm flex flex-col space-y-3 border border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">award_star</span>
            </div>
            <div className="min-w-0">
              <p className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                ¿Tienes una empresa o marca aliada?
              </p>
              <p className="text-xs text-on-surface-variant">
                Conviértete en patrocinador oficial de la temporada deportiva 2026-2027.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSponsorModalOpen(true)}
            className="w-full h-11 rounded-lg bg-on-background text-surface text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:bg-primary hover:bg-black transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Postular Alianza o Patrocinio
          </button>
        </div>
      </section>

      {/* SECCIÓN 3: PREGUNTAS FRECUENTES Y CONTACTO CON EL COMITÉ */}
      <section className="flex flex-col space-y-2.5 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[20px]">help</span>
          <h3 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
            Preguntas Frecuentes
          </h3>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-2">
          {/* FAQ 1 */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-3.5 border border-outline-variant/20">
            <button
              type="button"
              className="w-full flex items-center justify-between text-left font-headline font-bold text-xs sm:text-sm text-on-surface"
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
            >
              <span>¿Cómo se manejan los fondos o donaciones de patrocinio?</span>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform text-[20px] ${
                  openFaq === 1 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === 1 && (
              <p className="text-xs text-on-surface-variant pt-2 leading-relaxed">
                Cada aporte ingresa a la subcuenta mancomunada del Comité Central. Los comprobantes y actas de entrega de implementos se publican bimestralmente en la pestaña 'Cuentas' para auditoría total de los padres.
              </p>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-3.5 border border-outline-variant/20">
            <button
              type="button"
              className="w-full flex items-center justify-between text-left font-headline font-bold text-xs sm:text-sm text-on-surface"
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            >
              <span>¿Quién evalúa las ideas sugeridas para Escuela para Familias?</span>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform text-[20px] ${
                  openFaq === 2 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === 2 && (
              <p className="text-xs text-on-surface-variant pt-2 leading-relaxed">
                La Comisión Académica y Bienestar Estudiantil del Comité Central, en articulación con el Departamento de Consejería Estudiantil (DECE) del colegio.
              </p>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-3.5 border border-outline-variant/20">
            <button
              type="button"
              className="w-full flex items-center justify-between text-left font-headline font-bold text-xs sm:text-sm text-on-surface"
              onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            >
              <span>¿Puedo donar equipo de Taekwondo usado en buen estado?</span>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform text-[20px] ${
                  openFaq === 3 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openFaq === 3 && (
              <p className="text-xs text-on-surface-variant pt-2 leading-relaxed">
                ¡Sí! Contamos con el 'Banco de Protección Solidario'. Cascos, canilleras y empeineras en óptimas condiciones son reacondicionados y entregados a deportistas de iniciación.
              </p>
            )}
          </div>
        </div>

        {/* Contacto Directo con el Comité Central */}
        <div className="rounded-xl bg-primary-fixed/60 p-4 flex flex-col space-y-3 mt-3 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">forum</span>
            </div>
            <div>
              <h4 className="font-headline font-bold text-xs sm:text-sm text-on-primary-fixed">
                ¿Deseas hablar directamente con la Directiva?
              </h4>
              <p className="text-xs text-on-surface-variant">
                Atención personalizada de lunes a viernes en el campus escolar.
              </p>
            </div>
          </div>
          <a
            className="w-full h-11 rounded-lg bg-primary text-on-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.99] transition-transform shadow-sm hover:bg-primary-container"
            href="mailto:comite.central@uepcdp.edu.ec"
            onClick={() => onShowToast('Abriendo cliente de correo institucional')}
          >
            <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
            Contactar al Comité Central UEP CDP
          </a>
        </div>
      </section>

      {/* MODAL FLOTANTE INTERACTIVO DE POSTULACIÓN DE PATROCINIO */}
      {isSponsorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-4 sm:p-5 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl border border-outline-variant/30">
            <div className="flex items-center justify-between border-b border-surface-variant pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  military_tech
                </span>
                <h4 className="font-headline font-bold text-sm text-on-surface">
                  Postular Patrocinio Deportivo
                </h4>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                onClick={() => setIsSponsorModalOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSponsorSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-xs font-semibold text-on-surface mb-1 block">
                  Razón Social o Familia Patrocinadora
                </label>
                <input
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20"
                  placeholder="Ej. Laboratorios Pichincha o Familia Gómez"
                  type="text"
                  value={sponsorOrg}
                  onChange={(e) => setSponsorOrg(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface mb-1 block">
                  Modalidad de Apoyo Deseada
                </label>
                <select
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20"
                  value={sponsorType}
                  onChange={(e) => setSponsorType(e.target.value)}
                >
                  <option value="Equipamiento Taekwondo">Equipamiento & Doboks (Taekwondo)</option>
                  <option value="Beca Desplazamiento">Bolsa de Viaje para Competencias</option>
                  <option value="Suplementación">Nutrición & Fisioterapia Deportiva</option>
                  <option value="Aporte Institucional">Aporte Fondo Rotativo General</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface mb-1 block">
                  Teléfono / WhatsApp de Contacto
                </label>
                <input
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20"
                  placeholder="Ej. 099 123 4567"
                  type="tel"
                  value={sponsorPhone}
                  onChange={(e) => setSponsorPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface mb-1 block">
                  Mensaje o alcance previsto
                </label>
                <textarea
                  className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none border border-outline-variant/20"
                  placeholder="Indícanos detalles de tu propuesta de valor o requerimientos de contraprestación..."
                  rows={2}
                  value={sponsorNotes}
                  onChange={(e) => setSponsorNotes(e.target.value)}
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  className="flex-1 h-11 rounded-lg bg-surface-container-high text-on-surface-variant font-bold text-xs"
                  onClick={() => setIsSponsorModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-lg bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-container"
                >
                  Enviar Postulación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
