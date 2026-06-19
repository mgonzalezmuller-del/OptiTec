/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Database, 
  GraduationCap, 
  Search, 
  ChevronDown, 
  Check, 
  Menu, 
  X, 
  ArrowRight, 
  Clock, 
  Calendar,
  Sparkles,
  Lock,
  Network,
  Award,
  Code,
  MapPin,
  Building2,
  Mail,
  User,
  MessagesSquare,
  BadgeAlert,
  Sliders,
  PlayCircle
} from "lucide-react";

import { REPORT_ITEMS, REGNICOLI_MILESTONES, calculateMaturity } from "./data";
import { LeadSubmission } from "./types";
import AssessmentModal from "./components/AssessmentModal";
import VideoPresentation from "./components/VideoPresentation";

// Image constants generated in our work
const HERO_BG_IMAGE = "/src/assets/images/hero_digital_grid_1781874352918.jpg";
const MEETING_ROOM_IMAGE = "/src/assets/images/boardroom_meeting_bw_1781874368712.jpg";
const SHIPYARD_IMAGE = "/src/assets/images/shipyard_regnicoli_1781874384375.jpg";

export default function App() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState("auditoria");
  const [activeMilestoneId, setActiveMilestoneId] = useState<number>(1);
  const [recentLead, setRecentLead] = useState<LeadSubmission | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Consultation booking states
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [bookedDate, setBookedDate] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Available consultation times slots simulated
  const TIME_SLOTS = ["09:00", "11:00", "14:30", "16:00"];
  const NEXT_DAYS = [
    { day: "Lunes", date: "22/06" },
    { day: "Martes", date: "23/06" },
    { day: "Miércoles", date: "24/06" },
    { day: "Jueves", date: "25/06" },
    { day: "Viernes", date: "26/06" }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactCompany || !bookedDate || !bookedTime) {
      alert("Por favor completá los casilleros de fecha, hora y datos para confirmar la agenda.");
      return;
    }
    setIsBookingSuccess(true);
    setTimeout(() => {
      // Clear or save locally
      const meeting = {
        name: contactName,
        email: contactEmail,
        company: contactCompany,
        msg: contactMsg,
        date: bookedDate,
        time: bookedTime,
        bookedAt: new Date().toISOString()
      };
      localStorage.setItem("optitec_meeting", JSON.stringify(meeting));
    }, 1000);
  };

  const handleOpenAssessment = () => {
    setIsAssessmentOpen(true);
  };

  const handleOpenConsultation = () => {
    setIsConsultationModalOpen(true);
    setIsBookingSuccess(false);
  };

  const handleLeadRegistered = (lead: LeadSubmission) => {
    setRecentLead(lead);
  };

  const selectedReportDetails = REPORT_ITEMS.find(item => item.id === activeReportTab) || REPORT_ITEMS[0];
  const activeMilestone = REGNICOLI_MILESTONES.find(m => m.number === activeMilestoneId) || REGNICOLI_MILESTONES[0];

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-opti-cyan selection:text-white">
      
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs" id="nav-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-opti-navy font-bold text-white text-lg shadow-md group-hover:bg-opti-cyan transition duration-300">
                OT
              </span>
              <span className="font-display font-bold text-2xl tracking-tight text-opti-navy group-hover:text-opti-cyan transition duration-300">
                OptiTec
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#soluciones" className="text-sm font-semibold text-slate-600 hover:text-opti-cyan transition duration-150">
                Soluciones
              </a>
              <a href="#mision" className="text-sm font-semibold text-slate-600 hover:text-opti-cyan transition duration-150">
                Misión
              </a>
              <a href="#casos" className="text-sm font-semibold text-slate-600 hover:text-opti-cyan transition duration-150">
                Caso de Estudio
              </a>
              <a href="#beneficios" className="text-sm font-semibold text-slate-600 hover:text-opti-cyan transition duration-150">
                Beneficios
              </a>
              <button 
                id="btn-nav-contact"
                onClick={handleOpenConsultation}
                className="glow-btn bg-opti-cyan hover:bg-opti-blue text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-opti-cyan/10 hover:shadow-lg transition duration-300"
              >
                Contactar
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-opti-cyan p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-50 border-b border-slate-200"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 font-medium text-slate-700">
                <a 
                  href="#soluciones" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white hover:text-opti-cyan transition"
                >
                  Soluciones
                </a>
                <a 
                  href="#mision" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white hover:text-opti-cyan transition"
                >
                  Misión
                </a>
                <a 
                  href="#casos" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white hover:text-opti-cyan transition"
                >
                  Caso de Estudio
                </a>
                <a 
                  href="#beneficios" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white hover:text-opti-cyan transition"
                >
                  Beneficios
                </a>
                <div className="pt-2 px-3">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleOpenConsultation();
                    }}
                    className="w-full text-center bg-opti-cyan text-white font-bold py-3 rounded-xl shadow-md"
                  >
                    Contactar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-opti-navy text-white overflow-hidden" id="hero-section">
        {/* Ambient Overlay background */}
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <img 
            src={HERO_BG_IMAGE} 
            alt="Fondo Digital Grid OptiTec" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Subtle radial gradients to augment tech look */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#040d21]/70 to-[#040d21] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 md:pt-32 md:pb-44 flex flex-col items-center text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-1 bg-opti-cyan rounded-full mb-6"
          />

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6"
          >
            De la tradición al futuro digital
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10"
          >
            No se trata de cambiar lo que tu empresa es, sino de potenciar lo que ya es mediante tecnología.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.4 }}
            className="w-full max-w-xl px-4"
          >
            <button 
              id="hero-cta-btn"
              onClick={handleOpenAssessment}
              className="glow-btn bg-white hover:bg-neutral-100 text-opti-navy font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-2xl hover:shadow-white/10 transition duration-300 w-full flex items-center justify-center gap-3 group border border-slate-200"
            >
              <Sparkles className="h-5 w-5 text-opti-cyan shrink-0" />
              <span>Descargá el informe completo y descubrí tu próximo gran salto</span>
              <ArrowRight className="h-4 w-4 text-opti-navy shrink-0 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>

          {/* Quick assessment success floating alert if they did it */}
          {recentLead && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 backdrop-blur-sm shadow-xl"
            >
              <span>¡Diagnóstico Guardado para {recentLead.company}! Madurez: {recentLead.maturityLevel}</span>
            </motion.div>
          )}

          {/* Scroll Down Anchor */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-1 opacity-60">
            <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono">Conocer más</span>
            <ChevronDown className="h-5 w-5 text-opti-cyan" />
          </div>
        </div>
      </header>

      {/* SECTION: NUESTRA VISIÓN EN ACCIÓN (VIDEO MOCK) */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 px-4 sm:px-6 lg:px-8" id="soluciones">
        <div className="max-w-7xl mx-auto">
          {/* Interactive Player Component */}
          <VideoPresentation />
        </div>
      </section>

      {/* SECTION: ESTRATEGIA QUE HONRA TU LEGADO */}
      <section className="py-20 md:py-28 border-b border-slate-100 px-4 sm:px-6 lg:px-8" id="beneficios">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-opti-cyan uppercase tracking-widest block bg-opti-cyan/10 px-3 py-1 rounded inline-block">
              VALOR COMPROMETIDO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-opti-blue tracking-tight leading-tight">
              Estrategia que honra tu legado
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              OptiTec es una consultora estratégica en transformación digital. Nos especializamos en acompañar empresas con trayectoria que enfrentan brechas tecnológicas, ayudándolas a crecer de manera sostenible.
            </p>

            {/* Metrics block */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="border-l-4 border-opti-cyan pl-4 space-y-1 py-1">
                <div className="font-display text-3xl sm:text-4xl font-black text-opti-blue tracking-tight">15+</div>
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold leading-tight">
                  AÑOS DE EXPERTISE
                </div>
              </div>
              <div className="border-l-4 border-opti-cyan pl-4 space-y-1 py-1">
                <div className="font-display text-3xl sm:text-4xl font-black text-opti-blue tracking-tight">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold leading-tight">
                  COMPROMISO
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 group">
              <img 
                src={MEETING_ROOM_IMAGE} 
                alt="Reunión estratégica OptiTec" 
                className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/50 text-[11px] text-slate-700 flex items-center gap-3 shadow-lg">
                <Award className="h-5 w-5 text-opti-cyan shrink-0 animate-pulse" />
                <span>Planificación integral, alineando las metas financieras con la agilización de sistemas.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: NUESTRA MISIÓN (DARK STATELY ZONE) */}
      <section className="bg-opti-navy text-white py-24 md:py-32 relative overflow-hidden px-4 sm:px-6 lg:px-8" id="mision">
        {/* Absolute decorative node graph graphic */}
        <div className="absolute -right-36 -bottom-36 h-96 w-96 opacity-10 pointer-events-none select-none">
          <Network className="h-full w-full text-white" />
        </div>
        <div className="absolute -left-20 -top-20 h-64 w-64 opacity-5 pointer-events-none select-none">
          <Sliders className="h-full w-full text-white" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center space-y-8 z-10">
          {/* Cyan icon */}
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-opti-cyan shadow-lg shadow-opti-cyan/20 cursor-pointer"
          >
            <Network className="h-8 w-8 text-white" />
          </motion.div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-slate-300">
            Nuestra Misión
          </h3>

          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-relaxed italic max-w-3xl text-slate-200">
            "Ser el puente entre la experiencia acumulada y el futuro digital. Traducimos tecnología en decisiones estratégicas claras, con impacto directo en procesos, ventas y cultura organizacional."
          </blockquote>
        </div>
      </section>

      {/* SECTION: CASE STUDY: ASTILLERO REGNICOLI */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 px-4 sm:px-6 lg:px-8" id="casos">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-12">
            <span className="text-xs font-bold text-opti-cyan uppercase tracking-widest block mb-1">
              CASE STUDY: HAZAÑAS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-opti-blue tracking-tight">
              Astillero Regnicoli
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-xl">
              Cómo un astillero con décadas de prestigio náutico integró tecnologías disruptivas sin perder su esencia artesanal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left side: interactive milestones list */}
            <div className="lg:col-span-5 space-y-4">
              {REGNICOLI_MILESTONES.map((m) => {
                const isActive = activeMilestoneId === m.number;

                return (
                  <button
                    key={m.number}
                    onClick={() => setActiveMilestoneId(m.number)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-white border-opti-cyan shadow-xl ring-1 ring-opti-cyan"
                        : "bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        isActive
                          ? "bg-opti-cyan text-white shadow-md shadow-opti-cyan/20"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {m.number}
                      </span>
                      
                      <div className="space-y-1">
                        <h4 className={`font-display font-bold text-sm sm:text-base ${
                          isActive ? "text-opti-blue" : "text-slate-700"
                        }`}>
                          {m.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-snug">
                          {m.description}
                        </p>
                      </div>
                    </div>

                    {/* Expandable specifics on active tab */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-slate-100 ml-12 space-y-2 text-xs text-slate-600"
                        >
                          <span className="font-semibold text-opti-blue uppercase tracking-wider block text-[9px]">Impacto tecnológico:</span>
                          {m.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            {/* Right side: dynamic illustrative view */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white p-2">
                <img 
                  src={SHIPYARD_IMAGE} 
                  alt="Astillero Regnicoli Modernización" 
                  className="w-full aspect-16/10 object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating UI tags overlay */}
                <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-white flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-opti-cyan animate-pulse" />
                  ERP/CRM INTEGRATION
                </div>

                <div className="absolute bottom-6 right-6 left-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white space-y-1 text-xs">
                  <span className="text-[10px] text-opti-cyan uppercase tracking-wider font-bold">Estado actual del proyecto</span>
                  <p className="font-medium text-slate-200">
                    "{activeMilestone.description}" implementado con éxito, logrando unificar áreas operativas y comerciales en tiempo récord.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: POR QUÉ ACCEDER AL INFORME FINAL */}
      <section className="py-20 md:py-28 bg-[#fdfefe] border-b border-slate-100 px-4 sm:px-6 lg:px-8" id="beneficios-informe">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-opti-blue tracking-tight leading-tight">
              Por Qué Acceder al Informe Final
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Descubrí el roadmap estratégico que habilitará el próximo nivel de competitividad para tu empresa.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 text-left space-y-4 cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-opti-cyan/10 text-opti-cyan">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-opti-blue">
                Visión de Brecha
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Identificamos con precisión dónde está perdiendo competitividad tu empresa frente al mercado digital.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 text-left space-y-4 cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-opti-cyan/10 text-opti-cyan">
                <Sliders className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-opti-blue">
                Roadmap Accionable
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No solo teoría; entregamos un plan paso a paso diseñado para la realidad de tu industria.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 text-left space-y-4 cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-opti-cyan/10 text-opti-cyan">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-opti-blue">
                Proyección de ROI
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Entendé el retorno esperado de cada inversión tecnológica recomendada.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION: QUÉ INCLUYE EL INFORME (INTERACTIVE SELECTION) */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Clickable grids (2x2 Selector block as seen in mockup) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              
              <button
                onClick={() => setActiveReportTab("auditoria")}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between aspect-video transition-all duration-300 ${
                  activeReportTab === "auditoria"
                    ? "bg-opti-blue border-opti-cyan text-white shadow-xl"
                    : "bg-slate-50 border-slate-150 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className={`p-2 rounded-lg bg-opacity-10 ${activeReportTab === "auditoria" ? "bg-opti-cyan text-opti-cyan" : "bg-slate-300 text-slate-600"}`}>
                    <Search className="h-5 w-5" />
                  </div>
                  {activeReportTab === "auditoria" && <span className="h-2 w-2 rounded-full bg-opti-cyan animate-ping" />}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base">Auditoría integral</h4>
                  <p className={`text-[10px] sm:text-xs mt-1 ${activeReportTab === "auditoria" ? "text-slate-300" : "text-slate-500"}`}>
                    Estudio profundo de sistemas legados.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveReportTab("crm-erp")}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between aspect-video transition-all duration-300 ${
                  activeReportTab === "crm-erp"
                    ? "bg-opti-blue border-opti-cyan text-white shadow-xl"
                    : "bg-slate-50 border-slate-150 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className={`p-2 rounded-lg bg-opacity-10 ${activeReportTab === "crm-erp" ? "bg-opti-cyan text-opti-cyan" : "bg-slate-300 text-slate-600"}`}>
                    <Database className="h-5 w-5" />
                  </div>
                  {activeReportTab === "crm-erp" && <span className="h-2 w-2 rounded-full bg-opti-cyan animate-ping" />}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base">Propuesta CRM/ERP</h4>
                  <p className={`text-[10px] sm:text-xs mt-1 ${activeReportTab === "crm-erp" ? "text-slate-300" : "text-slate-500"}`}>
                    Sincronismo de CRM y administración Cloud.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveReportTab("capacitacion")}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between aspect-video transition-all duration-300 ${
                  activeReportTab === "capacitacion"
                    ? "bg-opti-blue border-opti-cyan text-white shadow-xl"
                    : "bg-slate-50 border-slate-150 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className={`p-2 rounded-lg bg-opacity-10 ${activeReportTab === "capacitacion" ? "bg-opti-cyan text-opti-cyan" : "bg-slate-300 text-slate-600"}`}>
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  {activeReportTab === "capacitacion" && <span className="h-2 w-2 rounded-full bg-opti-cyan animate-ping" />}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base">Plan capacitación</h4>
                  <p className={`text-[10px] sm:text-xs mt-1 ${activeReportTab === "capacitacion" ? "text-slate-300" : "text-slate-500"}`}>
                    Entrenamiento no intimidante para el personal.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveReportTab("impacto")}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between aspect-video transition-all duration-300 ${
                  activeReportTab === "impacto"
                    ? "bg-opti-blue border-opti-cyan text-white shadow-xl"
                    : "bg-slate-50 border-slate-150 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className={`p-2 rounded-lg bg-opacity-10 ${activeReportTab === "impacto" ? "bg-opti-cyan text-opti-cyan" : "bg-slate-300 text-slate-600"}`}>
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  {activeReportTab === "impacto" && <span className="h-2 w-2 rounded-full bg-opti-cyan animate-ping" />}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base">Impacto esperado</h4>
                  <p className={`text-[10px] sm:text-xs mt-1 ${activeReportTab === "impacto" ? "text-slate-300" : "text-slate-500"}`}>
                    Proyección clara de ROI y plazos de entrega.
                  </p>
                </div>
              </button>

            </div>

            {/* Right side: checklists & active details */}
            <div className="lg:col-span-6 space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200/60 shadow-inner">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-opti-cyan uppercase tracking-widest bg-opti-cyan/10 px-2 py-0.5 rounded">
                  {selectedReportDetails.estimatedTime}
                </span>
                <h3 className="font-display text-2xl font-bold text-opti-blue" id="report-title-heading">
                  Qué Incluye el Informe
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {selectedReportDetails.longDesc}
                </p>
              </div>

              {/* Checklist items dynamic */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <span className="font-bold text-xs uppercase tracking-wider text-opti-blue block">Principales entregables:</span>
                {selectedReportDetails.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <Check className="h-4.5 w-4.5 text-opti-cyan shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic ROI highlight */}
              <div className="bg-white/80 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 flex justify-between items-center">
                <span>Retorno asociado:</span>
                <span className="font-bold text-opti-cyan">{selectedReportDetails.roiContribution}</span>
              </div>

              {/* Button */}
              <div className="pt-4">
                <button
                  id="btn-download-report-trigger"
                  onClick={handleOpenAssessment}
                  className="glow-btn w-full bg-opti-blue hover:bg-opti-cyan text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-opti-cyan/10 transition duration-300 text-center text-sm uppercase tracking-wider"
                >
                  Descargar Reporte
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-opti-navy text-white py-24 md:py-32 relative overflow-hidden text-center px-4 sm:px-6 lg:px-8">
        
        {/* Decorative background radial gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-opti-blue via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-8 z-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            ¿Estás listo para liderar el futuro?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Agendá una sesión de consultoría inicial y empezá tu proceso de transformación hoy.
          </p>

          <div className="pt-4">
            <button
              id="cta-contact-btn"
              onClick={handleOpenConsultation}
              className="glow-btn inline-flex items-center gap-2 rounded-full bg-opti-cyan hover:bg-white hover:text-opti-navy px-8 py-4 font-bold text-sm sm:text-base text-white shadow-xl shadow-opti-cyan/20 transition duration-300"
            >
              Contactar con un Experto
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-center md:text-left">
          
          <div className="space-y-2">
            <div className="flex justify-center md:justify-start items-center gap-2 text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-opti-cyan font-bold text-xs text-slate-950">
                OT
              </span>
              <span className="font-display font-bold text-lg tracking-wider">
                OptiTec
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              © 2026 OptiTec Digital Transformation. All rights reserved.
            </p>
          </div>

          {/* Links structure explicitly as in image */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-semibold text-slate-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
            <button onClick={handleOpenConsultation} className="hover:text-white transition cursor-pointer">Contact</button>
          </div>

        </div>
      </footer>

      {/* MODAL 1: ASSESSMENT MODAL COMPONENTS */}
      <AssessmentModal 
        isOpen={isAssessmentOpen} 
        onClose={() => setIsAssessmentOpen(false)} 
        onLeadSubmitted={handleLeadRegistered}
      />

      {/* MODAL 2: CONSULTATION AGENDA MODAL */}
      <AnimatePresence>
        {isConsultationModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="consultation-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConsultationModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-100"
              >
                {/* Header banner */}
                <div className="bg-opti-blue p-6 text-white relative">
                  <button
                    onClick={() => setIsConsultationModalOpen(false)}
                    className="absolute top-4 right-4 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-opti-cyan" />
                    <h3 className="font-display font-bold text-lg md:text-xl">Agendar Sesión de Consultoría</h3>
                  </div>
                  <p className="text-slate-300 text-xs mt-1">
                    Gratuita • 30 minutos • Con un estratega técnico especialista
                  </p>
                </div>

                {!isBookingSuccess ? (
                  <form onSubmit={handleBookingSubmit} className="p-6 md:p-8 space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Elegí el día y horario que mejor convenga. Analizaremos las ineficiencias de tus silos operativos y propondremos soluciones a la medida.
                    </p>

                    {/* Step 1: Picker simulated */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest">
                        1. Elegí Fecha (Próxima semana)
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {NEXT_DAYS.map((d, index) => {
                          const isSel = bookedDate === d.date;
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setBookedDate(d.date)}
                              className={`p-2.5 rounded-lg border text-center transition ${
                                isSel
                                  ? "bg-opti-cyan/15 border-opti-cyan ring-1 ring-opti-cyan font-semibold text-opti-blue"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white"
                              }`}
                            >
                              <div className="text-[10px] text-slate-400 tracking-wider font-semibold">{d.day}</div>
                              <div className="text-xs mt-0.5 font-bold font-mono">{d.date}/06</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Time Slots */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest">
                        2. Elegí Horario (Zona Horaria es-AR)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((t, idx) => {
                          const isSel = bookedTime === t;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setBookedTime(t)}
                              className={`py-2 px-3 rounded-lg border text-center font-mono text-xs transition ${
                                isSel
                                  ? "bg-opti-cyan text-white border-opti-cyan font-bold"
                                  : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 bg-white"
                              }`}
                            >
                              {t} hs
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Info fields */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest">
                        3. Completá tus Datos Corporativos
                      </label>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                              <User className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="Tu Nombre completo"
                              value={contactName}
                              onChange={e => setContactName(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none transition"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                              <Mail className="h-4 w-4" />
                            </span>
                            <input
                              type="email"
                              required
                              placeholder="Email corporativo"
                              value={contactEmail}
                              onChange={e => setContactEmail(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none transition"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                              <Building2 className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="Nombre de la Empresa"
                              value={contactCompany}
                              onChange={e => setContactCompany(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none transition"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                              <MessagesSquare className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              placeholder="Breve comentario del rubro..."
                              value={contactMsg}
                              onChange={e => setContactMsg(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none transition"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Lock className="h-3 w-3 text-emerald-600" />
                        <span>Enlace de Google Meet encriptado</span>
                      </div>
                      
                      <button
                        type="submit"
                        className="rounded-xl bg-opti-cyan text-white px-5 py-2.5 text-xs font-bold hover:bg-opti-blue transition shadow-md shadow-opti-cyan/15"
                      >
                        Confirmar Agenda Gratuita
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-slate-900">¡Agenda Confirmada Exitosamente!</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Hemos reservado la sesión para el <strong>{bookedDate}/06</strong> a las <strong>{bookedTime} hs</strong> (es-AR). Enviamos la invitación con el enlace de videoconferencia a <strong>{contactEmail}</strong>.
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => setIsConsultationModalOpen(false)}
                        className="rounded-xl bg-opti-navy text-white px-6 py-2.5 text-xs font-bold hover:bg-opti-cyan transition"
                      >
                        Entendido
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
