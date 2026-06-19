/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReportItem, AssessmentQuestion, ProjectMilestone } from "./types";

export const REPORT_ITEMS: ReportItem[] = [
  {
    id: "auditoria",
    title: "Auditoría integral",
    iconName: "SearchCode",
    shortDesc: "Diagnóstico profundo de sistemas, cuellos de botella y brechas lógicas.",
    longDesc: "Analizamos tu infraestructura de software, bases de datos y flujos procedimentales de trabajo para identificar ineficiencias críticas. Evitamos la duplicación de tareas y localizamos pérdidas financieras ocultas por falta de integración.",
    benefits: [
      "Mapeo completo de dependencias críticas y flujos de datos.",
      "Identificación de licencias inactivas o redundantes (ahorro inmediato).",
      "Detección de vulnerabilidades de seguridad en el resguardo de información."
    ],
    estimatedTime: "2-3 semanas",
    roiContribution: "Alta (reducción de errores operativos en ~30%)"
  },
  {
    id: "crm-erp",
    title: "Propuesta CRM/ERP",
    iconName: "Database",
    shortDesc: "Roadmap de migración a la nube y unificación de datos comerciales.",
    longDesc: "Diseñamos la arquitectura óptima para centralizar la relación con tus clientes, la cadena de suministro y la facturación. Evaluamos si es mejor un desarrollo a medida o la integración de plataformas líderes como Salesforce, SAP o HubSpot.",
    benefits: [
      "Centralización del historial comercial en una sola fuente de verdad.",
      "Automatización de embudos de ventas y facturación recurrente.",
      "Acceso móvil inmediato para el equipo comercial en campo."
    ],
    estimatedTime: "4-6 semanas",
    roiContribution: "Muy Alta (crecimiento de conversión de leads en +24%)"
  },
  {
    id: "capacitacion",
    title: "Plan capacitación",
    iconName: "GraduationCap",
    shortDesc: "Capacitación 4.0 adaptada para garantizar la adopción del personal.",
    longDesc: "La tecnología no sirve sin adopción de cultura. Creamos talleres prácticos dirigidos a la medida de tu equipo tradicional, respetando sus conocimientos acumulados pero dotándolos de agilidad digital moderna sin frustraciones.",
    benefits: [
      "Minimización de la resistencia al cambio con dinámicas de gamificación.",
      "Manuales interactivos breves y videotutoriales listos para consulta.",
      "Evaluación presencial del nivel de adopción por departamento."
    ],
    estimatedTime: "Continuo (paralelo a implementación)",
    roiContribution: "Exponencial (incremento de retención de conocimientos +45%)"
  },
  {
    id: "impacto",
    title: "Impacto esperado",
    iconName: "TrendingUp",
    shortDesc: "Proyección financiera, métricas de eficiencia y plazos de retorno.",
    longDesc: "Sustentamos cada inversión tecnológica con números transparentes. Desde el costo total de propiedad (TCO) hasta el punto de equilibrio operativo, sabrás exactamente cuándo y cómo cada dólar gastado vuelve en rentabilidad.",
    benefits: [
      "Análisis de VAN (Valor Actual Neto) y TIR proyectado a 3 años.",
      "Métricas clave (KPIs) para auditar mensualmente los avances.",
      "Plan de mitigación ante posibles demoras en el despliegue."
    ],
    estimatedTime: "Presentado en la entrega final",
    roiContribution: "Garantía de Claridad (Decisión de negocio 100% justificada)"
  }
];

