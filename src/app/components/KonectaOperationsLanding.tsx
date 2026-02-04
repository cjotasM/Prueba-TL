'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, Users, Target, TrendingUp, Clock, 
  ArrowRight, AlertTriangle, CheckCircle, 
  Award, Zap, BrainCircuit, HeartHandshake, UserX, RotateCw, Calculator, Scale, SearchCheck, LucideIcon
} from 'lucide-react'
import Image from 'next/image'
import MangoBlanco from '../../img/MangoBlanco.png'
import LogoKonectaBlanco from '../../img/Konecta_Logo_RGB_White.png'

// --- INTERFACES ---
interface StatDataPoint {
  number: string
  label: string
  subLabel: string
  status: 'target' | 'critical' | 'warning' | 'excellent' | 'neutral'
}

interface FlippableStat {
  icon: LucideIcon;
  prev: StatDataPoint;
  curr: StatDataPoint;
}

interface AgentProfile {
  name: string
  role: string
  csat: string
  qa: string
  prod: string
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  status: 'active' | 'risk'
  badge?: string
}

interface ActionPlan {
  title: string
  urgency: string
  description: string
  actions: string[]
  color: string
  icon: React.ElementType
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
  const [selectedPlan, setSelectedPlan] = useState<ActionPlan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({})

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({...prev, [index]: !prev[index]}))
  }

  // DATOS REALES: DICIEMBRE VS ENERO
  const flippableStats = [
    { 
      icon: HeartHandshake, 
      prev: { number: "73.1%", label: "CSAT Diciembre", subLabel: "Bajo la meta", status: "critical" },
      curr: { number: "78.7%", label: "CSAT Enero", subLabel: "¡Recuperación lograda! 📈", status: "excellent" }
    },
    { 
      icon: SearchCheck, 
      prev: { number: "91.4%", label: "QA Diciembre", subLabel: "Gap de procesos", status: "warning" },
      curr: { number: "86.2%", label: "QA Enero", subLabel: "Brecha crítica vs 95% 🚩", status: "critical" }
    },
    { 
      icon: Zap, 
      prev: { number: "7.47", label: "Prod. Diciembre", subLabel: "Meta 7.5", status: "neutral" },
      curr: { number: "7.14", label: "Prod. Enero", subLabel: "Alineado al nuevo Forecast", status: "target" }
    },
    { 
      icon: Users, 
      prev: { number: "26 HC", label: "Equipo inicial", subLabel: "Pre-ajuste operativo", status: "neutral" },
      curr: { number: "9 Agentes", label: "Limonada de Mango", subLabel: "Elite Home Office", status: "excellent" }
    }
  ] as FlippableStat[];

  // AGENTES CON RESULTADOS DE ENERO
  const agents: AgentProfile[] = [
    { name: "Ferney Rolando", role: "CSAT Leader", csat: "85.9%", qa: "98.0%", prod: "7.22", quartile: "Q1", status: "active", badge: "🥇" },
    { name: "Jean Corona", role: "Standard Bearer", csat: "76.3%", qa: "95.1%", prod: "8.28", quartile: "Q1", status: "active", badge: "💎" },
    { name: "Kelly Londoño", role: "Solid Performer", csat: "76.5%", qa: "94.1%", prod: "7.82", quartile: "Q1", status: "active" },
    { name: "Mariana Pérez", role: "Quality Queen", csat: "72.4%", qa: "100%", prod: "5.47", quartile: "Q2", status: "active", badge: "🌟" },
    { name: "Valeria Piedrahita", role: "Most Improved", csat: "84.2%", qa: "86.2%", prod: "6.88", quartile: "Q2", status: "active" },
    { name: "Valery Tamayo", role: "Empathy Expert", csat: "85.1%", qa: "89.4%", prod: "6.01", quartile: "Q2", status: "active" },
    { name: "Rosa Angélica", role: "In Development", csat: "78.5%", qa: "78.4%", prod: "7.50", quartile: "Q3", status: "active", badge: "🛠️" },
    { name: "Katriza Guerrero", role: "In Development", csat: "76.8%", qa: "78.0%", prod: "7.66", quartile: "Q3", status: "active", badge: "🛠️" },
    { name: "Manuela Martínez", role: "Critical Focus", csat: "72.7%", qa: "74.5%", prod: "7.44", quartile: "Q4", status: "risk", badge: "⚠️" },
  ]

  const actionPlans: ActionPlan[] = [
    {
      title: "Misión: Calidad 95%",
      urgency: "CRÍTICO PARA MANUELA/KATRIZA",
      description: "Cierre de brechas técnicas en procesos de Return/Exchange y Tipificación. El 95% no es negociable para febrero.",
      actions: ["Clínicas de Feedback Individual", "Taller de Devoluciones", "Firma de Compromiso Digital"],
      color: "from-red-600 to-orange-500",
      icon: Target,
      fullPlan: {
        situation: "Manuela (74.5%) y Katriza (78.0%) presentan errores procedimentales críticos en flujos de devolución y seguridad.",
        impact: "Pone en riesgo la certificación COPC y la integridad de la data operativa.",
        rootCause: "Desconocimiento técnico de actualizaciones en el proceso de Return/Exchange.",
        detailedActions: [
          { phase: "Semana 1: Shock", tasks: ["Feedback 1:1 con TL", "Auditoría en vivo de pantalla compartida", "Firma de plan de mejora"] },
          { phase: "Semana 2: Refuerzo", tasks: ["Clínica de procesos con Formación", "Roleplay de casos complejos"] }
        ],
        resources: "Formación Técnica, Monitoreo Remoto",
        timeline: "Febrero (Ciclo Completo)",
        success_metrics: "QA > 95% en los 8 monitoreos del mes"
      }
    },
    {
      title: "Target: Eficiencia 7.0",
      urgency: "MEJORA DE PRODUCTIVIDAD",
      description: "Mariana P. y Valery T. lideran en calidad pero su productividad está por debajo del nuevo forecast de 7.0.",
      actions: ["Análisis de Adherencia (ADH)", "Flash Coaching de Navegación", "Shadowing con Jean Corona"],
      color: "from-blue-600 to-cyan-500",
      icon: Zap,
      fullPlan: {
        situation: "Mariana P. tiene 100% de calidad pero solo 5.47 de productividad. Valery T. está en 6.01.",
        impact: "Desbalance en la carga de trabajo del equipo ante volumen fluctuante.",
        rootCause: "Tiempos extendidos en documentación y falta de agilidad en herramientas de consulta.",
        detailedActions: [
          { phase: "Semana 1: Análisis", tasks: ["Revisión de AHT vs Adherencia", "Identificación de 'Cuellos de Botella'"] },
          { phase: "Semana 2: Agilidad", tasks: ["Implementación de atajos de teclado", "Optimización de macros de respuesta"] }
        ],
        resources: "Histórico de WFM, Sesiones de Mentoría",
        timeline: "Quincena 1 Febrero",
        success_metrics: "Productividad > 7.0 eventos/hora"
      }
    },
    {
      title: "Estándar COPC: 4+4",
      urgency: "RIGOR OPERATIVO",
      description: "Aseguramiento de muestra representativa para todo el equipo Limonada de Mango.",
      actions: ["4 Monitoreos QA", "4 Monitoreos TL", "Calibración Semanal"],
      color: "from-purple-600 to-pink-600",
      icon: Scale,
      fullPlan: {
        situation: "Necesitamos garantizar 8 evaluaciones por agente para tener validez estadística según COPC.",
        impact: "Feedback más preciso y detección temprana de desviaciones.",
        rootCause: "Cierre de enero con muestras incompletas en algunos perfiles (7 evaluaciones).",
        detailedActions: [
          { phase: "Ejecución Semanal", tasks: ["2 monitoreos por semana (1 TL / 1 QA)", "Feedback en menos de 24h"] },
          { phase: "Calibración", tasks: ["Mesa de unificación de criterios TL vs QA"] }
        ],
        resources: "Plataforma de QA, Agenda de TL",
        timeline: "Permanente",
        success_metrics: "100% de cumplimiento en muestra (8/8)"
      }
    }
  ]

  const downloadReport = () => {
    const reportText = `
🍋 MBR: TEAM LIMONADA DE MANGO 🥭
Plan de Acción Febrero 2026 | TL Medellín (Home Office)

1. ESTADO DE MÉTRICAS (Enero)
- CSAT: 78.7% ✅ (Meta 75%)
- QA: 86.2% 🔴 (Meta 95%)
- Productividad: 7.14 ✅ (Meta 7.0)

2. FOCOS DE INTERVENCIÓN (QA 95%)
- Manuela Martínez (74.5%): Crítico en procesos de Devolución.
- Katriza Guerrero (78.0%): Refuerzo en cierre de resolución.
- Rosa Angélica (78.4%): Disciplina en CRM y protocolos.

3. ESTRATEGIA OPERATIVA FEBRERO
- Implementación de modelo de monitoreo 4+4 (TL + QA).
- Clínica de procesos virtual con Formación (Semana 2).
- Seguimiento de productividad para Mariana P. y Valery T.

4. COMPROMISO
La excelencia operativa no es un acto, es el hábito de medir lo que importa y actuar sobre lo que se mide.

© 2026 Limonada de Mango Operations.
    `
    const element = document.createElement('a')
    const file = new Blob([reportText], {type: 'text/plain;charset=utf-8'})
    element.href = URL.createObjectURL(file)
    element.download = `MBR_Febrero_Limonada_Mango.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // --- HELPER FUNCTIONS ---
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-100 border-green-500'
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-500'
      case 'critical': return 'text-red-600 bg-red-100 border-red-500'
      case 'target': return 'text-purple-600 bg-purple-100 border-purple-500'
      case 'neutral': return 'text-gray-600 bg-gray-100 border-gray-400'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getQuartileStyle = (quartile: string) => {
    switch(quartile) {
      case 'Q1': return 'border-l-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-white'
      case 'Q2': return 'border-l-4 border-blue-400 bg-white'
      case 'Q3': return 'border-l-4 border-orange-300 bg-white'
      case 'Q4': return 'border-l-4 border-red-400 bg-red-50'
      default: return 'bg-white'
    }
  }

  const StatCardFace = ({ data, icon: Icon, isBack = false }: { data: StatDataPoint, icon: LucideIcon, isBack?: boolean }) => (
    <div className={`absolute inset-0 h-full w-full rounded-2xl p-6 flex flex-col justify-between shadow-xl border-t-4 ${getStatusColor(data.status)} ${isBack ? 'bg-white' : 'bg-gray-50'}`}
         style={{ backfaceVisibility: 'hidden', transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${getStatusColor(data.status).replace('border-', '')}`}>
            <Icon size={24} />
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(data.status).replace('border-', '')}`}>
            {isBack ? 'ENERO 🍋' : 'DICIEMBRE ❄️'}
          </span>
        </div>
        <h3 className="text-4xl font-black text-gray-900 mb-1">{data.number}</h3>
        <p className="text-gray-600 font-bold">{data.label}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 italic">{data.subLabel}</p>
        {!isBack && (
            <div className="mt-4 flex items-center justify-center text-xs text-blue-600 font-bold gap-1 animate-pulse">
                <RotateCw size={14}/> Click para ver evolución
            </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden">
      <style jsx global>{`
        :root {
          --konecta-primary: #2800c8;
          --konecta-secondary: #0F0F72;
          --konecta-yellow: #f0fa00;
        }
        .konecta-gradient {
          background: linear-gradient(135deg, var(--konecta-primary), var(--konecta-secondary));
        }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden konecta-gradient">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
           <div className="relative w-full h-full max-w-5xl opacity-30 p-20">
              <Image src={MangoBlanco} alt="Logo" layout="fill" objectFit="contain" priority />
           </div>
        </div>
        
        <motion.div style={{ y: y1 }} className="relative z-10 text-center text-white px-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="mb-4 inline-block px-4 py-1 rounded-full bg-yellow-400 text-blue-900 font-bold tracking-wider"
          >
            MONTHLY BUSINESS REVIEW - FEBRERO
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight">
            LIMONADA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              DE MANGO
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light">
            Estrategia de Excelencia Operativa: Misión 95%
          </p>
          <div className="mt-8 flex gap-4 justify-center">
             <button onClick={() => document.getElementById('stats')?.scrollIntoView({behavior:'smooth'})} className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors shadow-lg flex items-center gap-2">
                Resultados JAN <ChevronDown size={20}/>
             </button>
             <button onClick={downloadReport} className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                Descargar Plan TXT
             </button>
          </div>
        </motion.div>
      </section>

      {/* --- KPI STATS --- */}
      <section id="stats" className="py-20 -mt-20 relative z-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flippableStats.map((stat, idx) => {
              const isFlipped = flippedCards[idx] || false;
              return (
                <div key={idx} className="perspective-1000 h-72 cursor-pointer" onClick={() => toggleFlip(idx)}>
                  <motion.div
                    className="relative w-full h-full transform-style-3d transition-transform duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                  >
                    <StatCardFace data={stat.prev} icon={stat.icon} />
                    <StatCardFace data={stat.curr} icon={stat.icon} isBack={true} />
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- AGENT SCORECARD --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center text-[#2800c8] mb-12">SCORECARD: LIMONADA DE MANGO (JAN)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {agents.map((agent, idx) => (
              <motion.div
                key={idx}
                className={`relative p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${getQuartileStyle(agent.quartile)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        {agent.name} {agent.badge && <span>{agent.badge}</span>}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{agent.role}</p>
                  </div>
                  <span className={`text-xs font-black px-2 py-1 rounded ${
                      agent.quartile === 'Q1' ? 'bg-yellow-200 text-yellow-800' : 
                      agent.quartile === 'Q4' ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                      {agent.quartile}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center bg-white/50 p-2 rounded-lg">
                        <div className="text-[10px] text-gray-500">CSAT</div>
                        <div className="font-black text-sm text-green-600">{agent.csat}</div>
                    </div>
                    <div className="text-center bg-white/50 p-2 rounded-lg">
                        <div className="text-[10px] text-gray-500">QA</div>
                        <div className={`font-black text-sm ${parseFloat(agent.qa) >= 95 ? 'text-blue-600' : 'text-red-500'}`}>{agent.qa}</div>
                    </div>
                    <div className="text-center bg-white/50 p-2 rounded-lg">
                        <div className="text-[10px] text-gray-500">PROD</div>
                        <div className="font-black text-sm text-gray-700">{agent.prod}</div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PLAN DE ACCIÓN FEBRERO --- */}
      <section id="action-plans" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#2800c8] mb-4">PLAN DE ATAQUE: FEBRERO 🎯</h2>
            <p className="text-xl text-gray-600">Acciones COPC para el cumplimiento del 95% de Calidad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actionPlans.map((plan, idx) => (
              <motion.div
                key={idx} whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gray-50 text-gray-700`}><plan.icon size={24} /></div>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full uppercase tracking-tighter">{plan.urgency}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{plan.description}</p>
                  <div className="space-y-3">
                    {plan.actions.map((action, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            {action}
                        </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <button 
                        onClick={() => { setSelectedPlan(plan); setIsModalOpen(true); }}
                        className="w-full py-2 text-[#2800c8] font-bold hover:text-blue-700 flex items-center justify-center gap-2"
                    >
                        Ver Detalle Operativo <ArrowRight size={16}/>
                    </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0a0a45] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="w-48 mx-auto mb-8 opacity-80">
                <Image src={LogoKonectaBlanco} alt="Konecta" width={200} height={50} />
            </div>
            <p className="text-blue-200">
                Reporte Generado por: <span className="text-yellow-400 font-bold">Marlon Martinez</span><br/>
                Team Leader | Limonada de Mango
            </p>
            <p className="text-sm italic text-blue-400 mt-6 font-light">
              &quot;La excelencia operativa no es un acto, es el hábito de medir lo que importa y actuar sobre lo que se mide.&quot;
            </p>
            <p className="text-[10px] text-blue-500 mt-8">© 2026 Confidential Operations Report - COPC Standard</p>
        </div>
      </footer>

      {/* --- MODAL (DETALLE DE PLAN) --- */}
      <AnimatePresence>
        {isModalOpen && selectedPlan && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                    <div className={`p-6 bg-gradient-to-r ${selectedPlan.color} text-white sticky top-0 z-10`}>
                        <h2 className="text-3xl font-bold mb-2">{selectedPlan.title}</h2>
                        <p className="opacity-90">{selectedPlan.fullPlan.situation}</p>
                    </div>
                    <div className="p-8 space-y-6">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500"/> Causa Raíz</h4>
                            <p className="text-gray-600 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">{selectedPlan.fullPlan.rootCause}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Target size={18} className="text-blue-500"/> Acciones por Fase</h4>
                            <div className="space-y-4">
                                {selectedPlan.fullPlan.detailedActions.map((phase, i) => (
                                    <div key={i} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                        <p className="font-bold text-sm text-[#2800c8] mb-2">{phase.phase}</p>
                                        <ul className="space-y-2">
                                            {phase.tasks.map((t, j) => (
                                                <li key={j} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0"/>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-bold text-purple-900 mb-1 text-sm text-center">Meta de Éxito</h4>
                                <p className="text-xs text-purple-700 text-center">{selectedPlan.fullPlan.success_metrics}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="py-3 rounded-xl bg-gray-100 font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KonectaOperationsLanding