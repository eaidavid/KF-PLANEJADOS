import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  X,
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '../siteConfig';

const QuoteModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 7;

  const updateData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => setIsSubmitted(true);

  const optionBtn = (active) =>
    `p-3.5 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all duration-300 ${
      active
        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-[1.02]'
        : 'border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10'
    }`;

  const steps = [
    {
      id: 1,
      title: 'O que você precisa?',
      subtitle: 'Selecione o tipo de móvel planejado',
      field: 'tipo',
      options: [
        'Cozinha planejada',
        'Guarda-roupa',
        'Painel de TV',
        'Escritório / Home office',
        'Outro',
      ],
    },
    {
      id: 2,
      title: 'Onde será instalado?',
      content: (
        <div className="space-y-6">
          <div>
            <p className="text-white/40 mb-3 text-[10px] uppercase tracking-[0.25em]">
              Tipo de imóvel
            </p>
            <div className="grid grid-cols-3 gap-2">
              {['Apartamento', 'Casa', 'Comercial'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateData('imovel_tipo', opt)}
                  className={optionBtn(formData.imovel_tipo === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/40 mb-3 text-[10px] uppercase tracking-[0.25em]">
              Status do imóvel
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Pronto', 'Ainda em obra'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateData('imovel_status', opt)}
                  className={optionBtn(formData.imovel_status === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Tamanho e medidas',
      content: (
        <div className="space-y-6">
          <p className="text-white/50 text-sm">Você já possui as medidas do espaço?</p>
          <div className="grid grid-cols-2 gap-3">
            {['Sim', 'Não'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateData('tem_medidas', opt)}
                className={optionBtn(formData.tem_medidas === opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          {formData.tem_medidas === 'Sim' && (
            <input
              type="text"
              placeholder="Ex: 3m x 2.5m x 0.6m"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={(e) => updateData('medidas_info', e.target.value)}
            />
          )}
          {formData.tem_medidas === 'Não' && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl flex gap-4 items-center">
              <MapPin size={20} className="text-primary shrink-0" />
              <p className="text-xs uppercase font-bold tracking-widest text-white/80">
                Nós faremos a medição no local
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 4,
      title: 'Estilo e Acabamento',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            {['Moderno', 'Clássico', 'Minimalista', 'Ainda não sei'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateData('estilo', opt)}
                className={optionBtn(formData.estilo === opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div>
            <p className="text-[10px] uppercase text-white/40 mb-2 tracking-widest">
              Padrão de Acabamento
            </p>
            <div className="grid grid-cols-3 gap-2">
              {['Econômico', 'Intermediário', 'Alto Padrão'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateData('acabamento', opt)}
                  className={optionBtn(formData.acabamento === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="border-2 border-dashed border-white/15 rounded-xl p-6 text-center cursor-pointer hover:border-primary/60 hover:bg-white/5 transition-all">
            <Upload className="mx-auto mb-2 text-white/40" size={24} />
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/50">
              Anexar Referência ou Link
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Faixa de Investimento',
      subtitle: 'Isso nos ajuda a sugerir os melhores materiais',
      field: 'budget',
      options: [
        'Até R$ 3.000',
        'R$ 3.000 a R$ 8.000',
        'R$ 8.000 a R$ 15.000',
        'Acima de R$ 15.000',
        'Prefiro entender primeiro',
      ],
    },
    {
      id: 6,
      title: 'Prazo de Entrega',
      field: 'prazo',
      options: ['Urgente (até 15 dias)', 'Em breve (30 dias)', 'Sem pressa'],
    },
    {
      id: 7,
      title: siteConfig.modal.finalTitle,
      content: (
        <div className="space-y-4">
          {['nome', 'whatsapp', 'local'].map((field, i) => (
            <input
              key={field}
              type="text"
              placeholder={['Seu Nome', 'Seu WhatsApp', 'Cidade / Bairro'][i]}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-white/30"
              onChange={(e) => updateData(field, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="w-full py-4 mt-4 bg-primary text-white font-bold uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={handleSubmit}
          >
            {siteConfig.modal.submitLabel}
          </button>
        </div>
      ),
    },
  ];

  const currentStepData = steps.find((s) => s.id === step);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative max-w-md w-full max-h-[88vh] overflow-y-auto rounded-xl border border-white/10 bg-[#141414]/95 shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {!isSubmitted && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 rounded-t-3xl overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-red-400 to-primary bg-[length:200%_100%] animate-shimmer-bar"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}

        <div className="p-5 sm:p-7">
          {!isSubmitted && (
            <div className="flex gap-1.5 mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i + 1 <= step ? 'bg-primary' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                >
                  <CheckCircle2 size={72} className="mx-auto text-primary mb-6" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                  {siteConfig.modal.successTitle}
                </h2>
                <p className="text-white/50 mb-10">{siteConfig.modal.successSubtitle}</p>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.modal.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase text-xs tracking-widest rounded-full hover:shadow-lg hover:shadow-primary/40 transition-all"
                >
                  Falar no WhatsApp <ArrowRight size={14} />
                </a>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="min-h-[300px] sm:min-h-[320px] flex flex-col pt-2"
              >
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.35em] mb-2">
                  Passo {step} de {totalSteps}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-semibold uppercase mb-1 pr-8">
                  {currentStepData.title}
                </h2>
                {currentStepData.subtitle && (
                  <p className="text-white/45 text-sm mb-6">{currentStepData.subtitle}</p>
                )}

                <div className="flex-1 mt-4">
                  {currentStepData.options ? (
                    <div className="grid grid-cols-1 gap-2.5">
                      {currentStepData.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            updateData(currentStepData.field, opt);
                            nextStep();
                          }}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group flex justify-between items-center ${
                            formData[currentStepData.field] === opt
                              ? 'bg-primary/20 border-primary text-white'
                              : 'border-white/10 bg-white/5 hover:border-primary/40 hover:pl-5'
                          }`}
                        >
                          <span className="font-semibold text-xs uppercase tracking-wider">
                            {opt}
                          </span>
                          <ChevronRight
                            size={16}
                            className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    currentStepData.content
                  )}
                </div>

                <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest rounded-lg px-3 py-2 ${
                      step === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-primary hover:bg-white/5'
                    }`}
                  >
                    <ChevronLeft size={16} /> Voltar
                  </button>
                  {step < totalSteps && !currentStepData.options && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
                    >
                      Próximo <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuoteModal;
