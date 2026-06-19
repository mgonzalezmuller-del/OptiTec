/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  Sparkles, 
  Tv,
  Subtitles,
  Smartphone,
  Eye,
  Settings,
  Flame,
  CheckCircle2
} from "lucide-react";

interface PresentationSlide {
  timeStart: number;
  timeEnd: number;
  title: string;
  subtitle: string;
  narration: string;
  visualTheme: string; // background color gradient or icon reference
  stats?: { value: string; label: string };
  actionPoints?: string[];
}

const NARRATIVE_SLIDES: PresentationSlide[] = [
  {
    timeStart: 0,
    timeEnd: 12,
    title: "Tradición con Futuro Digital",
    subtitle: "El valor de la trayectoria asistido por tecnología asertiva",
    narration: "Bienvenidos a OptiTec. Creemos que la transformación digital no es borrar el pasado, sino honrar tu trayectoria y herencia dándole superpoderes tecnológicos en la nube.",
    visualTheme: "from-slate-900 via-[#0a1e42] to-slate-900",
    stats: { value: "15+", label: "Años de acompañamiento" },
    actionPoints: ["Diagnóstico inicial de brechas", "Planificación de adopción", "Paso de manual a sistémico"]
  },
  {
    timeStart: 12,
    timeEnd: 28,
    title: "Caso de Éxito: Astillero Regnicoli",
    subtitle: "Modernización de la leyenda náutica de lanchas artesanales",
    narration: "Acompañamos al astillero Regnicoli en la unificación de su base comercial CRM, la migración de inventario a ERP Cloud, y la implementación de catalogadores 3D interactivos.",
    visualTheme: "from-sky-900 via-opti-blue to-slate-900",
    stats: { value: "+24%", label: "Conversión de ventas" },
    actionPoints: ["Migración de planillas a Cloud", "Visualizadores 3D náuticos", "Entrenamiento presencial 4.0"]
  },
  {
    timeStart: 28,
    timeEnd: 45,
    title: "El Elemento Humano: Capacitación 4.0",
    subtitle: "Garantizando una adopción del 100% libre de frustraciones",
    narration: "Nuestra clave es la capacitación comprensiva y amigable. Respetamos el oficio tradicional de tus operarios y los capacitamos en un mes, convirtiendo la reticencia en orgullo digital.",
    visualTheme: "from-[#0d2a4a] via-opti-medium to-slate-950",
    stats: { value: "96%", label: "Adopción de herramientas" },
    actionPoints: ["Talleres lúdicos prácticos", "Manuales digitales breves", "Canales de soporte directo"]
  },
  {
    timeStart: 45,
    timeEnd: 60,
    title: "Obtenga su Informe Estratégico",
    subtitle: "Diseñado para la realidad y escala de su empresa tradicional",
    narration: "Acceda a su autodiagnóstico integral de forma gratuita. Pruebe nuestro test en línea hoy mismo para evaluar sus brechas operativas y descargar su roadmap de transformación.",
    visualTheme: "from-indigo-950 via-slate-900 to-opti-navy",
    stats: { value: "100%", label: "Confidencial & Práctico" },
    actionPoints: ["Análisis de cuellos de botella", "Plan de sistemas sugerido", "Proyección de retorno (ROI)"]
  }
];

