import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { INITIAL_DOCUMENTS } from '../data/initialData';
import { downloadFile } from '../utils/documentGenerator';

interface CuentasViewProps {
  onShowToast: (msg: string) => void;
}

export const CuentasView: React.FC<CuentasViewProps> = ({ onShowToast }) => {
  const [period, setPeriod] = useState<'current' | 'past'>('current');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showReceiptsModal, setShowReceiptsModal] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState<DocumentItem | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleDocumentAction = (doc: DocumentItem) => {
    setSelectedDocPreview(doc);
  };

  const handleDownloadDoc = (doc: DocumentItem) => {
    const content = `================================================================================
COMITÉ CENTRAL DE PADRES DE FAMILIA - UEP CDP
DOCUMENTO OFICIAL DIGITALIZADO: ${doc.title.toUpperCase()}
================================================================================
CATEGORÍA: ${doc.category}
FECHA / PERÍODO: ${doc.date}
ARCHIVO ASOCIADO: ${doc.fileName}

SÍNTESIS OFICIAL:
${doc.summary}

DECLARACIÓN DE INTEGRIDAD Y TRANSPARENCIA:
Este documento forma parte del repositorio público de cuentas y fiscalización
de la Unidad Educativa Particular Concentración Deportiva de Pichincha.
Cualquier solicitud de acceso físico al libro contable original puede presentarse 
con 48 horas de anticipación ante la Secretaría del Comité.

Firmado por:
- Presidencia: Lcdo. Sergio Lira
- Tesorería: Ing. Diana Ávila
- Comisión de Fiscalización Ciudadana UEP CDP
================================================================================`;

    downloadFile(doc.fileName.replace('.pdf', '.txt'), content);
    onShowToast(`Descargando ${doc.fileName}...`);
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Segment Switch Móvil de Períodos */}
      <div className="w-full bg-surface-container-high p-1 rounded-xl shadow-sm flex items-center gap-1 select-none border border-outline-variant/20">
        <button
          type="button"
          onClick={() => setPeriod('current')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
            period === 'current'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>2026–2027 (Actual)</span>
        </button>
        <button
          type="button"
          onClick={() => setPeriod('past')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
            period === 'past'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">history</span>
          <span>2025–2026 (Histórico)</span>
        </button>
      </div>

      {/* VISTA 1: GESTIÓN ACTUAL (2026-2027) */}
      {period === 'current' && (
        <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
          {/* Estado de Caja Inicial y Propuesta */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary p-4 shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1 bg-surface-container-lowest/15 backdrop-blur-md px-2 py-0.5 rounded-full">
                  <span
                    className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary-fixed">
                    Ejercicio Vigente
                  </span>
                </div>
                <h2 className="font-headline font-bold text-lg sm:text-xl tracking-tight pt-1">
                  Caja Inicial & Fondo Activo
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-primary-fixed block font-medium">
                  Fondo Apertura
                </span>
                <span className="font-headline font-bold text-2xl text-on-primary tracking-tight">
                  $136,60
                </span>
              </div>
            </div>

            {/* Cuota voluntaria badge destacado */}
            <div className="bg-surface-container-lowest text-on-surface rounded-lg p-3.5 mt-2 shadow-sm">
              <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container-low px-2.5 py-1.5 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[18px]">handshake</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                      Aporte Familiar Sugerido
                    </p>
                    <p className="text-[10px] text-on-surface-variant">Ciclo Lectivo Anual</p>
                  </div>
                </div>
                <span className="font-headline font-extrabold text-lg text-primary">$10,00</span>
              </div>
              <div className="flex items-start gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5 shrink-0">
                  info
                </span>
                <p className="text-xs leading-snug">
                  <strong className="text-on-surface font-semibold">
                    Carácter 100% Voluntario y No Excluyente:
                  </strong>{' '}
                  Este aporte no condiciona matrículas, evaluaciones ni participación en competencias. Financia botiquines de pista, arbitrajes federados y premiación institucional.
                </p>
              </div>
            </div>
          </div>

          {/* Panel de Gobernanza y Rendición Trimestral */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm space-y-3 border border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">policy</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                  Gobernanza & Fiscalización Abierta
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Mecanismos de control democrático y auditoría
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-surface-container-low p-3 rounded-lg flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-primary mb-1.5">
                  <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                  <span className="text-xs font-bold">Trimestral</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Presentación de estados financieros en asamblea y app cada 90 días.
                </p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-primary mb-1.5">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span className="text-xs font-bold">100% Facturas</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Copia digitalizada de facturas autorizadas por SRI por cada egreso.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowReceiptsModal(true)}
              className="w-full flex items-center justify-between bg-surface-container hover:bg-surface-container-high p-2.5 rounded-lg text-on-surface transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  lock_open
                </span>
                <span className="text-xs font-semibold">
                  Carpeta Pública de Comprobantes 26-27
                </span>
              </div>
              <span className="bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full">
                En Vivo
              </span>
            </button>
          </div>
        </div>
      )}

      {/* VISTA 2: MEMORIA HISTÓRICA (2025-2026) */}
      {period === 'past' && (
        <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
          {/* Métricas Financieras Principales */}
          <div className="grid grid-cols-3 gap-2">
            {/* Ingresos */}
            <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div className="flex items-center gap-1 text-primary mb-1">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span className="text-[10px] font-bold truncate">Ingresos</span>
              </div>
              <div>
                <span className="font-headline font-bold text-sm sm:text-base text-on-surface block">
                  $697,87
                </span>
                <span className="text-[10px] text-on-surface-variant">Reportado</span>
              </div>
            </div>

            {/* Egresos */}
            <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div className="flex items-center gap-1 text-secondary mb-1">
                <span className="material-symbols-outlined text-[16px]">trending_down</span>
                <span className="text-[10px] font-bold truncate">Egresos</span>
              </div>
              <div>
                <span className="font-headline font-bold text-sm sm:text-base text-on-surface block">
                  $561,27
                </span>
                <span className="text-[10px] text-on-surface-variant">Con respaldo</span>
              </div>
            </div>

            {/* Saldo Entregado */}
            <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
              <div className="flex items-center gap-1 text-tertiary mb-1">
                <span className="material-symbols-outlined text-[16px]">account_balance</span>
                <span className="text-[10px] font-bold truncate">Superávit</span>
              </div>
              <div>
                <span className="font-headline font-bold text-sm sm:text-base text-primary block">
                  $136,60
                </span>
                <span className="text-[10px] text-on-surface-variant">En traspaso</span>
              </div>
            </div>
          </div>

          {/* Alerta Ética de Conciliación Pendiente */}
          <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-2 border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 font-bold">
                <span className="material-symbols-outlined text-[18px]">balance</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                  Transparencia Radical: Conciliación
                </h4>
                <span className="text-[10px] text-tertiary block font-bold">
                  Diferencia técnica: $5,49
                </span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg leading-relaxed">
              El arqueo de actas salientes arrojó una divergencia contable menor de{' '}
              <strong>USD $5,49</strong> entre el libro físico de tesorería y la libreta bancaria de ahorros. Por rigor estatutario, este saldo no se imputó al gasto y se encuentra bajo verificación documentaria con el comité saliente.
            </p>
            <div className="flex items-center justify-between text-on-surface-variant pt-1 text-[11px] px-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">gavel</span>
                Dictamen de Comisión Fiscal
              </span>
              <span className="text-xs text-primary font-bold">Acta #04-CP</span>
            </div>
          </div>

          {/* Resumen visual de distribución del egreso anterior */}
          <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-2.5 border border-outline-variant/20">
            <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
              Destino de los Fondos (2025–2026)
            </h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-on-surface mb-1 font-semibold">
                  <span>Deportes y Campeonatos UEP CDP</span>
                  <span>$320,00 (57%)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[57%] rounded-full transition-all duration-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-on-surface mb-1 font-semibold">
                  <span>Mantenimiento & Logística de Pista</span>
                  <span>$155,00 (28%)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary-container h-full w-[28%] rounded-full transition-all duration-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-on-surface mb-1 font-semibold">
                  <span>Gastos Administrativos e Imprevistos</span>
                  <span>$86,27 (15%)</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary-fixed-dim h-full w-[15%] rounded-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Biblioteca de Documentos y Actas Oficiales */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              folder_shared
            </span>
            <h3 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
              Biblioteca de Documentos & Actas
            </h3>
          </div>
          <span className="text-[11px] text-on-surface-variant font-medium">PDF Firmados</span>
        </div>

        <div className="space-y-2">
          {INITIAL_DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between gap-3 border border-outline-variant/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">description</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface truncate">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant truncate">{doc.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDocumentAction(doc)}
                  className="h-9 px-3 bg-surface-container-high text-primary rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-primary hover:text-on-primary transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Ver</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preguntas Frecuentes (FAQ Acordeón) */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center gap-2 px-0.5">
          <span className="material-symbols-outlined text-primary text-[20px]">
            help_center
          </span>
          <h3 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
            Preguntas Frecuentes & Claridad
          </h3>
        </div>

        <div className="space-y-2">
          {/* FAQ 1 */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
            <button
              type="button"
              className="w-full p-3.5 flex items-center justify-between text-left gap-3"
              onClick={() => toggleFaq('faq-1')}
            >
              <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                ¿Es obligatorio abonar los USD $10 por familia?
              </span>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                  expandedFaq === 'faq-1' ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === 'faq-1' && (
              <div className="px-3.5 pb-3.5 pt-0 text-on-surface-variant text-xs space-y-1.5">
                <div className="p-2.5 bg-surface-container-low rounded-lg leading-relaxed">
                  No. La normativa del Ministerio de Educación y el Estatuto de la UEP CDP estipulan expresamente que ningún valor gestionado por el Comité Central tiene carácter forzoso o condicionante. El aporte es 100% colaborativo y busca apoyar a las selecciones estudiantiles en transporte y materiales.
                </div>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
            <button
              type="button"
              className="w-full p-3.5 flex items-center justify-between text-left gap-3"
              onClick={() => toggleFaq('faq-2')}
            >
              <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                ¿Cómo puedo auditar o fiscalizar el uso de los fondos?
              </span>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                  expandedFaq === 'faq-2' ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === 'faq-2' && (
              <div className="px-3.5 pb-3.5 pt-0 text-on-surface-variant text-xs space-y-1.5">
                <div className="p-2.5 bg-surface-container-low rounded-lg leading-relaxed">
                  Cualquier padre o tutor legal acreditado puede solicitar una revisión de libros con anticipación de 48 horas mediante correo formal a fiscalizacion@uepcdp.edu.ec, o consultar la sección pública de respaldos con facturas electrónicas digitalizadas.
                </div>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
            <button
              type="button"
              className="w-full p-3.5 flex items-center justify-between text-left gap-3"
              onClick={() => toggleFaq('faq-3')}
            >
              <span className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                ¿Qué sucede si un aula no logra recaudar su meta?
              </span>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                  expandedFaq === 'faq-3' ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {expandedFaq === 'faq-3' && (
              <div className="px-3.5 pb-3.5 pt-0 text-on-surface-variant text-xs space-y-1.5">
                <div className="p-2.5 bg-surface-container-low rounded-lg leading-relaxed">
                  No existen sanciones, listas públicas ni distinciones. El presupuesto global se ajusta solidariamente priorizando siempre emergencias médicas en competiciones y mantenimiento esencial de áreas de práctica compartidas.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Vista Previa y Descarga de Documento */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-5 shadow-2xl border border-outline-variant/30 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-surface-variant pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  picture_as_pdf
                </span>
                <h4 className="font-headline font-bold text-sm text-on-surface truncate">
                  {selectedDocPreview.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-3.5 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Período:</span>
                <span className="text-on-surface font-bold">{selectedDocPreview.date}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Tipo:</span>
                <span className="text-primary font-bold">{selectedDocPreview.category}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Archivo:</span>
                <span className="text-on-surface font-mono text-[11px]">
                  {selectedDocPreview.fileName}
                </span>
              </div>
              <div className="pt-2 border-t border-surface-variant">
                <p className="text-on-surface-variant font-medium mb-1">Resumen del Contenido:</p>
                <p className="text-on-surface leading-relaxed">{selectedDocPreview.summary}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="flex-1 h-11 rounded-lg bg-surface-container-high text-on-surface-variant text-xs font-bold"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadDoc(selectedDocPreview);
                  setSelectedDocPreview(null);
                }}
                className="flex-1 h-11 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary-container flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Descargar Archivo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Carpeta Pública de Comprobantes SRI */}
      {showReceiptsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-5 shadow-2xl border border-outline-variant/30 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-surface-variant pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  verified_user
                </span>
                <h4 className="font-headline font-bold text-sm text-on-surface">
                  Carpeta Pública de Comprobantes SRI 26-27
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptsModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              En cumplimiento del estatuto de transparencia, cada factura de compra, botiquín o arbitraje federado se archiva en tiempo real para escrutinio de los padres de familia.
            </p>

            {/* List of sample verified receipts */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Fac. #001-002-8921</p>
                  <p className="text-[11px] text-on-surface-variant">
                    Farmacia Pichincha - Insumos botiquín pista
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary block">$45,20</span>
                  <span className="text-[10px] text-green-700 bg-green-100 px-1.5 py-0.2 rounded font-semibold">
                    Validada SRI
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Fac. #002-010-4412</p>
                  <p className="text-[11px] text-on-surface-variant">
                    Asociación Provincial - Arbitraje selectivo Taekwondo
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary block">$60,00</span>
                  <span className="text-[10px] text-green-700 bg-green-100 px-1.5 py-0.2 rounded font-semibold">
                    Validada SRI
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Fac. #001-001-1184</p>
                  <p className="text-[11px] text-on-surface-variant">
                    Papelería y Sellos - Actas de asamblea y libros
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary block">$18,50</span>
                  <span className="text-[10px] text-green-700 bg-green-100 px-1.5 py-0.2 rounded font-semibold">
                    Validada SRI
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-tertiary-fixed/30 rounded-lg text-[11px] text-on-surface space-y-1">
              <p className="font-bold">Total respaldo acumulado: $123,70</p>
              <p className="text-on-surface-variant">
                Todos los comprobantes físicos reposan en la oficina del Comité en el campus escolar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowReceiptsModal(false);
                onShowToast('Comprobantes verificados');
              }}
              className="w-full h-11 rounded-lg bg-primary text-on-primary text-xs font-bold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
