'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  ChevronDown, Users, Target, TrendingUp, Calendar, Clock, 
  MapPin, Phone, Mail, ArrowRight, AlertTriangle, CheckCircle, 
  BarChart3, LucideProps, Award, Zap, BrainCircuit, HeartHandshake, UserX 
} from 'lucide-react'
import Image from 'next/image'
// Asegúrate de que las rutas sean correctas según tu estructura
import MangoBlanco from '../../img/MangoBlanco.png'
import LogoKonectaBlanco from '../../img/Konecta_Logo_RGB_White.png'

// --- INTERFACES ---
interface OperationalStat {
  icon: React.ElementType
  number: string
  label: string
  subLabel?: string
  status: 'target' | 'critical' | 'warning' | 'excellent'
}

interface AgentProfile {
  name: string
  role: string
  csat: string
  prod: string
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  status: 'active' | 'risk' | 'terminated'
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

// --- DATA & CONFIG ---
const KonectaOperationsLanding = () => {
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({})
  const [selectedPlan, setSelectedPlan] = useState<ActionPlan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])

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
    document.querySelectorAll('[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // DATOS REALES DE DICIEMBRE (Extraídos del chat)
  const operationalStats: OperationalStat[] = [
    { icon: HeartHandshake, number: "77.9%", label: "CSAT Diciembre", subLabel: "Meta: 75%", status: "excellent" },
    { icon: Zap, number: "7.39", label: "Productividad", subLabel: "Meta: 7.50", status: "warning" },
    { icon: Clock, number: "94.9%", label: "Adherencia", subLabel: "Meta: 95%", status: "excellent" },
    { icon: UserX, number: "1", label: "Bajas (Juliana)", subLabel: "Saneamiento Operativo", status: "target" }
  ]

  // AGENTES ORGANIZADOS POR CUARTILES (Datos de las imágenes)
  const agents: AgentProfile[] = [
    // Q1 - The Stars
    { name: "Claudia Ardila", role: "The MVP", csat: "84%", prod: "9.79", quartile: "Q1", status: "active", badge: "👑" },
    { name: "Salomé Jaramillo", role: "Quality Queen", csat: "92%", prod: "6.68", quartile: "Q1", status: "active", badge: "🌟" },
    { name: "Sara Polo", role: "Consistency", csat: "85%", prod: "6.90", quartile: "Q1", status: "active" },
    { name: "Juan José Marin", role: "High Performer", csat: "83%", prod: "7.62", quartile: "Q1", status: "active" },
    
    // Q2 - The Backbone
    { name: "Rosa Tuberquia", role: "Solid Player", csat: "83%", prod: "7.06", quartile: "Q2", status: "active" },
    { name: "Jhony Morales", role: "Rising Star", csat: "75%", prod: "6.67", quartile: "Q2", status: "active" },
    { name: "Kelly Londoño", role: "Solid Player", csat: "70%", prod: "7.66", quartile: "Q2", status: "active" },
    
    // Q3 - The Opportunity
    { name: "Natalia Vásquez", role: "Developing", csat: "67%", prod: "6.97", quartile: "Q3", status: "active" },
    { name: "Luisa Zapata", role: "Developing", csat: "64%", prod: "7.25", quartile: "Q3", status: "active" },
    { name: "Alva Blanquicett", role: "Developing", csat: "58%", prod: "7.10", quartile: "Q3", status: "active" },

    // Q4 - The Novel (Drama)
    { name: "Fabiana Ríos", role: "Statistical Victim", csat: "44%", prod: "8.69", quartile: "Q4", status: "risk", badge: "📉" },
    { name: "Valery Álvarez", role: "Needs Speed", csat: "87%", prod: "5.83", quartile: "Q4", status: "risk", badge: "🐢" },
    { name: "Juliana Cardona", role: "Game Over", csat: "44%", prod: "8.53", quartile: "Q4", status: "terminated", badge: "👋" },
  ]

  const actionPlans: ActionPlan[] = [
    {
      title: "Operación: Cázame esa Encuesta",
      urgency: "PRIORIDAD PARA FABIANA",
      description: "Fabiana tiene buen trato pero mala suerte estadística (solo 16 encuestas). Necesitamos volumen para diluir a los detractores.",
      actions: ["Script de cierre obligatorio", "Meta: 40 encuestas/mes", "Monitoreo de cierre"],
      color: "from-blue-600 to-cyan-500",
      icon: Target,
      fullPlan: {
        situation: "Fabiana Ríos cerró con 44% CSAT. Análisis muestra que es un 'Falso Negativo' causado por bajo volumen muestral (16 encuestas vs 93 de Claudia).",
        impact: "Afecta el promedio del equipo injustamente dado que su productividad es Top 3.",
        rootCause: "Falta de invitación explícita a la encuesta al final de la interacción.",
        detailedActions: [
          { phase: "Semana 1: Implementación", tasks: ["Diseño de frase de cierre personalizada", "Roleplay de cierre", "Configuración de alerta de volumen"] },
          { phase: "Semana 2-4: Ejecución", tasks: ["Tracking diario de volumen", "Celebración de cada promotor", "Ajuste de script si no hay respuesta"] }
        ],
        resources: "Scripting, Feedback 1:1, Tablero de Control",
        timeline: "Enero Completo",
        success_metrics: ">40 Encuestas procesadas, CSAT > 75%"
      }
    },
    {
      title: "Proyecto: Clonando a Claudia",
      urgency: "NIVELACIÓN OPERATIVA",
      description: "Valery y Jhony tienen calidad pero les falta nitro. Harán Shadowing Inverso con Claudia (la más rápida) para copiar sus trucos.",
      actions: ["Sesiones de Shadowing", "Copia de atajos de teclado", "Drill de navegación"],
      color: "from-purple-600 to-pink-600",
      icon: BrainCircuit,
      fullPlan: {
        situation: "Valery (Prod 5.83) y Jhony (6.67) están por debajo de la meta de 7.5, generando presión sobre el resto.",
        impact: "Ineficiencia operativa y riesgo de acumulación de cola (Backlog).",
        rootCause: "Flujos de navegación lentos y falta de uso de herramientas rápidas (atajos/macros).",
        detailedActions: [
          { phase: "Observación", tasks: ["Ver trabajar a Claudia Ardila 1 hora/día", "Anotar diferencias de proceso"] },
          { phase: "Práctica", tasks: ["Implementar atajos de Claudia", "Roleplay de velocidad"] }
        ],
        resources: "Claudia Ardila (Mentor), Tiempo fuera de línea",
        timeline: "Quincena 1 Enero",
        success_metrics: "Productividad > 7.5 eventos/hora"
      }
    },
    {
      title: "Iniciativa: Viernes de Escape",
      urgency: "MOTIVACIÓN PURA",
      description: "El incentivo 'El 80/8'. Si logras CSAT >80% y Prod >8.0 en la semana, te vas 2 horas antes el viernes.",
      actions: ["Tracking semanal público", "Gestión de permisos WFM", "Celebración pública"],
      color: "from-yellow-500 to-orange-500",
      icon: Award,
      fullPlan: {
        situation: "Necesitamos mantener el momentum de Diciembre y evitar la fatiga post-navidad.",
        impact: "Mejora clima laboral y crea competencia sana.",
        rootCause: "N/A - Iniciativa proactiva de retención.",
        detailedActions: [
          { phase: "Lanzamiento", tasks: ["Comunicar reglas claras", "Crear tablero de posiciones"] },
          { phase: "Premiación", tasks: ["Validación de métricas Jueves PM", "Autorización de salida Viernes"] }
        ],
        resources: "Horas de compensatorio, Budget de bienestar",
        timeline: "Todo Enero",
        success_metrics: "30% del equipo logrando la doble meta"
      }
    }
  ]

  // --- HELPER FUNCTIONS ---
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-100 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'critical': return 'text-red-600 bg-red-100 border-red-200'
      case 'target': return 'text-purple-600 bg-purple-100 border-purple-200'
      default: return 'text-gray-600 bg-gray-100'
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

  const downloadReport = () => {
    // TEXTO GENERADO SEGÚN TU SOLICITUD DEL CHAT
    const reportText = `
🍋 MBR: TEAM LIMONADA DE MANGO 🥭
Edición: Sobrevivientes de Diciembre | TL: Marlon Martinez

1. ¿CÓMO NOS FUE? (Resumen)
Señores, ¡habemus recuperación! Superamos la meta de CSAT (+10.2%) y casi le pegamos a la Productividad.
La receta: Capacitación, Látigo con cariño (metas diarias) y sacar las manzanas podridas.

2. SCORECARD
- CSAT: 77.9% (Meta 75%) ✅
- Prod: 7.39 (Meta 7.5) ⚠️
- Adherencia: 94.9% ✅

3. JUSTIFICANDO MI SUELDO (ROI Coaching)
- Clínica Grupal (18/Dic): 6.5 Horas-Hombre. Resultado: Clientes felices en Navidad.
- 1-on-1 & Confesionario: ~5.2 Horas. Resultado: Corrección de rumbo inmediata.
- Total Inversión: ~12 Horas de liderazgo puro.

4. EL SALÓN DE LA FAMA
- MVP: Claudia Ardila (Rápida y Furiosa: 9.79 Prod / 84% CSAT).
- Calidad: Salomé Jaramillo (92% CSAT).
- La Baja: Juliana Cardona (Renunció el 31/12). Adiós al Call Avoidance.

5. PLAN ENERO
- Survey Hunting para Fabiana.
- Shadowing inverso para los lentos.
- Cero tolerancia al corte de llamadas.

© 2026 Limonada de Mango Ops.
    `
    const element = document.createElement('a')
    const file = new Blob([reportText], {type: 'text/plain;charset=utf-8'})
    element.href = URL.createObjectURL(file)
    element.download = `MBR_Limonada_Mango_Dic2025.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style jsx global>{`
        :root {
          --konecta-primary: #2800c8;
          --konecta-secondary: #0F0F72;
          --konecta-yellow: #f0fa00;
        }
        .konecta-gradient {
          background: linear-gradient(135deg, var(--konecta-primary), var(--konecta-secondary));
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden konecta-gradient">
        <div className="absolute inset-0 opacity-10">
           {/* Pattern or texture could go here */}
           <Image src={MangoBlanco} alt="Logo Background" layout="fill" objectFit="contain" className="opacity-20 transform scale-150" />
        </div>
        
        <motion.div style={{ y: y1 }} className="relative z-10 text-center text-white px-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block px-4 py-1 rounded-full bg-yellow-400 text-blue-900 font-bold tracking-wider"
          >
            MONTHLY BUSINESS REVIEW
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight">
            LIMONADA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              DE MANGO
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light">
            Edición: "Sobrevivientes de Diciembre"
          </p>
          <div className="mt-8 flex gap-4 justify-center">
             <button onClick={() => document.getElementById('stats')?.scrollIntoView({behavior:'smooth'})} className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors shadow-lg flex items-center gap-2">
                Ver Resultados <ChevronDown size={20}/>
             </button>
             <button onClick={downloadReport} className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                Descargar TXT
             </button>
          </div>
        </motion.div>
      </section>

      {/* --- KPI STATS --- */}
      <section id="stats" className="py-20 -mt-20 relative z-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operationalStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white p-6 rounded-2xl shadow-xl border-t-4 ${
                    stat.status === 'excellent' ? 'border-green-500' : 
                    stat.status === 'warning' ? 'border-yellow-500' : 
                    stat.status === 'target' ? 'border-purple-500' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${getStatusColor(stat.status)}`}>
                    <stat.icon size={24} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(stat.status)}`}>
                    {stat.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-1">{stat.number}</h3>
                <p className="text-gray-600 font-bold">{stat.label}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.subLabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: JUSTIFICANDO LA NÓMINA (ROI) --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-[#2800c8] mb-4">JUSTIFICANDO MI SUELDO 💰</h2>
            <p className="text-xl text-gray-600">ROI del Coaching: Invertimos tiempo, cosechamos calidad.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={100} /></div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">La Misa Grupal</h3>
                <div className="text-4xl font-black text-blue-600 mb-4">6.5h</div>
                <p className="text-blue-800 font-medium">Workshop "Calidad Percibida" (18/Dic)</p>
                <p className="text-sm text-blue-600 mt-2">13 Agentes alineados antes de Navidad.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100} /></div>
                <h3 className="text-2xl font-bold text-purple-900 mb-2">Flash Coaching</h3>
                <div className="text-4xl font-black text-purple-600 mb-4">~5.2h</div>
                <p className="text-purple-800 font-medium">Sesiones 1-on-1</p>
                <p className="text-sm text-purple-600 mt-2">Corrección de rumbo en tiempo real.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={100} /></div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Resultado Final</h3>
                <div className="text-4xl font-black text-green-600 mb-4">+10.2%</div>
                <p className="text-green-800 font-medium">Incremento en CSAT</p>
                <p className="text-sm text-green-600 mt-2">El negocio redondo de Diciembre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUARTILES / AGENT TIERS --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center text-[#2800c8] mb-12">EL SALÓN DE LA FAMA (Y LA NOVELA)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
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
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center bg-white/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-500">CSAT</div>
                        <div className={`font-black text-lg ${parseInt(agent.csat) > 80 ? 'text-green-600' : parseInt(agent.csat) < 70 ? 'text-red-500' : 'text-yellow-600'}`}>
                            {agent.csat}
                        </div>
                    </div>
                    <div className="text-center bg-white/50 p-2 rounded-lg">
                        <div className="text-xs text-gray-500">PROD</div>
                        <div className="font-black text-lg text-blue-600">{agent.prod}</div>
                    </div>
                </div>

                {agent.status === 'terminated' && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold transform -rotate-12 shadow-lg">
                            BAJA / RENUNCIA
                        </span>
                    </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PLAN DE ACCIÓN --- */}
      <section id="action-plans" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#2800c8] mb-4">PLAN DE ATAQUE: ENERO 🥭</h2>
            <p className="text-xl text-gray-600">Estrategias quirúrgicas para empezar el año ganando.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actionPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gray-50 text-gray-700`}>
                        <plan.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">{plan.urgency}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.title}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
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
                        Ver Detalle Completo <ArrowRight size={16}/>
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
                Team Leader | Campaña Mango
            </p>
            <p className="text-xs text-blue-400 mt-8">© 2026 Confidential Operations Report</p>
        </div>
      </footer>

      {/* --- MODAL --- */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                <div className={`p-6 bg-gradient-to-r ${selectedPlan.color} text-white`}>
                    <h2 className="text-3xl font-bold mb-2">{selectedPlan.title}</h2>
                    <p className="opacity-90">{selectedPlan.fullPlan.situation}</p>
                </div>
                <div className="p-8 space-y-6">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><AlertTriangle size={18}/> Causa Raíz</h4>
                        <p className="text-gray-600">{selectedPlan.fullPlan.rootCause}</p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Target size={18}/> Acciones por Fase</h4>
                        <div className="space-y-4">
                            {selectedPlan.fullPlan.detailedActions.map((phase, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-bold text-sm text-[#2800c8] mb-2">{phase.phase}</p>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {phase.tasks.map((t, j) => <li key={j}>{t}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50">
                            Cerrar
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