export const REGNICOLI_MILESTONES: ProjectMilestone[] = [
  {
    number: 1,
    title: "ERP Cloud & CRM Migration",
    description: "Centralización de datos y gestión comercial en tiempo real.",
    details: [
      "Migración de planillas manuales a un hub centralizado en AWS.",
      "Seguimiento automatizado del ciclo de construcción de embarcaciones.",
      "Dashboard de ventas con visibilidad de margen bruto por unidad."
    ]
  },
  {
    number: 2,
    title: "Capacitación 4.0",
    description: "Entrenamiento del personal en nuevas herramientas digitales.",
    details: [
      "Talleres personalizados para artesanos del astillero con baja afinidad digital.",
      "Adopción exitosa del 96% del personal en menos de un mes.",
      "Soporte interno mediante canal directo interactivo."
    ]
  },
  {
    number: 3,
    title: "3D/AR Solutions",
    description: "Visualización avanzada para el diseño y venta de embarcaciones.",
    details: [
      "Renders interactivos 3D que reducen la necesidad de moldes físicos previos.",
      "Ecosistema de Realidad Aumentada para que el comprador final configure su yate.",
      "Reducción del 40% en tiempos de aprobación de diseño náutico avanzado."
    ]
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "¿Cómo gestiona actualmente su empresa el seguimiento de clientes, presupuestos y ventas?",
    options: [
      {
        text: "Planillas de Excel sueltas, notas de papel o la memoria de los vendedores.",
        score: 1,
        description: "Brecha crítica: Pérdida constante de seguimiento y sin datos para proyecciones reales."
      },
      {
        text: "Un software simple de facturación pero sin integraciones reales entre áreas.",
        score: 2,
        description: "Brecha moderada: Se registra la venta, pero no se analiza el comportamiento de compra."
      },
      {
        text: "Un CRM intermedio, aunque el equipo no lo utiliza de manera consistente.",
        score: 3,
        description: "Problema de proceso: Hay tecnología pero falta adopción cultural y disciplina de carga."
      },
      {
        text: "Un CRM/ERP integrado en la nube con reportes automáticos y total uso del equipo.",
        score: 4,
        description: "Excelente: Flujo automatizado y control estratégico en tiempo real."
      }
    ]
  },
  {
    id: 2,
    question: "¿Cuál es el estado de la comunicación y el flujo de información interno entre sus oficinas, fábrica y logística?",
    options: [
      {
        text: "Totalmente oral o vía chats informales (WhatsApp) sin historial documentado.",
        score: 1,
        description: "Ineficiencia grave: Alto índice de malentendidos y pérdida de conocimiento clave."
      },
      {
        text: "Emails diarios frecuentes, pero cuesta seguir el hilo o encontrar archivos viejos.",
        score: 2,
        description: "Sobrecarga: Demasiados correos entorpecen la agilidad operativa básica."
      },
      {
        text: "Herramientas de colaboración (Slack, Teams) organizadas por canales, aunque aisladas del stock.",
        score: 3,
        description: "Progreso: Buen ritmo diario de comunicación pero inconexo con bases de datos operativas."
      },
      {
        text: "Sistemas integrados de flujo de trabajo donde cada tarea está ligada al inventario y cliente.",
        score: 4,
        description: "Optimizado: Trazabilidad total de cada requerimiento del principio al fin."
      }
    ]
  },
  {
    id: 3,
    question: "¿Cómo reacciona usualmente su equipo cuando se propone adoptar una nueva herramienta informática?",
    options: [
      {
        text: "Fuerte resistencia al cambio; prefieren continuar con los métodos tradicionales.",
        score: 1,
        description: "Barrera cultural alta: Se requiere un plan urgente de Capacitación 4.0 no intimidante."
      },
      {
        text: "La prueban los más jóvenes, pero los líderes o veteranos la evitan.",
        score: 2,
        description: "Adopción fragmentada: Cuellos de botella donde la información vieja convive con la nueva."
      },
      {
        text: "La usan obligatoriamente, pero genera frustración y quejas por su complejidad.",
        score: 3,
        description: "Deficiencia UX/Capacitación: La herramienta se siente como castigo en lugar de ayuda."
      },
      {
        text: "El equipo está entrenado para adoptar cambios rápidamente de forma autónoma e integral.",
        score: 4,
        description: "Cultura ágil: Ventaja competitiva sustancial y alta adaptabilidad de mercado."
      }
    ]
  },
  {
    id: 4,
    question: "¿De qué manera toman las decisiones de inversión o expansión estratégica en la compañía?",
    options: [
      {
        text: "Instinto del fundador o de la gerencia, sin consultar datos históricos consistentes.",
        score: 1,
        description: "Riesgo extremo: Las apuestas instintivas tienen margen de error muy alto en mercado digital."
      },
      {
        text: "Basándonos en el informe contable del mes anterior para ver si hay caja disponible.",
        score: 2,
        description: "Reactivo: Mirar el retrovisor financiero impide planificar la ola del mes próximo."
      },
      {
        text: "Con reportes mensuales parciales creados de forma manual recopilando múltiples planillas.",
        score: 3,
        description: "Lento: El proceso de consolidar datos demora días y la decisión llega con retraso."
      },
      {
        text: "A través de tableros BI inteligentes que muestran márgenes, proyecciones y KPIs dinámicos al día.",
        score: 4,
        description: "Proactivo guiado por datos: Decisiones asertivas tomadas en minutos con rigor analítico."
      }
    ]
  }
];