export default function VideoPresentation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 59) {
            setIsPlaying(false);
            return 0; // Loop or reset to start
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = Math.min(59, Math.max(0, Math.round((clickX / width) * 60)));
    setCurrentTime(newTime);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Find active slide based on current time
  const activeSlide = NARRATIVE_SLIDES.find(
    s => currentTime >= s.timeStart && currentTime < s.timeEnd
  ) || NARRATIVE_SLIDES[0];

  const progressPercentage = (currentTime / 60) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-opti-blue tracking-tight">
          Nuestra visión en acción
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Aquí va un video de presentación de OptiTec. Este video muestra cómo transformamos empresas con historia en líderes digitales, con ejemplos reales como el Astillero Regnicoli.
        </p>
      </div>

      {/* Simulated Video Player Container */}
      <div 
        ref={playerContainerRef}
        className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-2xl transition-all duration-300 border border-slate-800/80 ${
          isFullScreen ? "fixed inset-0 z-50 aspect-auto h-screen w-screen rounded-none" : "max-w-4xl mx-auto"
        }`}
      >
        {/* VIDEO CONTENT (Slideshow simulating high-tier presentation) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.visualTheme} p-8 flex flex-col justify-between transition-all duration-700`}>
          {/* Video Header overlay */}
          <div className="flex justify-between items-start text-white/90 z-10">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-opti-cyan font-bold text-xs text-opti-blue">
                OT
              </span>
              <div>
                <h4 className="font-display font-bold text-xs md:text-sm tracking-wide">
                  OptiTec | Transformación Digital
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">Presentación institucional</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded text-[10px] md:text-xs font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
              Presentación Interactiva
            </div>
          </div>

          {/* Active Content Area with Framer Motion transitions */}
          <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center z-10 select-none">
            {/* Left slide text */}
            <div className="md:col-span-8 text-left text-white space-y-2 md:space-y-4">
              <span className="inline-flex items-center gap-1 rounded bg-opti-cyan/10 border border-opti-cyan/20 px-2 py-0.5 text-[9px] md:text-xs font-semibold text-opti-cyan uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> {activeSlide.subtitle}
              </span>
              <h3 className="font-display text-xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {activeSlide.title}
              </h3>

              {/* Bullet list in presentation */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                {activeSlide.actionPoints?.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[10px] md:text-sm text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-opti-cyan shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side metric spotlight */}
            {activeSlide.stats && (
              <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right text-white">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-sm shadow-xl max-w-[180px] w-full">
                  <span className="font-display text-2xl md:text-4xl font-extrabold text-opti-cyan block">
                    {activeSlide.stats.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-slate-300 font-medium leading-tight block mt-1">
                    {activeSlide.stats.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic narrative audio caption overlay */}
          <AnimatePresence>
            {showCaptions && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto max-w-xl bg-black/70 backdrop-blur-md border border-white/10 p-3 rounded-lg text-center z-10 text-[10px] md:text-xs text-slate-200 leading-tight select-none my-2"
              >
                <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-wider font-bold text-opti-cyan mb-1 font-mono">
                  <Subtitles className="h-3 w-3" /> Transcripción de Audio
                </div>
                "{activeSlide.narration}"
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Controls Bar */}
          <div className="pt-4 border-t border-white/10 z-10 space-y-2.5">
            {/* Timeline Progress Bar */}
            <div 
              onClick={handleProgressBarClick}
              className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all duration-200 overflow-hidden"
            >
              <div 
                className="bg-opti-cyan h-full rounded-full transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Button controls */}
            <div className="flex justify-between items-center text-white text-xs md:text-sm">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleTogglePlay}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-opti-cyan hover:text-opti-blue transition duration-150"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white hover:fill-opti-blue" />}
                </button>

                <button
                  onClick={handleRestart}
                  className="text-slate-400 hover:text-white transition"
                  title="Reiniciar"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                {/* Progress ratio */}
                <span className="font-mono text-[10px] md:text-xs text-slate-300">
                  0:{currentTime < 10 ? `0${currentTime}` : currentTime} / 1:00
                </span>
              </div>

              {/* Right utility triggers */}
              <div className="flex items-center gap-3.5 text-slate-300">
                {/* Closed caption toggle */}
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`transition ${showCaptions ? "text-opti-cyan" : "text-slate-400 hover:text-white"}`}
                  title="Activar Subtítulos"
                >
                  <Subtitles className="h-4 w-4" />
                </button>

                {/* Mute toggle */}
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition"
                  title={isMuted ? "Quitar Silencio" : "Silenciar"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <button 
                  onClick={handleToggleFullScreen}
                  className="hover:text-white transition"
                  title="Pantalla Completa"
                >
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Giant Play Button overlay, hidden when playing */}
        <AnimatePresence>
          {!isPlaying && currentTime === 0 && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center cursor-pointer z-20"
              onClick={handleTogglePlay}
            >
              <div className="text-center space-y-4">
                <motion.button 
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-opti-cyan text-white shadow-xl shadow-opti-cyan/30 border border-white/20 transition-all duration-300 focus:outline-none"
                >
                  <Play className="h-9 w-9 fill-white translate-x-0.5" />
                </motion.button>
                <div className="bg-black/60 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                  <p className="text-white text-xs md:text-sm font-semibold tracking-wide flex items-center gap-1.5">
                    <Tv className="h-4 w-4 text-opti-cyan" />
                    Reproducir Presentación (1:00)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
