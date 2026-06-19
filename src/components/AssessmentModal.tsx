/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Building2, 
  Mail, 
  User, 
  Briefcase, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  ShieldAlert,
  Lock,
  AlertCircle
} from "lucide-react";
import { ASSESSMENT_QUESTIONS, calculateMaturity } from "../data";
import { LeadSubmission } from "../types";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSubmitted?: (lead: LeadSubmission) => void;
}

export default function AssessmentModal({ isOpen, onClose, onLeadSubmitted }: AssessmentModalProps) {
  const [step, setStep] = useState<"intro" | "questions" | "lead" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // Lead info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("10-50 empleados");
  const [challenge, setChallenge] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [customReportDownloaded, setCustomReportDownloaded] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDownloadError, setIsDownloadError] = useState<boolean>(false);
  const [downloadAttempted, setDownloadAttempted] = useState<boolean>(false);
  
  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNextQuestion = () => {
    if (currentIdx < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep("lead");
    }
  };

  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      setStep("intro");
    }
  };

  const totalScore: number = (Object.values(answers) as number[]).reduce((sum: number, score: number) => sum + score, 0);
  const maturity = calculateMaturity(totalScore || 4);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim()) {
      setValidationError("Por favor, completá tu nombre completo.");
      return;
    }
    if (!email.trim()) {
      setValidationError("Por favor, completá tu correo electrónico corporativo.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError("Por favor, ingresá una dirección de correo válida (ej. nombre@empresa.com).");
      return;
    }

    if (!company.trim()) {
      setValidationError("Por favor, completá la Razón Social o Nombre de tu Empresa.");
      return;
    }
    if (!industry.trim()) {
      setValidationError("Por favor, completá el Sector o la Industria de tu compañía.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API registration delay
    setTimeout(() => {
      const submission: LeadSubmission = {
        id: "lead_" + Date.now(),
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        industry: industry.trim(),
        companySize,
        challenge: challenge.trim(),
        score: totalScore,
        maturityLevel: maturity.level,
        submittedAt: new Date().toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("optitec_leads") || "[]");
      localStorage.setItem("optitec_leads", JSON.stringify([submission, ...existing]));
      
      setIsSubmitting(false);
      setStep("result");
      
      if (onLeadSubmitted) {
        onLeadSubmitted(submission);
      }
    }, 1200);
  };

  const resetAll = () => {
    setAnswers({});
    setCurrentIdx(0);
    setName("");
    setEmail("");
    setCompany("");
    setIndustry("");
    setChallenge("");
    setStep("intro");
    setCustomReportDownloaded(false);
    setValidationError(null);
    setIsDownloadError(false);
    setDownloadAttempted(false);
  };

  const triggerHTMLDownload = () => {
    setCustomReportDownloaded(true);
    try {
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Informe de Madurez Digital - ${company || "Tu Empresa"}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; background-color: #f8fafc; }
    .wrapper { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
    .header { border-bottom: 2px solid #00b4d8; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-size: 24px; font-weight: bold; color: #040d21; }
    .badge { background-color: #00b4d8; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; }
    h1 { color: #040d21; font-size: 28px; margin-top: 0; }
    h2 { color: #0b1e42; font-size: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 30px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .card { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #00b4d8; }
    .meta-label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; }
    .meta-value { font-size: 16px; font-weight: bold; margin-top: 4px; }
    .recommendation { background: #e0f7fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00a3cc; margin-top: 20px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; }
    .footer { margin-top: 50px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    .btn-print { background-color: #040d21; color: white; border: none; padding: 12px 24px; font-size: 15px; font-weight: bold; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
    .btn-print:hover { background-color: #00b4d8; }
    @media print {
      body { background: white; padding: 0; }
      .wrapper { border: none; box-shadow: none; padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand">OptiTec <span style="font-size: 14px; font-weight: normal; color: #64748b;">• Consultoría en Transformación Digital</span></div>
      <div class="badge">Autodiagnóstico Realizado</div>
    </div>
    
    <h1>Informe Estratégico de Capacidad Tecnológica</h1>
    
    <div class="grid">
      <div class="card">
        <div class="meta-label">Empresa</div>
        <div class="meta-value">${company}</div>
        <div style="margin-top: 8px;" class="meta-label">Industria</div>
        <div class="meta-value">${industry}</div>
      </div>
      <div class="card">
        <div class="meta-label">Maturidad Digital</div>
        <div class="meta-value" style="color: #00b4d8;">${maturity.level}</div>
        <div style="margin-top: 8px;" class="meta-label">Puntaje</div>
        <div class="meta-value">${maturity.scoreText}</div>
      </div>
    </div>
    
    <h2>Diagnóstico Conceptual</h2>
    <p><strong>${maturity.tagline}</strong></p>
    <p>${maturity.summary}</p>
    
    <h2>Prioridad de Acción Recomendada por OptiTec</h2>
    <div class="recommendation">
      <p><strong>Hoja de Ruta Estratégica Sugerida:</strong></p>
      <p>${maturity.actionRequired}</p>
    </div>
    
    <h2>Siguientes Pasos</h2>
    <ul>
      <li><strong>Paso 1: Auditoría de Alineación</strong> - Validar respuestas en videollamada orientativa (30 mins) gratis.</li>
      <li><strong>Paso 2: Presentación de Casos de Éxito</strong> - Revisar plan detallado implementado en astilleros y metalúrgicas.</li>
      <li><strong>Paso 3: Estimación de Presupuesto Inicial</strong> - Modelado de retorno financiero (ROI) garantizado.</li>
    </ul>
    
    <div style="margin-top: 40px; text-align: center;" class="no-print">
      <button onclick="window.print()" class="btn-print">Imprimir o Guardar como PDF</button>
    </div>
    
    <div class="footer">
      Este informe ejecutivo fue generado automáticamente el ${new Date().toLocaleDateString("es-AR")} por el sistema de diagnóstico inteligente de OptiTec Digital Transformation © 2026.
    </div>
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `OptiTec_Informe_${company.replace(/\s+/g, "_") || "Digital"}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al descargar", err);
    }
  };

  const handleSimulateDownload = () => {
    setDownloadAttempted(true);
    setCustomReportDownloaded(true);
    setIsDownloadError(false);

    try {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Informe de Madurez Digital - ${company}</title>
              <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
                .header { border-bottom: 2px solid #00b4d8; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
                .brand { font-size: 24px; font-weight: bold; color: #040d21; }
                .badge { background-color: #00b4d8; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; }
                h1 { color: #040d21; font-size: 28px; margin-top: 0; }
                h2 { color: #0b1e42; font-size: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 30px; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                .card { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #00b4d8; }
                .meta-label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; }
                .meta-value { font-size: 16px; font-weight: bold; margin-top: 4px; }
                .recommendation { background: #e0f7fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00a3cc; margin-top: 20px; }
                .footer { margin-top: 50px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                @media print {
                  body { padding: 20px; }
                  button { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="brand">OptiTec <span style="font-size: 14px; font-weight: normal; color: #64748b;">Consultoría en Transformación Digital</span></div>
                <div class="badge">Autodiagnóstico Realizado</div>
              </div>
              
              <h1>Informe Estratégico de Capacidad Tecnológica</h1>
              
              <div class="grid">
                <div class="card">
                  <div class="meta-label">Empresa</div>
                  <div class="meta-value">${company}</div>
                  <div style="margin-top: 8px;" class="meta-label">Industria</div>
                  <div class="meta-value">${industry}</div>
                </div>
                <div class="card">
                  <div class="meta-label">Maturidad Digital</div>
                  <div class="meta-value" style="color: #00b4d8;">${maturity.level}</div>
                  <div style="margin-top: 8px;" class="meta-label">Puntaje</div>
                  <div class="meta-value">${maturity.scoreText}</div>
                </div>
              </div>
              
              <h2>Diagnóstico Conceptual</h2>
              <p><strong>${maturity.tagline}</strong></p>
              <p>${maturity.summary}</p>
              
              <h2>Prioridad de Acción Recomendada por OptiTec</h2>
              <div class="recommendation">
                <p><strong>Hoja de Ruta Estratégica Sugerida:</strong></p>
                <p>${maturity.actionRequired}</p>
              </div>
              
              <h2>Siguientes Pasos</h2>
              <ul>
                <li><strong>Paso 1: Auditoría de Alineación</strong> - Validar estas respuestas con una videollamada gratuita orientativa (30 minutos) con nuestros expertos en estrategia náutica y metalúrgica digital.</li>
                <li><strong>Paso 2: Presentación de Casos Relacionados</strong> - Compartir el plan de ejecución específico aplicado en casos como el <em>Astillero Regnicoli</em>.</li>
                <li><strong>Paso 3: Estimación de Presupuesto Inicial</strong> - Modelado del ROI esperado para la integración de plataformas centralizadas sólidas.</li>
              </ul>
              
              <p style="margin-top: 40px; text-align: center;">
                <button onclick="window.print()" style="background-color: #0b1e42; color: white; border: none; padding: 12px 24px; font-size: 16px; font-weight: bold; border-radius: 4px; cursor: pointer;">Imprimir o Guardar como PDF</button>
              </p>
              
              <div class="footer">
                Este informe ejecutivo fue generado automáticamente el ${new Date().toLocaleDateString("es-AR")} por el sistema de diagnóstico inteligente de OptiTec Digital Transformation © 2026.
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        setIsDownloadError(true);
      }
    } catch (e) {
      console.warn("Popup blocked in iframe, setting error fallback.", e);
      setIsDownloadError(true);
    }
  };

  const copyToClipboard = () => {
    const text = `Socio: ${name}\nEmpresa: ${company}\nMadurez Digital: ${maturity.level}\nDiagnóstico: ${maturity.summary}\nRecomendación: ${maturity.actionRequired}`;
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="assessment-modal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Progress Bar (Visible in Questions) */}
              {step === "questions" && (
                <div className="absolute top-0 left-0 w-full bg-slate-100 h-1.5Packed">
                  <div 
                    className="bg-opti-cyan h-1.5 transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              )}

              {/* STAGE: INTRO */}
              {step === "intro" && (
                <div className="p-8 md:p-10 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-opti-cyan/10 text-opti-cyan">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-opti-blue tracking-tight">
                    Autodiagnóstico de Madurez Digital
                  </h3>
                  <p className="mt-3 text-slate-600 max-w-md mx-auto">
                    Descubrí en menos de 3 minutos las brechas tecnológicas operativas que frenan el crecimiento de tu empresa tradicional. Obtendrás una hoja de ruta estratégica inmediata inspirada en éxitos de consultoría industrial.
                  </p>

                  <div className="mt-8 space-y-3 text-left max-w-sm mx-auto bg-opti-slate p-4 rounded-xl border border-slate-100">
                    <h4 className="font-semibold text-xs text-opti-blue tracking-wider uppercase">Lo que vas a recibir:</h4>
                    <div className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Clasificación exacta de nivel tecnológico de tu empresa (Escala 1 a 4).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Análisis personalizado de cuellos de botella en comunicación y CRM.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Hoja de ruta recomendada por consultores de OptiTec.</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => setStep("questions")}
                      className="glow-btn inline-flex items-center gap-2 rounded-xl bg-opti-cyan px-7 py-3 font-semibold text-white shadow-lg shadow-opti-cyan/20 hover:bg-opti-blue transition duration-300"
                    >
                      Comenzar Diagnóstico Gratis
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE: QUESTIONS */}
              {step === "questions" && (
                <div className="p-8 md:p-10 pt-12">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-xs font-semibold text-opti-cyan tracking-wider uppercase">
                      Pregunta {currentIdx + 1} de {ASSESSMENT_QUESTIONS.length}
                    </span>
                    <span className="text-xs text-slate-400">
                      Progreso: {Math.round(((currentIdx + 1) / ASSESSMENT_QUESTIONS.length) * 100)}%
                    </span>
                  </div>

                  {/* Question Slide */}
                  <h3 className="font-display text-xl font-bold text-opti-blue leading-snug">
                    {ASSESSMENT_QUESTIONS[currentIdx].question}
                  </h3>

                  <div className="mt-6 space-y-3">
                    {ASSESSMENT_QUESTIONS[currentIdx].options.map((option, index) => {
                      const questionId = ASSESSMENT_QUESTIONS[currentIdx].id;
                      const isSelected = answers[questionId] === option.score;

                      return (
                        <button
                          key={index}
                          onClick={() => handleSelectOption(questionId, option.score)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                            isSelected
                              ? "bg-opti-cyan/10 border-opti-cyan ring-1 ring-opti-cyan font-medium text-opti-blue"
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex gap-3">
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                              isSelected 
                                ? "bg-opti-cyan border-opti-cyan text-white" 
                                : "border-slate-300 text-slate-400 bg-white"
                            }`}>
                              {isSelected ? "✓" : String.fromCharCode(65 + index)}
                            </span>
                            <div>
                              <p className="text-sm md:text-base leading-tight">{option.text}</p>
                              {isSelected && (
                                <p className="mt-1.5 text-xs text-opti-cyan font-medium flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" /> {option.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Nav Buttons */}
                  <div className="mt-8 flex justify-between items-center pt-4 border-t border-slate-100">
                    <button
                      onClick={handlePrevQuestion}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Atrás
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      disabled={!answers[ASSESSMENT_QUESTIONS[currentIdx].id]}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-opti-blue font-semibold text-white hover:bg-opti-cyan disabled:opacity-40 disabled:pointer-events-none transition duration-200 shadow-md shadow-opti-blue/10"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE: LEAD SUBMISSION */}
              {step === "lead" && (
                <div className="p-8 md:p-10">
                  <h3 className="font-display text-2xl font-bold text-opti-blue text-center">
                    ¡Diagnóstico Computado!
                  </h3>
                  <p className="mt-2 text-slate-500 text-center text-sm max-w-md mx-auto">
                    Por favor, completá los siguientes datos de tu compañía para generar el reporte de madurez personalizado y desbloquear tu hoja de ruta.
                  </p>

                  {validationError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitLead} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Tu Nombre completo *</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <User className="h-4 w-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none focus:ring-1 focus:ring-opti-cyan transition"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Email corporativo *</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Mail className="h-4 w-4" />
                          </span>
                          <input
                            type="email"
                            required
                            placeholder="jperez@empresa.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none focus:ring-1 focus:ring-opti-cyan transition"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Company */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Razón social / Empresa *</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Building2 className="h-4 w-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Industrias Regnicoli S.A."
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none focus:ring-1 focus:ring-opti-cyan transition"
                          />
                        </div>
                      </div>

                      {/* Industry */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Sector o Industria *</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Briefcase className="h-4 w-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Astillero, Metalúrgica, Comercio"
                            value={industry}
                            onChange={e => setIndustry(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none focus:ring-1 focus:ring-opti-cyan transition"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Company Size */}
                      <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Personal</label>
                        <select
                          value={companySize}
                          onChange={e => setCompanySize(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none focus:ring-1 focus:ring-opti-cyan bg-white transition"
                        >
                          <option>1-9 empleados</option>
                          <option>10-50 empleados</option>
                          <option>51-200 empleados</option>
                          <option>Más de 200</option>
                        </select>
                      </div>

                      {/* Top Challenge */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Mayor obstáculo actual (opcional)</label>
                        <input
                          type="text"
                          placeholder="Ej. Planillas manuales, falta de sincronismo comercial..."
                          value={challenge}
                          onChange={e => setChallenge(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-opti-cyan focus:outline-none focus:ring-1 focus:ring-opti-cyan transition"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2">
                      <Lock className="h-3 w-3 text-emerald-600" />
                      <span>Cumplimos con estrictas normas de resguardo de datos. Tu información nunca será pública.</span>
                    </div>

                    <div className="mt-8 flex justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep("questions")}
                        className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition"
                      >
                        Revisar respuestas
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-xl bg-opti-cyan px-6 py-2.5 font-semibold text-white shadow-lg shadow-opti-cyan/20 hover:bg-opti-blue transition duration-200 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Procesando Diagnóstico...
                          </>
                        ) : (
                          <>
                            Ver Reporte & Hoja de Ruta
                            <Sparkles className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STAGE: REPORT RESULT */}
              {step === "result" && (
                <div className="max-h-[85vh] overflow-y-auto">
                  <div className="bg-opti-blue p-8 text-white relative">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-opti-cyan/20 text-opti-cyan mb-3">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-center">
                      Diagnóstico de Madurez Exitoso
                    </h3>
                    <p className="text-center text-xs text-slate-300 mt-1 uppercase tracking-wider">
                      Generado para {company} • Sector: {industry}
                    </p>

                    {/* Result score badge */}
                    <div className="mt-5 mx-auto max-w-sm border border-opti-cyan/20 bg-white/5 rounded-xl p-4 text-center">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-opti-cyan font-bold">Nivel Asignado</span>
                      <h4 className="text-lg font-bold text-white mt-0.5">{maturity.level}</h4>
                      <div className="mt-2 text-xs font-mono inline-block px-3 py-1 bg-white/10 rounded-full font-bold text-white">
                        Puntaje total: {maturity.scoreText}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-opti-blue text-base border-b border-slate-100 pb-2 flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-opti-cyan" />
                        Resumen del Estado Tecnológico
                      </h4>
                      <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                        {maturity.summary}
                      </p>
                    </div>

                    <div className="bg-opti-slate p-5 rounded-xl border border-slate-200/60">
                      <h4 className="font-display font-semibold text-opti-blue text-sm uppercase tracking-wider flex items-center gap-1.5 text-sky-700">
                        <Sparkles className="h-4 w-4" />
                        Hoja de Ruta Estratégica Sugerida
                      </h4>
                      <p className="mt-2 text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
                        {maturity.actionRequired}
                      </p>
                    </div>

                    {/* Simulation action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                      <button
                        onClick={handleSimulateDownload}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-opti-cyan px-5 py-3 font-semibold text-white hover:bg-opti-blue shadow-lg shadow-opti-cyan/15 transition duration-200"
                      >
                        <Download className="h-4 w-4" />
                        {customReportDownloaded ? "Abrir Nuevamente PDF" : "Imprimir / Guardar como PDF"}
                      </button>

                      <button
                        onClick={copyToClipboard}
                        className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm transition text-center"
                      >
                        {hasCopied ? "✓ Copiado en Portapapeles" : "Copiar Diagnóstico Ejecutivo"}
                      </button>
                    </div>

                    {isDownloadError ? (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-5 shrink-0 text-amber-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-amber-950">¿No se abrió el reporte?</p>
                            <p className="mt-0.5 text-slate-600">Algunos navegadores bloquean ventanas emergentes (pop-ups) en entornos embebidos. Descargá el reporte directamente para evitar restricciones:</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={triggerHTMLDownload}
                          className="w-full inline-flex items-center justify-center gap-2 bg-opti-cyan hover:bg-opti-blue text-white font-semibold py-2 px-4 rounded-lg transition text-xs"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Descargar Reporte Directo (HTML para guardar como PDF)
                        </button>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 text-center bg-slate-50 border border-slate-150 p-2.5 rounded-lg flex items-center justify-center gap-1.5 leading-snug">
                        <span>¿Problemas de descarga? Obtené la</span>
                        <button onClick={triggerHTMLDownload} className="text-opti-cyan underline font-semibold hover:text-opti-blue cursor-pointer">
                          descarga directa aquí
                        </button>
                      </div>
                    )}

                    <div className="text-center pt-2">
                      <button
                        onClick={resetAll}
                        className="text-xs font-medium text-opti-cyan hover:underline"
                      >
                        Volver a realizar test
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