export function calculateMaturity(score: number): {
  level: string;
  scoreText: string;
  tagline: string;
  colorClass: string;
  summary: string;
  actionRequired: string;
} {
  if (score <= 6) {
    return {
      level: "Nivel 1: Tradición Analógica",
      scoreText: `${score}/16`,
      tagline: "Procesos herederos de la tradición con bajísima penetración tecnológica.",
      colorClass: "bg-red-500/10 text-red-500 border-red-500/20",
      summary: "Tu empresa posee un valioso know-how tradicional, pero depende críticamente de procesos manuales propensos a errores y bloqueos por ausencia del fundador. La brecha digital frente a competidores directos está en un punto crítico de ampliación rápida.",
      actionRequired: "Se requiere urgente un Plan de Auditoría Integral y centralización inicial en bases de datos virtuales para evitar pérdida de registros elementales de clientes."
    };
  } else if (score <= 10) {
    return {
      level: "Nivel 2: Adoptante Reactivo",
      scoreText: `${score}/16`,
      tagline: "Silos de tecnología inconexos que resuelven urgencias locales.",
      colorClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      summary: "Usas tecnología elemental (Excel, algún software contable cerrado) pero no están comunicados entre sí. Tu personal pierde aproximadamente 8 horas semanales solo copiando datos de un sistema a otro o buscando hilos de mails perdidos.",
      actionRequired: "La prioridad es unificar la gestión en la nube (CRM/ERP ágil) y coordinar el flujo de información para liberar tiempo productivo del equipo estratégico."
    };
  } else if (score <= 14) {
    return {
      level: "Nivel 3: Digital Integrado",
      scoreText: `${score}/16`,
      tagline: "Ecosistema digital activo con algunos cuellos de botella en adopción o BI.",
      colorClass: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      summary: "La tecnología ya es parte central de tus procesos diarios. Sin embargo, falta elevar el nivel de capacitación del personal veterano para explotar las herramientas al 100% y crear tableros de inteligencia que dejen de requerir armado manual.",
      actionRequired: "Implementar planes de Capacitación 4.0 gamificados e integrar tableros dinámicos en tiempo real para agilizar la dirección de ventas."
    };
  } else {
    return {
      level: "Nivel 4: Líder Optimizado",
      scoreText: `${score}/16`,
      tagline: "Toma de decisiones fundamentada 100% en datos integrados en tiempo real.",
      colorClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      summary: "Tu empresa opera con un alto nivel de eficiencia tecnológica e interconexión fluida. El próximo paso de optimización es acelerar la automatización mediante IA, simulación predictiva de demanda, o gemelos digitales.",
      actionRequired: "Explorar soluciones de análisis predictivo, integración de IoT o incorporación de modelos inteligentes para adelantarse al stock de cadena de distribución."
    };
  }
}
