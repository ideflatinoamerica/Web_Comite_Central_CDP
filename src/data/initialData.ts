import { PlanAxis, AgendaEvent, DocumentItem, ExpenseCategory, Expense } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS5nlFajpCspT-4K_EcVyNzlZyJm3CZCQh5XKM2AwimO7RbDcu0HA-Vwdv1kqHJWOvr-c6-VLIdU6E-zO9GegftFGcmW1QnWpkBld32FaD6lsoaSHW8TQHTBR9u-2_1qH3Nu5WbJDEEbiYp_Rlt23QcioouZZkDYK_xnvroIATm5IjTCsNwJoCuQzg-gLGoMmirxOfgMdeCcAgUDkfsWgKbh5p3gt9mwBZVh0B_aUC9cHfmJbaCf5J',
  heroAthletes: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5qf8WO3nkGhuGIEmaHeYst2O2VgXrw0UJxLs5a9hZwVDtam61E1ocFb0EMoJNIIZsLR52Jffb-rxR3yWsvawvJBYUMI1SBJgwxS0p6xOVzxtaG9Y25bjLPlO30dhVjAhbCrRi4LJzvwoBJxW8HO5I1UrGd7oOVN2nAF3-RQYB7hSRuo5_W50zhpI-CLcAmVkh0VgC9p5eUvTXJjFxH5V-eVUE7j__OBqo149z0Z2U8YS97G7iqTRy',
  taekwondoAction: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA47rVjudXOFMswrOH1Z3sWnMditqJwxXzH7wrNi7VdefrrupwXctT6iRbu2n8tK2Qy7Oxel-WuWsz4uNWKt_jcJfuwLxD6A3wKf59e4Mbv6wRyrCH7IL8CRXxwJX-vljx0SA3Cl0ii89rTv0qY4FCOVrd_HyRdkp90aMOmlygaf8AAfAZwrvGw-wcYk2ue-G0MQz39BjPyRk8DxDah-uG2Gjb8SI99wYXQBqRAKFCiMqY-6s-NxUyd',
  newsTaekwondo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfv2OBsO-g42_4DmuijKPbuJCHId9nCrUGp0mgoqh_z6fjgR8qhgM1bsHdpFywIE0rEwchK_jNbA5uiL9VrAxC0Zn5jAvYsnxNLPGCd1q3GFh-0NNBJioGuck5xbu-FBKPkd-KoPrYVThAclc-DpIBZqerH2yWVi6FNZZaZ3Drr4PU_RUujoii1RMq6WapxlR4O7SuyZUNxZ3sKLyO-UP4K7-rktoigD2JgifkKpT-3IRrLzEnp1i',
  newsDoctor: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWwWuxwDdIuJZWZnxWSLT9NYzKwXNZCkRs4e9rqAEkLeuyLsY2oV3N5m8VV-4jlgzjffvX5Jl7-7_1WZwd6gJqw5rJ4xYyCrUwfUGyK7kODPuCoME6r8faV0qCgBsB-XlUc10TcY85BfM2Rx24nJLE0Q5GPzWhnn0REtGx41gehpYQWITp2DV01FIXhPImyi0Li1YNIv1fa7QhvxK_BBZ4145U4lkM43wgxsvPy0-Dio6rwLvNkss-',
  newsGym: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3bBFlcawjhrUWb55JDHDRnPYaokYAXm5JSTdtGZdpD-W4spwMoHU4NvCf6hfQVSHn3srswrixYA9XIj8H9PXa9i_wFWMcuIELvj6nNsjC46x0xi-Fg-qcOu9lbM-BDql-Uz1n2bJOK39Qc0SheBw26soDW3fPXFirT6VpC-A7ZR2WryCPwC-cwQjKJNo7SUitd_hL8rV_Qf_Py6ZCF-vCy-UkERikdnmKp1LNNux80bAKphbqHsrK',
  leaderSergio: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8_W7gO2D7VwAueu8s2xIOs5OhmCpk4dx4rvCfXUzU3vBm4klqTpMk9CYZoR7lEN9mSxTlRkFRweXw6saZyFNW-cmebwbhAFiWMElO4WMLYdh1gfYn6zTOxWqIiZF01lRF6yYu_uuB5rimS1WYQvQvYcJt9pG_cdMupud460dQBIGlrYaf6pC2i9AOlvNWLyLE-7qfBqucABe1yXR9OGAlTwW-e_1R5lVg9SElSUs3LND4tTby4J0H',
  leaderLuis: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs1axr-ZyiPlVo3vRnW_rzIefPfQNs6n5jjskosdZWzYehnIS3Q_VAMqml04uZ6bbByyqLuGqkzjyHyps34ewmDB9BTH5V9tOv7bV_YXwT7CbkQQxLl8H6edcGPFvV532YMQVMv8Mg31RhPz-lhN8gmbuGpkmRz6CKD6kyupwlwPmcog7ih4cOGcPsC-freSoiZ4za9Zths8OKvtB8WMZKYKsOU9998UVOuZzthv9FXdfslQbdwBDP',
  leaderDiana: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6LJ79KJHBWd0aXtBW9NjFHrrYQ6EJoirqk1anThm_Pj5yrWjtvrKTKgYq05wzQduzCr6G2qdXjDURK6s3X5cDS9nq2CFzM-pUqSKWGxsO00xmelKTNnvorLUQE_AWMh89LY01QQvYDg3sZd-jb-FfGYix9bvb96i21x4IGwIRktPywa85lcDq7tUHbruFYGGEufIWdYG2sbgiEl-fhBc59mFcJ1p2wZ_MQPoKokNQ4sTN0F_AuWGx',
  leaderCarolina: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOTHTNWP3V0wSwgAGgT_Qdyo64S8aLLeO2oPISUZK4cCKBmiAzYcEvh9ygxhWyEc6gJDICT3eEeA0KEpVoMdgyxmyTyPGHDDNMIdC22AruR8uj6ko4q1Cgmb9WAX5xdARYp6yypbmo6ZYFCReLVJ-3GtWeSKIi4Y9xVbDMJZcWljYI6N7Mz1bHM4gUFhbB6ouCQjCbiVrwvrEGoJTAM0waj5_ZcW4fuENEblSgyph03PwPi1L1RkQR'
};

