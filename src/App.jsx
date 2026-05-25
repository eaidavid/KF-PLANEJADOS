import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Menu,
  X,
  ChefHat,
  BedDouble,
  Sofa,
  Briefcase,
} from 'lucide-react';
import { siteConfig } from './siteConfig';
import QuoteModal from './components/QuoteModal';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SectionLabel = ({ children }) => (
  <span className="text-primary font-display font-semibold text-[11px] uppercase tracking-[0.2em]">
    {children}
  </span>
);

const PrimaryButton = ({ children, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`bg-primary text-white font-display font-semibold text-[11px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-md hover:brightness-110 active:scale-[0.98] transition-all ${className}`}
  >
    <span className="flex items-center justify-center gap-1.5">{children}</span>
  </button>
);

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', siteConfig.colors.primary);
    document.documentElement.style.setProperty('--color-secondary', siteConfig.colors.secondary);

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="min-h-screen bg-secondary overflow-x-hidden">
      <Navbar onOpenQuote={() => setIsModalOpen(true)} />
      <Hero onOpenQuote={() => setIsModalOpen(true)} />
      <About />
      <Services onOpenQuote={() => setIsModalOpen(true)} />
      <Portfolio onOpenQuote={() => setIsModalOpen(true)} />
      <Testimonials />
      <CtaBand onOpenQuote={() => setIsModalOpen(true)} />
      <SectionTagline />
      <Footer onOpenQuote={() => setIsModalOpen(true)} />

      <AnimatePresence>
        {isModalOpen && <QuoteModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento para móveis planejados.')}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex items-center gap-1.5 bg-[#25D366] text-white pl-3 pr-3.5 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 rounded-full shadow-lg shadow-[#25D366]/25 hover:scale-105 transition-transform font-display font-semibold text-[10px] uppercase tracking-wider"
        aria-label="WhatsApp"
      >
        <MessageCircle size={18} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </motion.a>
    </div>
  );
};

const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
];

const Navbar = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glass-strong py-2 shadow-md shadow-black/20' : 'py-3 md:py-4 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-3">
          <a href="#home" className="shrink-0">
            <img
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.name}
              className="h-7 sm:h-8 bg-white rounded px-1.5 py-0.5"
            />
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 font-display text-[11px] font-medium uppercase tracking-[0.12em] text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <PrimaryButton onClick={onOpenQuote} className="hidden sm:inline-flex">
              Orçamento
            </PrimaryButton>
            <button
              type="button"
              className="lg:hidden p-2 rounded-md glass text-white"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <button
              type="button"
              className="absolute top-6 right-6 p-2 text-white/60"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-display font-semibold uppercase tracking-[0.15em] hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <PrimaryButton
                onClick={() => {
                  setMenuOpen(false);
                  onOpenQuote();
                }}
                className="mt-4 w-full max-w-xs justify-center"
              >
                Solicitar Orçamento
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const heroStats = [
  { value: '47+', label: 'Anos' },
  { value: '100%', label: 'Sob medida' },
  { value: 'MDF', label: 'Qualidade' },
  { value: '★', label: 'Acessível' },
];

