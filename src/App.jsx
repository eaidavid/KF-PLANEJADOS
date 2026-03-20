import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, LayoutGrid, Award, ShieldCheck, X, ChevronRight, ChevronLeft, Upload, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-secondary overflow-x-hidden">
      <Navbar onOpenQuote={() => setIsModalOpen(true)} />
      <Hero onOpenQuote={() => setIsModalOpen(true)} />
      <About />
      <Portfolio onOpenQuote={() => setIsModalOpen(true)} />
      <Testimonials />
      <SectionTagline />
      <Footer onOpenQuote={() => setIsModalOpen(true)} />

      <AnimatePresence>
        {isModalOpen && <QuoteModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

const QuoteModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 7;

  const updateData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    // Aqui seria a lógica de envio real
    setIsSubmitted(true);
  };

  const steps = [
    {
      id: 1,
      title: "O que você precisa?",
      subtitle: "Selecione o tipo de móvel planejado",
      field: "tipo",
      options: ["Cozinha planejada", "Guarda-roupa", "Painel de TV", "Escritório / Home office", "Outro"]
    },
    {
      id: 2,
      title: "Onde será instalado?",
      content: (
        <div className="space-y-6">
          <div>
            <p className="text-gray-400 mb-4 text-sm uppercase tracking-widest">Tipo de imóvel</p>
            <div className="grid grid-cols-3 gap-2">
              {["Apartamento", "Casa", "Comercial"].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateData('imovel_tipo', opt)}
                  className={`p-3 text-xs border transition-colors ${formData.imovel_tipo === opt ? 'bg-primary text-black border-primary' : 'border-white/10 hover:border-white/40'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-400 mb-4 text-sm uppercase tracking-widest">Status do imóvel</p>
            <div className="grid grid-cols-2 gap-2">
              {["Pronto", "Ainda em obra"].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateData('imovel_status', opt)}
                  className={`p-3 text-xs border transition-colors ${formData.imovel_status === opt ? 'bg-primary text-black border-primary' : 'border-white/10 hover:border-white/40'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Tamanho e medidas",
      content: (
        <div className="space-y-6">
          <p className="text-gray-400 text-sm italic">Você já possui as medidas do espaço?</p>
          <div className="grid grid-cols-2 gap-4">
            {["Sim", "Não"].map(opt => (
              <button
                key={opt}
                onClick={() => updateData('tem_medidas', opt)}
                className={`p-4 border font-bold transition-colors ${formData.tem_medidas === opt ? 'bg-primary text-black border-primary' : 'border-white/10'}`}
              >
                {opt}
              </button>
            ))}
          </div>
          {formData.tem_medidas === "Sim" && (
            <input
              type="text"
              placeholder="Ex: 3m x 2.5m x 0.6m"
              className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-primary transition-colors text-xl"
              onChange={(e) => updateData('medidas_info', e.target.value)}
            />
          )}
          {formData.tem_medidas === "Não" && (
            <div className="p-4 bg-white/5 border border-primary/20 flex gap-4 items-center">
              <MapPin size={20} className="text-primary" />
              <p className="text-xs uppercase font-bold tracking-widest">Nós faremos a medição no local</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 4,
      title: "Estilo e Acabamento",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            {["Moderno", "Clássico", "Minimalista", "Ainda não sei"].map(opt => (
              <button
                key={opt}
                onClick={() => updateData('estilo', opt)}
                className={`p-3 text-xs border ${formData.estilo === opt ? 'bg-primary text-black' : 'border-white/10'}`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase text-gray-500 mb-2">Padrão de Acabamento</p>
            <div className="grid grid-cols-3 gap-2">
              {["Econômico", "Intermediário", "Alto Padrão"].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateData('acabamento', opt)}
                  className={`p-2 text-[10px] border ${formData.acabamento === opt ? 'bg-primary text-black' : 'border-white/10'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="border-2 border-dashed border-white/10 p-6 text-center cursor-pointer hover:border-primary transition-colors">
            <Upload className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-[10px] uppercase font-bold tracking-widest">Anexar Referência ou Link</p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Faixa de Investimento",
      subtitle: "Isso nos ajuda a sugerir os melhores materiais",
      field: "budget",
      options: ["Até R$ 3.000", "R$ 3.000 a R$ 8.000", "R$ 8.000 a R$ 15.000", "Acima de R$ 15.000", "Prefiro entender primeiro"]
    },
    {
      id: 6,
      title: "Prazo de Entrega",
      field: "prazo",
      options: ["Urgente (até 15 dias)", "Em breve (30 dias)", "Sem pressa"]
    },
    {
      id: 7,
      title: "Estamos quase lá...",
      content: (
        <div className="space-y-4">
          <input type="text" placeholder="Seu Nome" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-primary" onChange={(e) => updateData('nome', e.target.value)} />
          <input type="text" placeholder="Seu WhatsApp" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-primary" onChange={(e) => updateData('whatsapp', e.target.value)} />
          <input type="text" placeholder="Cidade / Bairro" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-primary" onChange={(e) => updateData('local', e.target.value)} />
          <button
            className="w-full py-5 bg-primary text-black font-black uppercase tracking-widest mt-8 hover:bg-white transition-colors"
            onClick={handleSubmit}
          >
            Enviar Solicitação de Luxo
          </button>
        </div>
      )
    }
  ];

  const currentStepData = steps.find(s => s.id === step);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <div className="max-w-xl w-full bg-secondary border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
        )}

        <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-[110]">
          <X size={24} />
        </button>

        <div className="p-12">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <CheckCircle2 size={80} className="mx-auto text-primary mb-8" />
                <h2 className="text-4xl font-serif italic mb-4">Recebemos seu pedido!</h2>
                <p className="text-gray-400 mb-12">Em breve entraremos em contato com você.</p>

                <a
                  href="https://wa.me/5562991009746?text=Recebeu%20meu%20pedido%3F"
                  target="_blank"
                  className="inline-flex items-center gap-4 px-10 py-4 border border-primary text-primary font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-black transition-all"
                >
                  Ir para o Whatsapp <ArrowRight size={14} />
                </a>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px] flex flex-col"
              >
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-2">Passo {step} de {totalSteps}</span>
                <h2 className="text-4xl font-serif italic mb-2">{currentStepData.title}</h2>
                {currentStepData.subtitle && <p className="text-gray-500 text-sm mb-8">{currentStepData.subtitle}</p>}

                <div className="flex-1 mt-8">
                  {currentStepData.options ? (
                    <div className="grid grid-cols-1 gap-3">
                      {currentStepData.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => {
                            updateData(currentStepData.field, opt);
                            nextStep();
                          }}
                          className={`w-full text-left p-5 border transition-all duration-300 group flex justify-between items-center ${formData[currentStepData.field] === opt ? 'bg-primary text-black border-primary' : 'border-white/10 hover:border-white/40'}`}
                        >
                          <span className="font-bold text-xs uppercase tracking-widest">{opt}</span>
                          <ChevronRight size={16} className={formData[currentStepData.field] === opt ? 'text-black' : 'text-primary opacity-0 group-hover:opacity-100 transition-opacity'} />
                        </button>
                      ))}
                    </div>
                  ) : currentStepData.content}
                </div>

                <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${step === 1 ? 'opacity-0' : 'hover:text-primary'}`}
                  >
                    <ChevronLeft size={16} /> Voltar
                  </button>
                  {step < totalSteps && !currentStepData.options && (
                    <button onClick={nextStep} className="flex items-center gap-2 bg-primary text-black px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
                      Próximo <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = ({ onOpenQuote }) => (
  <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
    <div className="flex items-center gap-2">
      <img src="/assets/logo-kf.png" alt="Logo" className="h-10" />
    </div>
    <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase">
      {['Home', 'Sobre', 'Portfólio', 'Contato'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">{item}</a>
      ))}
    </div>
    <button onClick={onOpenQuote} className="px-6 py-3 bg-primary text-black text-xs font-bold tracking-tighter hover:bg-white transition-all duration-500">
      PREÇO SOB CONSULTA
    </button>
  </nav>
);

const Hero = ({ onOpenQuote }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center blur-[6px] scale-105"
        style={{ backgroundImage: "url('/assets/asweb-b0567458e9becbefca45ef6c00b622b30.jpg')" }}
      />

      <div className="relative z-20 text-center px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
          >
            Marcenaria de Alto Padrão
          </motion.span>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="text-6xl md:text-9xl font-serif mb-6 leading-[0.9] italic"
          >
            Exclusividade <br /> Atemporal.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="max-w-xl mx-auto text-gray-400 text-lg mb-12 font-light italic"
          >
            Onde a tradição da marcenaria encontra a sofisticação do design contemporâneo.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <button onClick={onOpenQuote} className="group relative px-12 py-5 bg-primary text-black font-bold text-xs tracking-widest uppercase overflow-hidden">
              <span className="relative z-10">Agendar Consultoria</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <a href="#portfolio" className="text-white text-[10px] uppercase font-bold tracking-widest border-b border-white/20 pb-2 hover:border-primary transition-colors">Portfólio 2026</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="sobre" className="py-24 px-6 md:px-24 bg-white text-black">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div className="relative">
        <img src="/assets/asweb-9fc95c794c35b6f987d609f1abf2396b0.jpg" alt="Marcenaria" className="grayscale hover:grayscale-0 transition-all duration-700" />
        <div className="absolute -bottom-10 -right-10 bg-primary p-12 hidden md:block">
          <h3 className="text-5xl font-serif italic">35</h3>
          <p className="text-xs uppercase font-bold tracking-widest">Anos de História</p>
        </div>
      </div>
      <div className="space-y-8">
        <span className="text-primary font-bold uppercase text-xs tracking-widest">Nossa Essência</span>
        <h2 className="text-5xl font-serif">Móveis 100% MDF <br /> Feitos Para Durar.</h2>
        <p className="text-gray-600 leading-relaxed font-light text-lg">
          Fundada por Kássio Fernando de Souza, a KF Planejados une a maestria da marcenaria tradicional às tendências do design moderno. Nossa parceria com os melhores arquitetos garante resultados que são verdadeiras obras de arte.
        </p>
        <div className="grid grid-cols-2 gap-8 pt-8">
          <div className="flex gap-4 items-start">
            <ShieldCheck className="text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-sm uppercase">Garantia Premium</h4>
              <p className="text-xs text-gray-500">Materiais certificados e duráveis.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Award className="text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-sm uppercase">Excelência</h4>
              <p className="text-xs text-gray-500">Referência no mercado de Goiânia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Portfolio = ({ onOpenQuote }) => {
  const projects = [
    { id: 1, title: 'Cozinha Gourmet', img: '/assets/asweb-20fc625b081546ce6680e515e4aa7d410.jpg', type: 'Moderna', size: 'large' },
    { id: 2, title: 'Living Suave', img: '/assets/asweb-70f1f67c8b12293745b6deb62322b5550.jpg', type: 'Design', size: 'small' },
    { id: 3, title: 'Suíte Luxo', img: '/assets/asweb-67a2df494bf367e5281e4b79fe2515900.jpg', type: 'Private', size: 'small' },
    { id: 4, title: 'Office Design', img: '/assets/asweb-ca17aaea3b8014aac4e882733a915b990.jpg', type: 'Executive', size: 'large' },
    { id: 5, title: 'Área Gourmet', img: '/assets/asweb-0d2895ee9ea3a29c0936034380694c3e0.jpg', type: 'Lazer', size: 'small' },
    { id: 6, title: 'Painel Ripado', img: '/assets/asweb-3f2a0385eb24e988702ca3ea38214a2c0.jpg', type: 'Detalhe', size: 'small' },
  ];

  return (
    <section id="portfolio" className="py-24 bg-secondary">
      <div className="px-6 mb-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <span className="text-primary font-bold uppercase text-xs tracking-[0.5em]">The Signature Collection</span>
          <h2 className="text-6xl font-serif mt-4 italic">Obras Primas</h2>
        </div>
        <p className="max-w-xs text-gray-500 text-sm font-light">Uma seleção curada de nossos projetos mais emblemáticos, onde a forma encontra a função em perfeita harmonia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 max-w-[1600px] mx-auto">
        {projects.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`group relative overflow-hidden ${p.size === 'large' ? 'md:col-span-8 aspect-video' : 'md:col-span-4 aspect-[3/4]'}`}
          >
            <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
              <span className="text-[10px] text-primary font-bold mb-2 uppercase tracking-[0.3em]">{p.type}</span>
              <h3 className="text-3xl font-serif italic">{p.title}</h3>
              <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-500">
                <button onClick={onOpenQuote} className="flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-white/70">Solicitar Projeto Similar <ArrowRight size={12} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 px-6 bg-[#0a0a0a]">
    <div className="max-w-4xl mx-auto text-center space-y-12">
      <span className="text-primary font-bold uppercase text-xs">Vozes do Sucesso</span>
      <div className="relative">
        <span className="absolute -top-10 -left-10 text-9xl text-white/5 font-serif font-black">"</span>
        <p className="text-3xl md:text-4xl font-serif italic leading-relaxed">
          "Contratar a KF foi a melhor decisão que tomei. Os profissionais são realmente experientes e dedicados, e isso refletiu no resultado final."
        </p>
      </div>
      <div>
        <h4 className="text-lg font-bold">Marina S.</h4>
        <p className="text-xs text-gray-500 uppercase tracking-widest">Goiânia - GO</p>
      </div>
    </div>
  </section>
);

const SectionTagline = () => (
  <div className="py-20 bg-primary flex items-center justify-center overflow-hidden relative">
    <div className="flex gap-20 animate-marquee whitespace-nowrap">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className="text-4xl md:text-6xl font-serif font-black uppercase text-black italic">Móveis 100% MDF • Projetos Autorais • Qualidade Heritage •</span>
      ))}
    </div>
  </div>
);

const Footer = ({ onOpenQuote }) => (
  <footer id="contato" className="bg-[#050505] pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
      <div className="md:col-span-2 space-y-8">
        <img src="/assets/logo-rodape.png" alt="Logo" className="h-16" />
        <p className="text-gray-500 max-w-sm font-light">
          Kassio Fernando de Souza - Elevando o padrão de marcenaria brasileira com design autoral e paixão pelo artesanal.
        </p>
        <div className="flex gap-4">
          <a href="#" className="p-3 border border-white/10 hover:border-white transition-colors"><Instagram size={18} /></a>
          <a href="#" className="p-3 border border-white/10 hover:border-white transition-colors"><Facebook size={18} /></a>
        </div>
      </div>
      <div className="space-y-6">
        <h4 className="font-bold flex gap-2 items-center"><MapPin className="text-primary" size={18} /> Visite-nos</h4>
        <p className="text-gray-500 text-sm leading-loose">
          Avenida França - Ville de France<br />Goiânia / GO - 74.890-711
        </p>
      </div>
      <div className="space-y-6">
        <h4 className="font-bold flex gap-2 items-center"><Phone className="text-primary" size={18} /> Conecte-se</h4>
        <p className="text-gray-500 text-sm">
          (62) 99100-9746 <br />
          contato@kfplanejados.com.br
        </p>
        <button onClick={onOpenQuote} className="flex items-center gap-2 text-xs font-bold text-primary group">Agendar Visita <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></button>
      </div>
    </div>
    <div className="text-center pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-gray-600">
      &copy; 2026 KF Planejados. Crafting Excellence in Wood.
    </div>
  </footer>
);

export default App;