export interface LeadershipMember {
  name: string;
  status: 'Electo' | 'Electa' | 'Propuesto' | 'Propuesta';
  role: string;
  photo?: string;
  email?: string;
}

export const INITIAL_AXES: PlanAxis[] = [
  {
    id: 'eje-01',
    code: 'EJE 01',
    category: 'gestion',
    categoryLabel: 'Gestión',
    title: 'Coordinación y Comunicación',
    description: 'Implementación de un canal institucional transparente para consultas vinculantes, asambleas digitales y encuestas directas a las familias de todas las disciplinas.',
    meta: '100% de delegados conectados y respuesta de inquietudes en menos de 48 horas laborales.',
    indicator: '≥ 85% de participación en consultas mensuales y boletín digital bimensual emitido.',
    initialLikes: 42,
    phase: 'Fase 1',
    keywords: 'coordinacion comunicacion portal consulta encuesta familias transparencia'
  },
  {
    id: 'eje-02',
    code: 'EJE 02',
    category: 'gestion',
    categoryLabel: 'Gestión',
    title: 'Gestión Financiera',
    description: 'Esquema de aporte voluntario sugerido de USD 10/familia, cuenta mancomunada con doble firma y auditoría continua con respaldos fotográficos y facturas en línea.',
    meta: '100% de ingresos y egresos subidos al módulo digital con comprobante tributario válido.',
    indicator: 'Cierre contable publicado cada 30 días sin descuadres y conciliación bancaria visible.',
    initialLikes: 58,
    phase: 'Fase 1',
    keywords: 'gestion financiera aporte voluntario usd 10 dolares cuentas mancomunadas respaldos tesoreria presupuesto'
  },
  {
    id: 'eje-03',
    code: 'EJE 03',
    category: 'bienestar',
    categoryLabel: 'Bienestar',
    title: 'Nutrición y Bienestar',
    description: 'Monitoreo periódico de estándares sanitarios y nutricionales del bar escolar, complementado con cápsulas informativas para el rendimiento deportivo de alto nivel.',
    meta: 'Inspección higiénico-sanitaria mensual y propuesta de menús balanceados aprobados.',
    indicator: '12 cápsulas nutricionales difundidas y reporte bimestral de satisfacción alimentaria.',
    initialLikes: 36,
    phase: 'Fase 1',
    keywords: 'nutricion bienestar bar escolar comida saludable capsulas deportivas alimentacion atleta'
  },
  {
    id: 'eje-04',
    code: 'EJE 04',
    category: 'bienestar',
    categoryLabel: 'Bienestar',
    title: 'Seguridad y Accesos',
    description: 'Coordinación con Policía Nacional, agentes metropolitanos y brigadas de padres en horarios pico de entrada y salida a complejos deportivos y campus.',
    meta: 'Instalación formal de la Mesa Técnica de Seguridad Integral con autoridades zonales.',
    indicator: 'Cero incidentes perimetrales reportados y 100% de jornadas con rondas activas.',
    initialLikes: 49,
    phase: 'Fase 1',
    keywords: 'seguridad accesos coordinacion barrial mesa tecnica transito patrullaje salida entrada'
  },
  {
    id: 'eje-05',
    code: 'EJE 05',
    category: 'comunidad',
    categoryLabel: 'Comunidad',
    title: 'Actividades y Visitas Educativas',
    description: 'Planificación logística de salidas de campo, visitas científicas y recorridos culturales que complementen la formación académica y deportiva integral.',
    meta: 'Al menos una experiencia extramuros formativa por nivel durante el año lectivo.',
    indicator: 'Índice de satisfacción estudiantil ≥ 90% y protocolos de viaje aprobados con anticipación.',
    initialLikes: 27,
    phase: 'Fase 2',
    keywords: 'actividades visitas educativas salidas culturales museos experiencias formativas giras'
  },
  {
    id: 'eje-06',
    code: 'EJE 06',
    category: 'gestion',
    categoryLabel: 'Gestión',
    title: 'Espacios Institucionales',
    description: 'Levantamiento de diagnóstico técnico conjunto para solicitar y autogestionar el mantenimiento de aulas, vestuarios y áreas de entrenamiento de CDP.',
    meta: 'Plan de adecuaciones prioritarias presentado y avalado por las autoridades del colegio.',
    indicator: '3 proyectos de mejora física ejecutados y documentados fotográficamente.',
    initialLikes: 51,
    phase: 'Fase 2',
    keywords: 'espacios institucionales aulas canchas deportivas infraestructura mantenimiento cdp coliseo'
  },
  {
    id: 'eje-07',
    code: 'EJE 07',
    category: 'bienestar',
    categoryLabel: 'Bienestar',
    title: 'Proyectos Sociales',
    description: 'Constitución de un fondo solidario transparente reservado exclusivamente para emergencias de salud o contingencias graves que afecten a familias de alumnos deportistas.',
    meta: 'Reglamento claro de asignación rápida con comité veedor y fondos de auxilio inmediato.',
    indicator: 'Respuesta a emergencias en menos de 24 horas y auditoría de casos al 100%.',
    initialLikes: 45,
    phase: 'Fase 2',
    keywords: 'proyectos sociales fondo solidario becas contingencias familiares salud emergencia'
  },
  {
    id: 'eje-08',
    code: 'EJE 08',
    category: 'comunidad',
    categoryLabel: 'Comunidad',
    title: 'Comunidad UEP-CDP',
    description: 'Talleres integrales de formación para padres, eventos de integración deportiva familiar y gala anual de reconocimiento al mérito académico y competitivo.',
    meta: '3 encuentros formativos y ceremonia de premiación "Orgullo Oro y Grana" anual.',
    indicator: '> 350 familias asistentes y reconocimientos a todas las ramas deportivas.',
    initialLikes: 63,
    phase: 'Fase 2',
    keywords: 'comunidad uep cdp talleres padres escuela familias premiaciones merito deportivo academico medallas'
  }
];

