import footerData from "../data/footerData.jsx";
import Tippy from '@tippyjs/react';
import Swal from 'sweetalert2'

const Footer = () => {
  return (
    <footer className="bg-app text-[var(--text)] py-8">
      {/* Top gradient divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)] opacity-60 mb-4"></div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Brand */}
        <div>
          <h3 className="flex items-center text-2xl font-bold mb-1 gap-2">
            <i className={`${footerData.brand.icon} text-[var(--text)] text-xl`}></i>
            <span className="gradient-text">{footerData.brand.name}</span>
          </h3>
          <p className="text-sm text-muted">
            {footerData.brand.description}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <i className={`${footerData.navigationIcon} text-base`}></i>
            <span className="gradient-text">Navigation</span>
          </h4>
          <ul className="flex flex-col gap-2 text-sm">
            {footerData.navigation.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="hover:text-[var(--primary)] transition">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <i className={`${footerData.socialsIcon} text-base`}></i>
            <span className="gradient-text">Find Me Online</span>
          </h4>
          <ul className="flex flex-wrap gap-3">
            {footerData.socials.map((social, index) => (
              <li key={index}>
                <Tippy content={social.label} placement="top">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-2)] text-white shadow-md hover:scale-110 transition-all ring-1 ring-white/10 hover:ring-[var(--primary)]/40">
                      <i className={`${social.icon} text-xl`} />
                    </div>
                  </a>
                </Tippy>
              </li>
            ))}
          </ul>
        </div>


      </div>

      {/* Divider */}
      <hr className="my-8 border-soft" />

      {/* Bottom Footer */}
      <div className="mt-6 max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--text)] gap-3">
        {/* Legal Links */}
        <div className="flex gap-4 flex-wrap">
          {footerData.legalLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-[var(--primary)] transition"
            >
              {link.label}
            </a>
          ))}
        </div>


        {/* Copyright */}
        <div className="text-center md:text-right">
          {footerData.copyright}
        </div>
      </div>

    </footer>
  );
};

export default Footer;
