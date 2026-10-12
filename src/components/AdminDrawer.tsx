import React, { useState } from 'react';
import { Proposal, SponsorApplication } from '../types';
import { downloadFile, generateProposalTicketText } from '../utils/documentGenerator';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  proposals: Proposal[];
  sponsors: SponsorApplication[];
  onUpdateProposalStatus: (id: string, status: Proposal['status']) => void;
  onShowToast: (msg: string) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  proposals,
  sponsors,
  onUpdateProposalStatus,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'sponsors'>('proposals');

  if (!isOpen) return null;

  const handleExportAll = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      institution: 'Comité Central UEP CDP 2026-2027',
      totalProposals: proposals.length,
      totalSponsors: sponsors.length,
      proposals,
      sponsors
    };
    downloadFile(
      `Reporte_Directiva_UEP_CDP_${Date.now()}.json`,
      JSON.stringify(data, null, 2),
      'application/json'
    );
    onShowToast('Reporte administrativo exportado en JSON');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl p-7 shadow-2xl border border-outline-variant/30 space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-variant pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              admin_panel_settings
            </span>
            <div>
              <h3 className="font-headline font-bold text-sm sm:text-base text-on-surface">
                Buzón de Mesa Directiva
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Gestión de propuestas ciudadanas y patrocinios
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Switcher & Export */}
        <div className="flex items-center justify-between gap-2 shrink-0">
          <div className="flex bg-surface-container-low p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('proposals')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'proposals'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Propuestas ({proposals.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sponsors')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'sponsors'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Patrocinios ({sponsors.length})
            </button>
          </div>

          <button
            type="button"
            onClick={handleExportAll}
            className="btn-action bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
          {activeTab === 'proposals' ? (
            proposals.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant">
                <span className="material-symbols-outlined text-[32px] text-outline">
                  inbox_customize
                </span>
                <p className="mt-1 font-semibold">No hay propuestas registradas aún</p>
                <p className="text-[11px]">
                  Crea una propuesta en la pestaña 'Participa' para probar el flujo.
                </p>
              </div>
            ) : (
              proposals.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary font-mono text-[11px]">
                      #{prop.ticketNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prop.status === 'Aprobado'
                          ? 'bg-green-100 text-green-800'
                          : prop.status === 'En revisión'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-primary-fixed text-on-primary-fixed'
                      }`}
                    >
                      {prop.status}
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-on-surface">{prop.author}</p>
                    <p className="text-[11px] text-on-surface-variant">
                      {prop.grade} • {prop.discipline} • {prop.categoryTitle}
                    </p>
                  </div>

                  <p className="text-on-surface bg-white p-2 rounded border border-outline-variant/10 leading-snug">
                    "{prop.description}"
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-on-surface-variant">{prop.createdAt}</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const nextStatus =
                            prop.status === 'Recibido'
                              ? 'En revisión'
                              : prop.status === 'En revisión'
                              ? 'Aprobado'
                              : 'Recibido';
                          onUpdateProposalStatus(prop.id, nextStatus);
                          onShowToast(`Estado de #${prop.ticketNumber} cambiado a ${nextStatus}`);
                        }}
                        className="px-2 py-1 bg-surface-container-highest rounded text-[11px] font-bold hover:bg-surface-variant text-on-surface"
                      >
                        Cambiar Estado
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const text = generateProposalTicketText(prop);
                          downloadFile(`Ticket_${prop.ticketNumber}.txt`, text);
                        }}
                        className="p-1 rounded bg-surface-container-highest text-primary hover:bg-surface-variant"
                        title="Descargar Ticket"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : sponsors.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px] text-outline">
                military_tech
              </span>
              <p className="mt-1 font-semibold">No hay postulaciones de patrocinio</p>
              <p className="text-[11px]">
                Postula una empresa en la pestaña 'Participa' para verla aquí.
              </p>
            </div>
          ) : (
            sponsors.map((spon) => (
              <div
                key={spon.id}
                className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary font-mono text-[11px]">
                    #{spon.ticketNumber}
                  </span>
                  <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-bold px-2 py-0.5 rounded-full">
                    {spon.status}
                  </span>
                </div>
                <p className="font-bold text-on-surface">{spon.orgName}</p>
                <p className="text-[11px] text-on-surface-variant">
                  Modalidad: <span className="font-semibold text-on-surface">{spon.modality}</span>
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  Contacto: <span className="font-semibold text-on-surface">{spon.phone}</span>
                </p>
                {spon.notes && (
                  <p className="text-[11px] text-on-surface italic bg-white p-1.5 rounded">
                    "{spon.notes}"
                  </p>
                )}
                <span className="text-[10px] text-on-surface-variant block text-right pt-1">
                  Registrado: {spon.createdAt}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-surface-variant flex justify-between items-center shrink-0">
          <span className="text-[11px] text-on-surface-variant">
            Comisión de Enlace • UEP CDP 2026-2027
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn-action bg-primary text-on-primary hover:bg-primary-container"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