export const INITIAL_EVENTS: AgendaEvent[] = [
  {
    id: 'evt-01',
    month: 'OCT',
    dayRange: '12-16',
    category: 'APRENDIZAJE',
    badgeType: 'calculate',
    timeOrPlace: '5 Días',
    title: 'Semana del Razonamiento Lógico',
    description: 'Desafíos matemáticos interactivos, olimpiada de cálculo rápido y exhibición de ciencias exactas.',
    responsible: 'Resp: Ciencias Exactas'
  },
  {
    id: 'evt-02',
    month: 'OCT',
    dayRange: '26-30',
    category: 'DEPORTE',
    badgeType: 'sports_volleyball',
    timeOrPlace: 'Pista Atlética',
    title: 'Semana del Fomento al Deporte',
    description: 'Clínicas formativas con atletas destacados de Pichincha y pruebas de aptitud física estudiantil.',
    responsible: 'Resp: Educación Física'
  },
  {
    id: 'evt-03',
    month: 'OCT',
    dayRange: '30',
    category: 'COMUNIDAD',
    badgeType: 'bakery_dining',
    timeOrPlace: '09:00 - 12:30',
    title: 'Programa Día de los Difuntos',
    description: 'Feria de colada morada y guaguas de pan organizadas por comités de grado junto a docentes.',
    responsible: 'Resp: Área Social y Cultural'
  },
  {
    id: 'evt-04',
    month: 'NOV',
    dayRange: '09-13',
    category: 'COMUNIDAD',
    badgeType: 'flag',
    timeOrPlace: 'Principal',
    title: 'Fiestas Patronales UEP CDP',
    description: 'Semana magna comunitaria con sesión solemne, desfile institucional y reconocimientos a atletas destacados.',
    responsible: 'Resp: Rectorado & Comité Central'
  },
  {
    id: 'evt-05',
    month: 'NOV',
    dayRange: '16',
    category: 'APRENDIZAJE',
    badgeType: 'how_to_vote',
    timeOrPlace: 'Jornada Completa',
    title: 'Elecciones del Consejo Estudiantil',
    description: 'Sufragio universal estudiantil, proclamación de lista ganadora y posesión oficial ante la asamblea.',
    responsible: 'Resp: Tribunal Electoral Estudiantil'
  },
  {
    id: 'evt-06',
    month: 'DIC',
    dayRange: '03',
    category: 'COMUNIDAD',
    badgeType: 'celebration',
    timeOrPlace: 'Tarde Quiteña',
    title: 'Fiestas de Quito: Canelazo y Tradición',
    description: 'Juegos tradicionales (trompos, coches de madera), comparsas y encuentro de camaradería de padres y docentes.',
    responsible: 'Resp: Comité Central de Padres'
  },
  {
    id: 'evt-07',
    month: 'DIC',
    dayRange: '23',
    category: 'COMUNIDAD',
    badgeType: 'redeem',
    timeOrPlace: '08:30 - 12:00',
    title: 'Programa Navideño Institucional',
    description: 'Festival de villancicos, entrega solidaria de canastas a familias y agasajo a las delegaciones deportivas.',
    responsible: 'Resp: Pastoral y Pastoral Social'
  },
  {
    id: 'evt-08',
    month: 'ENE',
    dayRange: '11',
    category: 'BIENESTAR',
    badgeType: 'psychology_alt',
    timeOrPlace: 'Conferencias',
    title: 'Día de la Salud Emocional y DECE',
    description: 'Talleres de prevención psicológica para atletas de alto rendimiento y orientación a padres de familia.',
    responsible: 'Resp: Departamento DECE'
  },
  {
    id: 'evt-09',
    month: 'MAR',
    dayRange: '20',
    category: 'DEPORTE',
    badgeType: 'military_tech',
    timeOrPlace: 'Estadio CDP',
    title: 'Inauguración Campeonato Interno',
    description: 'Encendido de la antorcha olímpica, desfile por categorías y apertura oficial de disciplinas 2027.',
    responsible: 'Resp: Coordinación Deportiva'
  },
  {
    id: 'evt-10',
    month: 'MAY',
    dayRange: '15',
    category: 'COMUNIDAD',
    badgeType: 'family_restroom',
    timeOrPlace: 'Todo el día',
    title: 'Gran Día de la Familia CDP',
    description: 'Festival gastronómico, bailoterapia intercolegial, bingos pro-fondos e integración deportiva de familias.',
    responsible: 'Resp: Comité Central 2026-2027'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-01',
    title: 'Informe de Gestión 2025–2026',
    subtitle: 'Memoria final, balance general y firmas',
    category: 'Financiero',
    fileName: 'Informe_Gestion_UEP_CDP_2025_2026.pdf',
    date: 'Septiembre 2026',
    summary: 'Balance auditado del período anterior. Total ingresos: $697.87, egresos: $561.27, superávit entregado: $136.60 en cuenta mancomunada con nota aclaratoria de $5.49.'
  },
  {
    id: 'doc-02',
    title: 'Cronograma de Actividades',
    subtitle: 'Calendario de asambleas y justas deportivas',
    category: 'Planificación',
    fileName: 'Cronograma_Actividades_UEP_CDP_2026_2027.pdf',
    date: 'Octubre 2026',
    summary: 'Planificación calendarizada de asambleas generales, comités técnicos de padres y fechas clave de participación deportiva intercolegial y provincial.'
  },
  {
    id: 'doc-03',
    title: 'Oficios Taekwondo & Reorganización',
    subtitle: 'Peticiones oficiales CDP y comisiones',
    category: 'Institucional',
    fileName: 'Oficios_Taekwondo_Reorganizacion_CDP.pdf',
    date: 'Agosto 2026',
    summary: 'Solicitud ante la Concentración Deportiva de Pichincha para entrega de nuevos petos homologados, canilleras y facilitación de dojang.'
  },
  {
    id: 'doc-04',
    title: 'Resumen Acuerdo Ministerial',
    subtitle: 'Marco legal sobre directivas de padres UEP',
    category: 'Normativa',
    fileName: 'Resumen_Acuerdo_MINEDUC_2023_00075_A.pdf',
    date: 'Vigente',
    summary: 'Síntesis ejecutiva del Acuerdo Ministerial MINEDUC-2023-00075-A que rige las directivas de madres, padres y representantes en el Sistema Nacional de Educación.'
  }
];

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: 'Sergio Lira',
    status: 'Electo',
    role: 'Presidente',
    photo: ASSETS.leaderSergio,
    email: 'presidencia@uepcdp.edu.ec'
  },
  {
    name: 'Luis Alejandro Yánez',
    status: 'Electo',
    role: 'Vicepresidente',
    photo: ASSETS.leaderLuis,
    email: 'vicepresidencia@uepcdp.edu.ec'
  },
  {
    name: 'Diana Ávila',
    status: 'Electa',
    role: 'Tesorera',
    photo: ASSETS.leaderDiana,
    email: 'tesoreria@uepcdp.edu.ec'
  },
  {
    name: 'Gabriela Pazos',
    status: 'Electa',
    role: 'Secretaria'
  },
  {
    name: 'Carolina Larco',
    status: 'Electa',
    role: 'Vocal',
    photo: ASSETS.leaderCarolina,
    email: 'bienestar@uepcdp.edu.ec'
  },
  {
    name: 'Valeria Zavala',
    status: 'Electa',
    role: 'Vocal'
  }
];

