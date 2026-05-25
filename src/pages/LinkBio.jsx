import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle, ArrowUpRight, MapPin, Images } from 'lucide-react';
import { siteConfig } from '../siteConfig';

const resolveHref = (link) => {
  if (link.href === 'whatsapp') {
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent('Olá! Vim pelo link da bio.')}`;
  }
  if (link.href === 'instagram') {
    return siteConfig.contact.social.instagram;
  }
  return link.href;
};

const PinterestIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.004 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const socials = [
  { icon: Instagram, href: siteConfig.contact.social.instagram, label: 'Instagram' },
  { icon: PinterestIcon, href: siteConfig.contact.social.pinterest, label: 'Pinterest' },
  { icon: MessageCircle, href: siteConfig.contact.social.whatsapp, label: 'WhatsApp' },
  { icon: Mail, href: siteConfig.contact.social.email, label: 'E-mail' },
];

const linkIcons = {
  portfolio: Images,
  orcamento: MessageCircle,
  endereco: MapPin,
};

const LinkBio = () => {
  useEffect(() => {
    document.title = `${siteConfig.brand.name} | Links`;
    document.documentElement.style.setProperty('--color-primary', siteConfig.colors.primary);
    return () => {
      document.title = `${siteConfig.brand.name} | Móveis Planejados`;
    };
  }, []);

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-4 sm:p-6 bg-[#b8b8b8]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9a9a9a] via-[#c4c4c4] to-[#a8a8a8] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(200,35,44,0.15),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[400px]"
      >
        <div className="rounded-[1.75rem] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)]">
          {/* Perfil */}
          <div className="bg-white px-6 pt-8 pb-6 text-center">
            <img
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.name}
              className="h-12 mx-auto mb-4"
            />
            <h1 className="font-display text-xl font-semibold uppercase tracking-wide text-[#1a1a1a] mb-3">
              {siteConfig.brand.name}
            </h1>
            <div className="space-y-1 mb-5">
              {siteConfig.linkBio.bio.map((line) => (
                <p key={line} className="text-[13px] text-[#5c5c5c] leading-snug">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex justify-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] text-white flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-200"
                >
                  <Icon size={17} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-[#e8e8e8] px-4 py-5 sm:px-5 sm:py-6 space-y-3">
            <div className="rounded-xl bg-white p-4 border-2 border-primary shadow-sm">
              <img
                src={siteConfig.linkBio.featuredLogo}
                alt={siteConfig.brand.shortName}
                className="w-full max-h-28 object-contain mx-auto"
              />
              <p className="text-center font-display text-[11px] uppercase tracking-[0.2em] text-[#888] mt-3">
                {siteConfig.brand.tagline}
              </p>
            </div>

            {siteConfig.linkBio.links.map((link, i) => {
              const href = resolveHref(link);
              const Icon = linkIcons[link.id] || ArrowUpRight;
              const className =
                'group flex items-center justify-between w-full px-5 py-3.5 bg-primary text-white rounded-xl font-display font-semibold text-sm uppercase tracking-wide shadow-md shadow-primary/25 hover:brightness-110 transition-all';
              const motionProps = {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.15 + i * 0.08 },
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
              };
              const content = (
                <>
                  <span className="flex items-center gap-2.5">
                    <Icon size={16} className="opacity-80" />
                    {link.label}
                  </span>
                  <ArrowUpRight size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </>
              );

              if (link.internal) {
                const hash = link.href.includes('#') ? link.href.split('#')[1] : link.href;
                return (
                  <motion.div key={link.id} {...motionProps}>
                    <Link to={{ pathname: '/', hash: `#${hash}` }} className={className}>
                      {content}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.a
                  key={link.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...motionProps}
                  className={className}
                >
                  {content}
                </motion.a>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Link
            to={siteConfig.linkBio.siteLink.href}
            className="mt-5 flex items-center justify-center gap-1.5 w-full py-3 rounded-full bg-white/90 text-[#333] font-display text-[11px] font-semibold uppercase tracking-wider border border-white/50 shadow-sm hover:bg-white transition-colors"
          >
            {siteConfig.linkBio.siteLink.label}
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        <p className="text-center text-[10px] text-white/50 mt-4 font-medium">
          © {new Date().getFullYear()} {siteConfig.brand.shortName}
        </p>
      </motion.div>
    </div>
  );
};

export default LinkBio;
