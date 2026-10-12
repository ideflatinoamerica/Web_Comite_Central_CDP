import { Proposal, SponsorApplication } from '../types';

export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generatePlanExecutiveSummary(): string {
  return `================================================================================
COMITÉ CENTRAL DE PADRES DE FAMILIA - UEP CDP
UNIDAD EDUCATIVA PARTICULAR CONCENTRACIÓN DEPORTIVA DE PICHINCHA
PERÍODO OFICIAL: 2026 - 2027
DOCUMENTO OFICIAL: RESUMEN EJECUTIVO DEL PLAN MAESTRO DE 8 EJES
================================================================================

LEMA DE GESTIÓN:
"En equipo, les damos alas al futuro. Su talento deportivo, nuestro compromiso institucional."

VISIÓN:
Construir una comunidad participativa con rigor atlético, transparencia activa y vocación 
de servicio enfocada en el bienestar de nuestros estudiantes deportistas de Pichincha.

--------------------------------------------------------------------------------
LOS 8 EJES ESTRATÉGICOS DE TRABAJO:
--------------------------------------------------------------------------------

[EJE 01] COORDINACIÓN Y COMUNICACIÓN (Gestión)
- Alcance: Canal institucional transparente para consultas vinculantes, asambleas digitales y encuestas directas a las familias.
- Meta Sugerida: 100% de delegados conectados y respuesta en menos de 48 horas laborales.
- Indicador: ≥ 85% de participación en consultas mensuales y boletín digital bimensual.

[EJE 02] GESTIÓN FINANCIERA (Gestión)
- Alcance: Aporte voluntario sugerido de USD 10/familia, cuenta mancomunada con doble firma y auditoría continua con comprobantes tributarios.
- Meta Sugerida: 100% de ingresos y egresos publicados en módulo digital con respaldo SRI.
- Indicador: Cierre contable mensual sin descuadres y conciliación bancaria transparente.

[EJE 03] NUTRICIÓN Y BIENESTAR (Bienestar)
- Alcance: Monitoreo periódico de estándares sanitarios y nutricionales del bar escolar y cápsulas para alto rendimiento.
- Meta Sugerida: Inspección mensual y propuesta de menús balanceados.
- Indicador: 12 cápsulas nutricionales difundidas y reporte bimestral de satisfacción alimentaria.

[EJE 04] SEGURIDAD Y ACCESOS (Bienestar)
- Alcance: Coordinación con Policía Nacional, agentes metropolitanos y brigadas de padres en horas pico de entrenamiento y campus.
- Meta Sugerida: Instalación formal de la Mesa Técnica de Seguridad Integral.
- Indicador: Cero incidentes perimetrales y 100% de jornadas con rondas activas.

[EJE 05] ACTIVIDADES Y VISITAS EDUCATIVAS (Comunidad)
- Alcance: Logística de salidas de campo, visitas científicas y recorridos culturales formativos.
- Meta Sugerida: Al menos una experiencia extramuros formativa por nivel durante el año.
- Indicador: Índice de satisfacción estudiantil ≥ 90% y protocolos de viaje aprobados con anticipación.

[EJE 06] ESPACIOS INSTITUCIONALES (Gestión)
- Alcance: Diagnóstico técnico conjunto para autogestión de mejoras en aulas, vestuarios y áreas de entrenamiento de CDP.
- Meta Sugerida: Plan de adecuaciones prioritarias avalado por el colegio.
- Indicador: 3 proyectos de mejora física ejecutados y documentados fotográficamente.

[EJE 07] PROYECTOS SOCIALES (Bienestar)
- Alcance: Fondo solidario transparente reservado para emergencias graves de salud de familias de alumnos deportistas.
- Meta Sugerida: Reglamento claro de auxilio inmediato con comité veedor.
- Indicador: Respuesta a emergencias en menos de 24 horas y auditoría al 100%.

[EJE 08] COMUNIDAD UEP-CDP (Comunidad)
- Alcance: Talleres integrales para padres, eventos de integración deportiva y gala anual de reconocimiento "Orgullo Oro y Grana".
- Meta Sugerida: 3 encuentros formativos y ceremonia de premiación anual.
- Indicador: > 350 familias asistentes y reconocimientos a todas las ramas deportivas.

--------------------------------------------------------------------------------
MARCO LEGAL Y NORMATIVO:
Acuerdo Ministerial MINEDUC-2023-00075-A sobre participación democrática y corresponsabilidad.

DIRECTIVA 2026-2027:
- Presidente: Sergio Lira
- Vicepresidente: Luis Alejandro Yánez
- Tesorera: Diana Ávila
- Vocal de Bienestar y Deportes: Carolina Larco

Secretaría General UEP CDP - Quito, Ecuador.
================================================================================
`;
}

export function generateProposalTicketText(proposal: Proposal): string {
  return `================================================================================
COMPROBANTE DE PROPUESTA CIUDADANA - COMITÉ CENTRAL UEP CDP
PERÍODO 2026 - 2027
================================================================================
NÚMERO DE TICKET: ${proposal.ticketNumber}
FECHA DE INGRESO: ${proposal.createdAt}
ESTADO: ${proposal.status}

DATOS DEL PROPONENTE:
- Representante / Familia: ${proposal.author}
- Nivel Académico: ${proposal.grade}
- Disciplina Deportiva: ${proposal.discipline}
- Categoría: ${proposal.categoryTitle}

DETALLE DE LA PROPUESTA:
"${proposal.description}"

RUTA DE SEGUIMIENTO (4 PASOS):
1. [x] Propuesta: Ingresada en el buzón oficial digital.
2. [ ] Evaluación: Comisión Técnica del Comité Central (próxima asamblea).
3. [ ] Acuerdo: Dictamen y contacto con el proponente vía delegatura.
4. [ ] Rendición: Publicación de acuerdos en el boletín bimensual.

Canal de atención: presidencia@uepcdp.edu.ec / comite.central@uepcdp.edu.ec
================================================================================`;
}

export function generateSponsorReceiptText(sponsor: SponsorApplication): string {
  return `================================================================================
PROGRAMA "PATROCINA UN ATLETA CDP" - COMITÉ CENTRAL UEP CDP
CONFIRMACIÓN DE POSTULACIÓN DE ALIANZA O PATROCINIO
================================================================================
TICKET DE POSTULACIÓN: ${sponsor.ticketNumber}
FECHA DE REGISTRO: ${sponsor.createdAt}
ESTADO: ${sponsor.status}

DATOS DEL PATROCINADOR:
- Razón Social / Familia: ${sponsor.orgName}
- Modalidad Seleccionada: ${sponsor.modality}
- Teléfono / WhatsApp: ${sponsor.phone}

OBSERVACIONES / ALCANCE:
"${sponsor.notes || 'Sin notas adicionales especificadas.'}"

COMPROMISO DE TRANSPARENCIA:
Toda donación o convenio pasa por la subcuenta mancomunada del Comité Central con
actas de entrega públicas y certificación institucional UEP CDP para fines de 
visibilidad y deducibilidad legal.

Contacto de Alianzas: tesoreria@uepcdp.edu.ec
================================================================================`;
}