export const INITIAL_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: 'cat-deportes', name: 'Deportes y campeonatos' },
  { id: 'cat-mantenimiento', name: 'Mantenimiento y logística' },
  { id: 'cat-admin', name: 'Gastos administrativos' },
  { id: 'cat-salud', name: 'Botiquín y salud' }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    categoryId: 'cat-salud',
    concept: 'Insumos de botiquín de pista',
    amount: 45.2,
    date: '12 Oct 2026',
    receipt: 'Fac. #001-002-8921',
    responsible: 'Ing. Diana Ávila'
  },
  {
    id: 'exp-2',
    categoryId: 'cat-deportes',
    concept: 'Arbitraje selectivo de taekwondo',
    amount: 60,
    date: '08 Oct 2026',
    receipt: 'Fac. #002-010-4412',
    responsible: 'Lcdo. Sergio Lira'
  },
  {
    id: 'exp-3',
    categoryId: 'cat-admin',
    concept: 'Actas de asamblea y libros',
    amount: 18.5,
    date: '03 Oct 2026',
    receipt: 'Fac. #001-001-1184',
    responsible: 'Secretaría del Comité'
  },
  {
    id: 'exp-4',
    categoryId: 'cat-mantenimiento',
    concept: 'Iluminación de pista de entrenamiento',
    amount: 86.27,
    date: '28 Sep 2026',
    receipt: 'Fac. #001-004-2201',
    responsible: 'Ing. Diana Ávila'
  },
  {
    id: 'exp-5',
    categoryId: 'cat-deportes',
    concept: 'Transporte a selectivo provincial',
    amount: 120,
    date: '20 Sep 2026',
    receipt: 'Fac. #003-008-5510',
    responsible: 'Comisión de Deportes'
  }
];

/** Eje 01 queda completado para que el aviso de inicio muestre 1/8. */
export const INITIAL_COMPLETED_AXES = ['eje-01'];
