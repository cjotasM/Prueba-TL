'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Users, Target, TrendingUp, Calendar, Clock, MapPin, Phone, Mail, ArrowRight, AlertTriangle, CheckCircle, BarChart3, LucideProps } from 'lucide-react'
import Image from 'next/image'
import MangoBlanco from '../../img/MangoBlanco.png'
import LogoKonectaBlanco from '../../img/Konecta_Logo_RGB_White.png'

interface OperationalStat {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  number: string
  label: string
  status: 'target' | 'critical' | 'warning'
}

interface WeeklyMetric {
  day: string
  serviceLevel: string
  abandonment: string
  status: 'good' | 'critical' | 'excellent'
}

interface ActionPlan {
  title: string
  urgency: string
  description: string
  actions: string[]
  color: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  fullPlan: {
    situation: string
    impact: string
    rootCause: string
    detailedActions: {
      phase: string
      tasks: string[]
    }[]
    resources: string
    timeline: string
    success_metrics: string
  }
}

const KonectaOperationsLanding = () => {
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({})
  const [selectedPlan, setSelectedPlan] = useState<ActionPlan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -25])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const operationalStats: OperationalStat[] = [
    { icon: Target, number: "90%", label: "Service Level Target", status: "target" },
    { icon: TrendingUp, number: "74%", label: "Current SL Achievement", status: "critical" },
    { icon: Users, number: "5%", label: "Absenteeism Increase", status: "warning" },
    { icon: AlertTriangle, number: "24.75%", label: "Weekend Abandonment Rate", status: "critical" }
  ]

  const weeklyMetrics: WeeklyMetric[] = [
    { day: "Monday", serviceLevel: "89.49%", abandonment: "3.82%", status: "good" },
    { day: "Tuesday", serviceLevel: "47.58%", abandonment: "21.10%", status: "critical" },
    { day: "Wednesday", serviceLevel: "96.97%", abandonment: "0.65%", status: "excellent" },
    { day: "Thursday", serviceLevel: "94.06%", abandonment: "0.99%", status: "good" },
    { day: "Friday", serviceLevel: "95.12%", abandonment: "0.66%", status: "good" },
    { day: "Saturday", serviceLevel: "62.79%", abandonment: "24.75%", status: "critical" },
    { day: "Sunday", serviceLevel: "51.14%", abandonment: "21.39%", status: "critical" }
  ]

  const actionPlans: ActionPlan[] = [
    {
      title: "IVR Implementation Crisis",
      urgency: "URGENT - 2 Days Overdue",
      description: "Corporate client campaign message implementation delayed. Alternative agent-based delivery initiated while technical team expedites IVR deployment.",
      actions: ["Agent briefing on campaign messaging", "Escalation to design team", "Client communication protocol"],
      color: "from-red-600 to-red-800",
      icon: AlertTriangle,
      fullPlan: {
        situation: "Corporate client requires urgent IVR message implementation for confidential marketing campaign. Original deadline: March 28, Current date: March 30. Design team unavailable until April 2.",
        impact: "Campaign launch delayed, potential revenue loss, client relationship strain, competitive disadvantage due to late market entry.",
        rootCause: "Lack of advance planning communication due to campaign confidentiality requirements. Standard 5-day service agreement not met.",
        detailedActions: [
          {
            phase: "Immediate (Hours 1-24)",
            tasks: [
              "Obtain client approval for agent-delivered messaging",
              "Brief all agents on campaign key messages and delivery timing",
              "Implement quality monitoring for message consistency",
              "Establish escalation protocol with design team"
            ]
          },
          {
            phase: "Short-term (Days 2-5)",
            tasks: [
              "Daily progress reviews with design team",
              "Client communication updates twice daily",
              "Monitor campaign effectiveness through agent delivery",
              "Prepare for IVR transition on April 2"
            ]
          }
        ],
        resources: "Design team priority allocation, Agent training resources, Client relationship management, Quality assurance team",
        timeline: "Immediate implementation with IVR completion by April 2",
        success_metrics: "100% message delivery rate, Client satisfaction maintained, Campaign KPIs achieved, Zero quality issues"
      }
    },
    {
      title: "Service Level Recovery",
      urgency: "CRITICAL - 80/20 Target: 74%",
      description: "SL performance below target due to forecast discrepancies. 10% variance between projected vs actual call volume impacting resource allocation.",
      actions: ["Workforce forecast adjustment", "Real-time monitoring implementation", "Agent coaching intensification"],
      color: "from-orange-500 to-red-500",
      icon: TrendingUp,
      fullPlan: {
        situation: "Service Level target of 80/20 currently at 74%. Workforce forecasting shows 10% variance between projected and actual call volumes, creating resource misallocation.",
        impact: "Customer satisfaction decline, increased abandonment rates, operational efficiency reduction, potential SL A breaches with clients.",
        rootCause: "Inaccurate demand forecasting methodology, inadequate real-time adjustment protocols, suboptimal workforce scheduling algorithms.",
        detailedActions: [
          {
            phase: "Immediate (Days 28-31)",
            tasks: [
              "Emergency planning session with WF team",
              "Recalibrate forecasting models using recent data patterns",
              "Implement real-time service level monitoring dashboards",
              "Initiate micro-coaching sessions for efficiency improvement"
            ]
          },
          {
            phase: "Medium-term (Next Month)",
            tasks: [
              "Deploy advanced forecasting algorithms",
              "Establish dynamic workforce allocation protocols",
              "Implement predictive analytics for demand planning",
              "Create automated alert systems for SL deviations"
            ]
          }
        ],
        resources: "Workforce Management team, Real-time analytics platform, Coaching specialists, Forecasting software",
        timeline: "Immediate stabilization by month-end, full optimization within 30 days",
        success_metrics: "Achieve 80% service level, <2% abandonment rate, 95% forecast accuracy, Agent utilization >85%"
      }
    },
    {
      title: "Team Performance Revival",
      urgency: "HIGH PRIORITY - 30-Day Recovery",
      description: "Team motivation and performance decline. Multiple KPIs underperforming with increased absenteeism and quality issues generating company penalties.",
      actions: ["1:1 diagnostic sessions", "Recognition program launch", "Proactive coaching implementation"],
      color: "from-blue-600 to-purple-600",
      icon: Users,
      fullPlan: {
        situation: "Team performance deterioration over 2 months: missed targets, 5% absenteeism increase, declining customer service quality, errors causing financial penalties.",
        impact: "Revenue loss from penalties, customer churn risk, team morale crisis, operational instability, increased recruitment costs.",
        rootCause: "Team demotivation stemming from unclear expectations, lack of recognition, insufficient feedback, possible systemic operational issues.",
        detailedActions: [
          {
            phase: "Week 1: Diagnosis & Communication",
            tasks: [
              "Conduct individual 1:1 sessions with all team members",
              "Deploy anonymous team satisfaction survey",
              "Analyze performance data for patterns and trends",
              "Hold transparent team meeting to discuss findings"
            ]
          },
          {
            phase: "Weeks 2-3: Intervention & Motivation",
            tasks: [
              "Launch comprehensive recognition and rewards program",
              "Implement skill-based training for identified gaps",
              "Establish regular feedback and coaching cycles",
              "Address operational obstacles identified in diagnosis"
            ]
          },
          {
            phase: "Week 4+: Sustainability",
            tasks: [
              "Collaborative goal-setting with team input",
              "Celebrate achieved milestones and progress",
              "Establish ongoing communication protocols",
              "Monitor and adjust interventions based on results"
            ]
          }
        ],
        resources: "HR partnership, Training specialists, Recognition budget, Performance management tools",
        timeline: "30-day intensive recovery program with ongoing sustainability measures",
        success_metrics: "Return to target KPIs, <3% absenteeism, Zero penalty-causing errors, 90%+ team satisfaction"
      }
    },
    {
      title: "Weekend Operations Optimization",
      urgency: "IMMEDIATE - Weekend Crisis",
      description: "Critical weekend performance gaps with service levels dropping to 51-62% and abandonment rates exceeding 20%. Capacity planning overhaul required.",
      actions: ["Weekend staffing restructure", "Flexible scheduling implementation", "Real-time management enhancement"],
      color: "from-purple-600 to-indigo-600",
      icon: Clock,
      fullPlan: {
        situation: "Weekend operations critically underperforming: Saturday SL 62.79% (abandonment 24.75%), Sunday SL 51.14% (abandonment 21.39%), far below 90% target.",
        impact: "Severe customer experience degradation, high customer churn risk, brand reputation damage, lost revenue from abandoned interactions.",
        rootCause: "Inadequate weekend staffing models, poor demand forecasting for weekends, insufficient real-time management coverage, agent utilization inefficiencies.",
        detailedActions: [
          {
            phase: "Immediate (This Weekend)",
            tasks: [
              "Emergency staffing adjustment for upcoming weekend",
              "Deploy senior supervisors for weekend coverage",
              "Implement real-time queue management protocols",
              "Activate overflow and escalation procedures"
            ]
          },
          {
            phase: "Short-term (Next 2 Weekends)",
            tasks: [
              "Redesign weekend shift patterns and coverage",
              "Implement flexible/part-time weekend specialists",
              "Deploy advanced queue management technology",
              "Establish weekend-specific performance targets"
            ]
          },
          {
            phase: "Long-term (Monthly)",
            tasks: [
              "Develop weekend-optimized forecasting models",
              "Create dedicated weekend management structure",
              "Implement weekend performance analytics",
              "Establish continuous improvement protocols"
            ]
          }
        ],
        resources: "Additional weekend staff, Management coverage, Queue management system, Forecasting tools",
        timeline: "Immediate weekend improvements, full optimization within 30 days",
        success_metrics: ">85% weekend service level, <5% abandonment rate, 70%+ agent utilization, Customer satisfaction >90%"
      }
    }
  ]