const Hero = ({ onOpenQuote }) => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col overflow-hidden grain mb-6 sm:mb-10"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${siteConfig.hero.bgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-black/50 to-black/30" />
      </motion.div>

      <div className="orb w-64 h-64 md:w-80 md:h-80 bg-primary/20 -top-20 -right-20" />

      <div className="hidden md:flex absolute top-[42%] right-6 lg:right-10 z-20 font-display text-5xl font-semibold text-primary/25 leading-none pointer-events-none">
        47
      </div>

      {/* Conteúdo na zona central de leitura */}
      <div className="relative z-20 flex-1 flex flex-col min-h-0 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex-1 flex items-center pt-[4.5rem] sm:pt-[5rem] pb-4 min-h-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="w-full max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-display text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-white/50 mb-3 sm:mb-4"
            >
              {siteConfig.hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-[2rem] sm:text-[2.35rem] md:text-[2.75rem] font-semibold uppercase leading-[1.05] text-white mb-5 sm:mb-6"
            >
              {siteConfig.hero.headline}
            </motion.h1>

            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap items-center gap-2 sm:gap-3">
              <PrimaryButton onClick={onOpenQuote}>
                {siteConfig.hero.cta} <ArrowRight size={14} />
              </PrimaryButton>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 font-display text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 hover:text-white border border-white/15 rounded-md hover:border-white/30 transition-colors"
              >
                {siteConfig.hero.portfolioLink}
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Cards no first fold, com respiro acima */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="shrink-0 pt-6 sm:pt-8 pb-5 sm:pb-7 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-3 sm:p-4 text-center">
                <p className="text-xl sm:text-2xl font-display font-semibold text-primary leading-none">
                  {stat.value}
                </p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="sobre" className="section-pad px-4 sm:px-6 relative overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] max-h-[280px] sm:max-h-none lg:max-h-[360px]">
            <img
              src={siteConfig.about.image}
              alt="Nossa fábrica"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-3 right-3 sm:-bottom-4 sm:-right-4 glass-strong rounded-lg px-4 py-3 sm:px-5 sm:py-4"
          >
            <p className="text-3xl sm:text-4xl font-display font-semibold text-primary leading-none">
              {siteConfig.about.stats.value}
            </p>
            <p className="text-[9px] uppercase tracking-wider text-white/50 mt-1">
              {siteConfig.about.stats.label}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-4 sm:space-y-5"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{siteConfig.about.tagline}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-display font-semibold uppercase leading-tight mt-2"
            dangerouslySetInnerHTML={{ __html: siteConfig.about.title.replace(/<br \/>/g, '<br/>') }}
          />
          <motion.p variants={fadeUp} className="text-white/50 text-sm sm:text-[15px] leading-relaxed">
            {siteConfig.about.description}
          </motion.p>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-2 sm:gap-3 pt-2">
            {siteConfig.about.features.map((f) => (
              <div key={f.title} className="glass rounded-lg p-3 sm:p-4 flex gap-3 items-start">
                <ShieldCheck className="text-primary shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wide mb-0.5">{f.title}</h4>
                  <p className="text-[11px] text-white/45 leading-snug">{f.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const serviceIcons = { kitchen: ChefHat, bed: BedDouble, sofa: Sofa, desk: Briefcase };

const Services = ({ onOpenQuote }) => (
  <section id="servicos" className="section-pad px-4 sm:px-6 bg-[#0f0f0f]">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10"
      >
        <div>
          <SectionLabel>Serviços</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold uppercase mt-2">O que fazemos</h2>
        </div>
        <p className="text-white/40 text-xs sm:text-sm max-w-xs">Móveis planejados para cada ambiente.</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {siteConfig.services.map((service, idx) => {
          const Icon = serviceIcons[service.icon] || Sparkles;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group glass rounded-lg p-3 sm:p-5 card-shine"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-primary/15 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary transition-colors">
                <Icon size={18} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-sm sm:text-base font-semibold uppercase leading-tight mb-1.5">
                {service.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-white/40 leading-snug hidden sm:block">{service.description}</p>
              <button
                type="button"
                onClick={onOpenQuote}
                className="mt-2 sm:mt-3 text-[9px] font-display font-semibold uppercase tracking-wider text-primary sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              >
                Orçar →
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const Portfolio = ({ onOpenQuote }) => (
  <section id="portfolio" className="section-pad relative overflow-hidden">
    <div className="px-4 sm:px-6 mb-8 sm:mb-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2"
      >
        <div>
          <SectionLabel>{siteConfig.portfolio.tagline}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold uppercase mt-2">
            {siteConfig.portfolio.title}
          </h2>
        </div>
        <p className="text-white/40 text-xs sm:text-sm max-w-xs">{siteConfig.portfolio.description}</p>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2 sm:gap-3 px-4 sm:px-6 max-w-6xl mx-auto">
      {siteConfig.portfolio.projects.map((p, idx) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: idx * 0.1 }}
          className={`group relative overflow-hidden rounded-lg sm:rounded-xl ${
            p.size === 'large'
              ? 'sm:col-span-2 md:col-span-8 aspect-[16/9] sm:aspect-[2/1]'
              : 'md:col-span-4 aspect-[4/3] md:aspect-[3/4]'
          }`}
        >
          <img
            src={p.img}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
          <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {p.type}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
            <h3 className="text-base sm:text-xl font-display font-semibold uppercase">{p.title}</h3>
            <button
              type="button"
              onClick={onOpenQuote}
              className="mt-1 flex items-center gap-1 text-[9px] font-display uppercase tracking-wider text-white/50 hover:text-primary sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            >
              Similar <ArrowRight size={10} />
            </button>
          </div>
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg sm:rounded-xl pointer-events-none" />
        </motion.article>
      ))}
    </div>
  </section>
);

const Testimonials = () => {
  const testimonial = siteConfig.testimonials[0];
  return (
    <section className="section-pad px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto glass rounded-xl p-6 sm:p-10 text-center"
      >
        <p className="text-sm sm:text-lg font-display font-medium leading-relaxed text-white/85 mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="text-[10px] uppercase tracking-wider text-white/40">{testimonial.author}</p>
        <a
          href={siteConfig.contact.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-5 text-[10px] font-display font-semibold uppercase tracking-wider text-primary hover:text-white transition-colors"
        >
          Instagram <ExternalLink size={12} />
        </a>
      </motion.div>
    </section>
  );
};

const CtaBand = ({ onOpenQuote }) => (
  <section className="px-4 sm:px-6 pb-4 sm:pb-6">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto relative rounded-xl overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${siteConfig.portfolio.projects[0].img}')` }}
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 px-5 sm:px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-semibold uppercase leading-tight mb-1">
            Transforme seu espaço
          </h2>
          <p className="text-white/80 text-xs sm:text-sm">Orçamento em poucos passos.</p>
        </div>
        <PrimaryButton onClick={onOpenQuote} className="!bg-white !text-primary shrink-0 w-full sm:w-auto justify-center">
          Começar <ArrowRight size={14} />
        </PrimaryButton>
      </div>
    </motion.div>
  </section>
);

const SectionTagline = () => {
  const text = siteConfig.marquee.join(' ◆ ') + ' ◆ ';
  return (
    <div className="py-8 border-y border-white/5 overflow-hidden bg-[#0a0a0a]">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="text-lg sm:text-2xl font-display font-semibold uppercase tracking-wider text-white/12">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

const Footer = ({ onOpenQuote }) => (
  <footer id="contato" className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6 border-t border-white/5">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 mb-12">
        <div className="sm:col-span-2 md:col-span-5 space-y-4">
          <img
            src={siteConfig.brand.logoFooter}
            alt={siteConfig.brand.name}
            className="h-11 sm:h-12 bg-white rounded-lg px-2 py-1"
          />
          <p className="text-white/40 max-w-sm text-xs sm:text-sm leading-relaxed">
            {siteConfig.brand.shortName} {siteConfig.brand.tagline} — 47 anos de móveis planejados.
          </p>
          <div className="flex gap-2">
            {[
              { href: siteConfig.contact.social.instagram, icon: Instagram, label: 'Instagram' },
              { href: siteConfig.contact.social.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
              { href: siteConfig.contact.social.email, icon: Mail, label: 'E-mail' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-md glass hover:text-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h4 className="font-display text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="text-primary" size={14} /> Endereço
          </h4>
          <p className="text-white/40 text-xs leading-relaxed">{siteConfig.contact.address}</p>
        </div>

        <div className="md:col-span-4 space-y-3">
          <h4 className="font-display text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="text-primary" size={14} /> Contato
          </h4>
          <p className="text-white/40 text-xs">
            {siteConfig.contact.phone}
            <br />
            {siteConfig.contact.email}
          </p>
          <button
            type="button"
            onClick={onOpenQuote}
            className="inline-flex items-center gap-1.5 text-[10px] font-display font-semibold text-primary uppercase tracking-wider group"
          >
            Orçamento
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] uppercase tracking-wider text-white/25">
        <span>&copy; {new Date().getFullYear()} {siteConfig.brand.name}</span>
        <span>móveis planejados · desde 1979</span>
      </div>
    </div>
  </footer>
);

export default App;