const getStatusColor = (status: string): string => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      case 'target': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Missing function definitions
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToActionPlans = () => {
    scrollToElement('action-plans')
  }

  const downloadReport = () => {
    const reportContent = generateFullReport()
    const element = document.createElement('a')
    const file = new Blob([reportContent], {type: 'text/plain;charset=utf-8'})
    element.href = URL.createObjectURL(file)
    element.download = `Konecta_Operations_Report_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
  
  const downloadPlanReport = (plan: ActionPlan) => {
    const reportContent = generatePlanReport(plan)
    const element = document.createElement('a')
    const file = new Blob([reportContent], {type: 'text/plain;charset=utf-8'})
    element.href = URL.createObjectURL(file)
    element.download = `${plan.title.replace(/\s+/g, '_')}_Action_Plan_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const generateFullReport = () => {
    const currentDate = new Date().toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    KONECTA OPERATIONS EXCELLENCE REPORT                      ║
║                         REPORTE EJECUTIVO OPERACIONAL                       ║
╚══════════════════════════════════════════════════════════════════════════════╝

Fecha de Generación: ${currentDate}
Responsable: Marlon Martinez
Estado: CRÍTICO - Requiere Atención Inmediata

═══════════════════════════════════════════════════════════════════════════════
  RESUMEN EJECUTIVO DE INDICADORES CRÍTICOS
═══════════════════════════════════════════════════════════════════════════════

🎯 NIVEL DE SERVICIO OBJETIVO: 90% (80/20)
📊 RENDIMIENTO ACTUAL: 74% - CRÍTICO ⚠️
📈 BRECHA DE DESEMPEÑO: -16% vs. objetivo

🚨 INDICADORES DE ALERTA CRÍTICA:
• Abandono de fin de semana: 24.75% (Meta: 2%)
• Ausentismo del equipo: +5% incremento
• Multas por errores graves: Activas
• Crisis IVR: 2 días de retraso

═══════════════════════════════════════════════════════════════════════════════
  MÉTRICAS OPERACIONALES SEMANALES
═══════════════════════════════════════════════════════════════════════════════

RENDIMIENTO POR DÍA:
┌─────────────┬─────────────────┬─────────────────┬──────────────┐
│    DÍA      │  NIVEL SERVICIO │   % ABANDONO    │    ESTADO    │
├─────────────┼─────────────────┼─────────────────┼──────────────┤
│ Lunes       │     89.49%      │     3.82%       │   ACEPTABLE  │
│ Martes      │     47.58%      │    21.10%       │   CRÍTICO    │
│ Miércoles   │     96.97%      │     0.65%       │   EXCELENTE  │
│ Jueves      │     94.06%      │     0.99%       │   BUENO      │
│ Viernes     │     95.12%      │     0.66%       │   BUENO      │
│ Sábado      │     62.79%      │    24.75%       │   CRÍTICO    │
│ Domingo     │     51.14%      │    21.39%       │   CRÍTICO    │
└─────────────┴─────────────────┴─────────────────┴──────────────┘

ANÁLISIS CRÍTICO:
• Fines de semana presentan el mayor deterioro operacional
• Martes muestra anomalía significativa que requiere investigación
• 3 de 7 días en estado crítico (43% de la semana)

═══════════════════════════════════════════════════════════════════════════════
  PLANES DE ACCIÓN ESTRATÉGICOS
═══════════════════════════════════════════════════════════════════════════════

1. 🚨 CRISIS IVR - URGENTE (2 días de retraso)
   Situación: Cliente corporativo requiere mensaje urgente para campaña
   Impacto: Riesgo de pérdida de cliente y daño reputacional
   Solución inmediata: Entrega por agentes mientras se acelera IVR
   Timeline: Implementación inmediata, IVR listo para Abril 2

2. 📊 RECUPERACIÓN NIVEL DE SERVICIO - CRÍTICO
   Situación:SL al 74% vs. objetivo 80/20 (90%)
   Causa raíz: 10% varianza en pronóstico de llamadas vs. realidad
   Acciones: Reajuste workforce + monitoreo tiempo real + coaching
   Timeline: Estabilización fin de mes, optimización 30 días

3. 👥 REVITALIZACIÓN DE EQUIPO - ALTA PRIORIDAD
   Situación: Desmotivación generalizada, +5% ausentismo, multas
   Enfoque: Diagnóstico 1:1 + programa reconocimiento + coaching
   Fases: Semana 1 diagnóstico, Semanas 2-3 intervención, Semana 4+ sostenibilidad
   Timeline: Programa intensivo 30 días

4. ⏰ OPTIMIZACIÓN FINES DE SEMANA - INMEDIATO
   Situación: SL crítico sábados/domingos (51-62% vs. 90%)
   Causa raíz: Pronóstico inadecuado + cobertura insuficiente
   Solución: Reestructura turnos + gestión tiempo real + especialistas weekend
   Timeline: Mejoras inmediatas próximo fin de semana

═══════════════════════════════════════════════════════════════════════════════
  CRONOGRAMA DE IMPLEMENTACIÓN
═══════════════════════════════════════════════════════════════════════════════

FASE 1 - ACCIONES INMEDIATAS (Días 1-7):
□ Ajuste workforce de emergencia
□ Protocolo agentes para campaña IVR
□ Monitoreo intensivo tiempo real
□ Sesiones 1:1 diagnóstico equipo

FASE 2 - RECUPERACIÓN TÁCTICA (Semanas 2-3):
□ Recalibración modelos forecasting
□ Programa reconocimiento activo
□ Capacitación focalizada en gaps
□ Reestructura turnos fin de semana

FASE 3 - EXCELENCIA SOSTENIBLE (Semana 4+):
□ Metas colaborativas con equipo
□ Analíticas predictivas avanzadas
□ Cultura mejora continua
□ Protocolos comunicación abierta

═══════════════════════════════════════════════════════════════════════════════
  MÉTRICAS DE ÉXITO Y SEGUIMIENTO
═══════════════════════════════════════════════════════════════════════════════

OBJETIVOS INMEDIATOS (7 días):
• Nivel de Servicio: >80%
• Abandono fin de semana: <10%
• Campaña IVR: 100% entrega sin pérdida alcance

OBJETIVOS MEDIANO PLAZO (30 días):
• Nivel de Servicio: >90% (objetivo 80/20)
• Abandono general: <2%
• Ausentismo: Reducción a niveles normales (<3%)
• Multas: Cero errores críticos

OBJETIVOS LARGO PLAZO (90 días):
• Operación estabilizada en excelencia
• Equipo motivado y comprometido
• Procesos optimizados y automatizados
• Cliente corporativo satisfecho y fidelizado

═══════════════════════════════════════════════════════════════════════════════
  RECURSOS REQUERIDOS
═══════════════════════════════════════════════════════════════════════════════

RECURSOS HUMANOS:
• Equipo Workforce Management (prioridad máxima)
• Especialistas coaching y capacitación
• Supervisores dedicados fin de semana
• Equipo diseño e implementación IVR

RECURSOS TECNOLÓGICOS:
• Plataforma monitoreo tiempo real
• Herramientas analíticas forecasting
• Sistemas gestión rendimiento
• Dashboard ejecutivo de seguimiento

RECURSOS FINANCIEROS:
• Presupuesto programa reconocimiento
• Inversión capacitación especializada
• Costos personal adicional fin de semana
• Tecnología predictiva avanzada

═══════════════════════════════════════════════════════════════════════════════
  PRÓXIMOS PASOS Y REUNIÓN EJECUTIVA
═══════════════════════════════════════════════════════════════════════════════

REUNIÓN PROGRAMADA: 
📅 Fecha: 5 de Agosto, 2025
🕐 Hora: 10:00 AM - 11:00 AM
📍 Ubicación: Centro de Operaciones - Sala Ejecutiva

AGENDA CRÍTICA:
1. Presentación análisis situacional completo
2. Aprobación planes de acción y recursos
3. Definición estructura seguimiento
4. Asignación responsabilidades específicas
5. Timeline detallado de implementación

DECISIONES REQUERIDAS:
• Autorización presupuesto excepcional
• Aprobación reestructura turnos
• Priorización recursos diseño IVR
• Validación métricas y KPIs

═══════════════════════════════════════════════════════════════════════════════
  CONTACTO Y ESCALAMIENTO
═══════════════════════════════════════════════════════════════════════════════

Líder de Operaciones: +57 322 902 2922 (Emergencias)
Email: mango_md_staff@konecta.com

═══════════════════════════════════════════════════════════════════════════════

CONFIDENCIAL - KONECTA
Documento generado por sistema ejecutivo de reporting
© 2025 Konecta. Todos los derechos reservados.

═══════════════════════════════════════════════════════════════════════════════
`
  }

  const generatePlanReport = (plan: ActionPlan) => {
    const currentDate = new Date().toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    PLAN DE ACCIÓN DETALLADO - KONECTA                       ║
║                        ${plan.title.toUpperCase()}                        
╚══════════════════════════════════════════════════════════════════════════════╝

Fecha: ${currentDate}
Urgencia: ${plan.urgency}
Responsable: Marlon Martinez

═══════════════════════════════════════════════════════════════════════════════
  RESUMEN EJECUTIVO
═══════════════════════════════════════════════════════════════════════════════

${plan.description}

═══════════════════════════════════════════════════════════════════════════════
  ANÁLISIS SITUACIONAL COMPLETO
═══════════════════════════════════════════════════════════════════════════════

SITUACIÓN ACTUAL:
${plan.fullPlan.situation}

IMPACTO EN EL NEGOCIO:
${plan.fullPlan.impact}

ANÁLISIS DE CAUSA RAÍZ:
${plan.fullPlan.rootCause}

═══════════════════════════════════════════════════════════════════════════════
  PLAN DE ACCIÓN DETALLADO
═══════════════════════════════════════════════════════════════════════════════

${plan.fullPlan.detailedActions.map((phase: { phase: string; tasks: string[] }, index: number) => `
FASE ${index + 1}: ${phase.phase.toUpperCase()}
${'-'.repeat(60)}
${phase.tasks.map(task => `• ${task}`).join('\n')}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════════════
  RECURSOS NECESARIOS
═══════════════════════════════════════════════════════════════════════════════

${plan.fullPlan.resources}

═══════════════════════════════════════════════════════════════════════════════
  CRONOGRAMA DE IMPLEMENTACIÓN
═══════════════════════════════════════════════════════════════════════════════

${plan.fullPlan.timeline}

═══════════════════════════════════════════════════════════════════════════════
  MÉTRICAS DE ÉXITO
═══════════════════════════════════════════════════════════════════════════════

${plan.fullPlan.success_metrics}

═══════════════════════════════════════════════════════════════════════════════
  ACCIONES CLAVE INMEDIATAS
═══════════════════════════════════════════════════════════════════════════════

${plan.actions.map((action: string) => `✓ ${action}`).join('\n')}

═══════════════════════════════════════════════════════════════════════════════
  SEGUIMIENTO Y CONTROL
═══════════════════════════════════════════════════════════════════════════════

RESPONSABLE PRINCIPAL: Marlon Martinez
SUPERVISIÓN: Dirección de Operaciones
REPORTE DE AVANCE: Diario para acciones críticas

ESCALAMIENTO:
• Nivel 1: mango_md_staff@konecta.com
• Nivel 2: +57 322 902 2922 (Emergencias)
• Nivel 3: Dirección General

═══════════════════════════════════════════════════════════════════════════════

CONFIDENCIAL - PLAN DE ACCIÓN ESTRATÉGICO
Generado: ${currentDate}
© 2025 Konecta
═══════════════════════════════════════════════════════════════════════════════
`
  }

  const openPlanModal = (plan: ActionPlan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const closePlanModal = () => {
    setSelectedPlan(null)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Styles */}
      <style jsx global>{`
        :root {
          --konecta-primary: #2800c8;
          --konecta-secondary: #0F0F72;
          --konecta-light: #A6B7FF;
          --konecta-yellow: #f0fa00;
          --konecta-red: #DB1F51;
          --konecta-orange: #FD6221;
          --konecta-green: #0DCA61;
          --konecta-teal: #09BFAF;
          --konecta-cyan: #04B4FD;
        }
        
        .konecta-primary { color: var(--konecta-primary); }
        .bg-konecta-primary { background-color: var(--konecta-primary); }
        .konecta-gradient {
          background: linear-gradient(135deg, var(--konecta-primary), var(--konecta-secondary));
        }
      `}</style>

      {/* Hero Section with Banner Space */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 konecta-gradient opacity-90"></div>
        
        {/* Banner Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full flex items-center justify-center">
            <Image 
              src={MangoBlanco} 
              alt="Corporate Banner" 
              className="w-full h-full object-contain opacity-25"
            />
          </div>
        </div>

        <motion.div 
          style={{ y: y1 }}
          className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            OPERATIONS
            <span className="block text-yellow-300" style={{ color: 'var(--konecta-yellow)' }}>
              EXCELLENCE
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Expert Team Leadership • Strategic Action Plans • Operational Recovery Solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              className="bg-yellow-300 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={scrollToActionPlans}
            >
              View Action Plans
            </button>
            <button 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              onClick={downloadReport}
            >
              Download Report
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
          onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Current Performance Stats */}
      <section id="stats" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold konecta-primary mb-6">Current Operational Status</h2>
            <p className="text-xl text-gray-600">Real-time performance indicators requiring immediate attention</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {operationalStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  stat.status === 'critical' ? 'bg-red-500' : 
                  stat.status === 'warning' ? 'bg-yellow-500' : 
                  'bg-purple-600'
                }`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-4xl font-bold mb-2 ${
                  stat.status === 'critical' ? 'text-red-600' : 
                  stat.status === 'warning' ? 'text-yellow-600' : 
                  'konecta-primary'
                }`}>{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(stat.status)}`}>
                  {stat.status.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Weekly Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold konecta-primary mb-6">Weekly Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weeklyMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-gray-700 mb-2">{metric.day}</h4>
                  <div className={`text-lg font-bold mb-1 ${
                    metric.status === 'excellent' ? 'text-green-600' :
                    metric.status === 'good' ? 'text-blue-600' :
                    metric.status === 'critical' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.serviceLevel}
                  </div>
                  <div className="text-sm text-gray-500">SL</div>
                  <div className={`text-sm font-medium ${
                    parseFloat(metric.abandonment) > 10 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.abandonment} abandon
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Action Plans */}
      <section id="action-plans" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible['action-plans'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold konecta-primary mb-6">Strategic Action Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions addressing critical operational challenges with measurable impact targets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {actionPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible['action-plans'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-600"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${plan.color} opacity-10 rounded-bl-full`}></div>
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                      {plan.urgency}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold konecta-primary mb-3">{plan.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 mb-3">Key Actions:</h4>
                    {plan.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className="mt-6 flex items-center text-purple-600 font-medium group-hover:text-purple-800 transition-colors duration-300 cursor-pointer"
                    onClick={() => openPlanModal(plan)}
                  >
                    <span>View Full Plan</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Phases */}
      <section id="implementation" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.implementation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold konecta-primary mb-6">Implementation Framework</h2>
            <p className="text-xl text-gray-600">Structured approach to operational excellence recovery</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.implementation ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold konecta-primary mb-4">Immediate Actions</h3>
              <p className="text-gray-600 mb-4">Days 1-7: Crisis stabilization and urgent interventions</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Emergency workforce adjustments</li>
                <li>• Real-time monitoring implementation</li>
                <li>• Client communication protocols</li>
                <li>• Weekend operations overhaul</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible.implementation ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold konecta-primary mb-4">Tactical Recovery</h3>
              <p className="text-gray-600 mb-4">Weeks 2-3: Performance optimization and team revival</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Diagnostic 1:1 sessions</li>
                <li>• Skill-based training programs</li>
                <li>• Recognition system launch</li>
                <li>• Process improvement initiatives</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible.implementation ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold konecta-primary mb-4">Sustainable Excellence</h3>
              <p className="text-gray-600 mb-4">Week 4+: Long-term optimization and growth</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Collaborative goal setting</li>
                <li>• Continuous improvement culture</li>
                <li>• Advanced analytics implementation</li>
                <li>• Leadership development</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meeting Information */}
      <section id="meeting" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.meeting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold konecta-primary mb-6">Operations Leadership Meeting</h2>
            <p className="text-xl text-gray-600">Strategic session for operational excellence recovery and team transformation</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.meeting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
            >
              <Calendar className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Meeting Schedule</h3>
              <p className="text-lg mb-2">August 5, 2025</p>
              <p className="text-lg mb-2">10:00 AM - 11:00 AM</p>
              <p className="text-purple-200">Emergency operations review</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.meeting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-8 text-white"
            >
              <MapPin className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-lg mb-2">Puerto Seco</p>
              <p className="text-lg mb-2">Executive Conference Room</p>
              <p className="text-green-200">Team leaders attendance required</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.meeting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white"
            >
              <BarChart3 className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Agenda Focus</h3>
              <p className="text-lg mb-2">Action plan presentation</p>
              <p className="text-lg mb-2">Resource allocation review</p>
              <p className="text-orange-200">Implementation timeline approval</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 konecta-gradient">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.contact ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">Operations Leadership Contact</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Direct escalation channel for operational emergencies and strategic initiatives
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-3 text-white">
                <Phone className="w-6 h-6" />
                <span className="text-lg">+57 3229022922 (Emergency)</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Mail className="w-6 h-6" />
                <span className="text-lg">mango_md_staff@konecta.com</span>
              </div>
            </div>

            <div className="mt-12">
              <button 
                className="bg-yellow-300 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={downloadReport}
              >
                Download Full Report
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Image 
              src={LogoKonectaBlanco} 
              alt="Corporate footer" 
              className="w-full h-full mx-auto px-115"
            />
            
            <p className="text-gray-400 max-w-2xl mx-auto">
              Expert Team Leadership • Operational Excellence • Strategic Recovery Solutions
            </p>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2025 Konecta. Confidential Leadership Review Materials.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal for Full Plan Details */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold konecta-primary">{selectedPlan.title}</h2>
              <button
                onClick={closePlanModal}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <span className="px-4 py-2 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                  {selectedPlan.urgency}
                </span>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold konecta-primary mb-3">Situation Analysis</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPlan.fullPlan.situation}</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold konecta-primary mb-3">Business Impact</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPlan.fullPlan.impact}</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold konecta-primary mb-3">Root Cause Analysis</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPlan.fullPlan.rootCause}</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold konecta-primary mb-3">Detailed Action Plan</h3>
                  <div className="space-y-6">
                    {selectedPlan.fullPlan.detailedActions.map((phase, index: number) => (
                      <div key={index} className="border-l-4 border-purple-600 pl-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">{phase.phase}</h4>
                        <ul className="space-y-2">
                          {phase.tasks.map((task: string, taskIndex: number) => (
                            <li key={taskIndex} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section>
                    <h3 className="text-xl font-bold konecta-primary mb-3">Required Resources</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedPlan.fullPlan.resources}</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold konecta-primary mb-3">Timeline</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedPlan.fullPlan.timeline}</p>
                  </section>
                </div>

                <section>
                  <h3 className="text-xl font-bold konecta-primary mb-3">Success Metrics</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPlan.fullPlan.success_metrics}</p>
                </section>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={closePlanModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => selectedPlan && downloadPlanReport(selectedPlan)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Download This Plan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default KonectaOperationsLanding