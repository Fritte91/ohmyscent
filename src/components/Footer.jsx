import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink text-paper pt-16 pb-8 border-t-2 border-ink relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-display tracking-tighter flex items-center gap-1 mb-4">
              OH MY <span className="text-transparent text-outline-acid">SCENT!</span>
            </Link>
            <p className="text-sm opacity-60 max-w-[220px] mb-4">{t('footer.tagline')}</p>
            <div className="flex gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mastercard_2019_logo.svg/200px-Mastercard_2019_logo.svg.png" className="h-6 bg-white rounded p-1" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" className="h-6 bg-white rounded p-1" alt="Visa" />
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-acid mb-4">{t('footer.shop.title')}</h4>
            <ul className="space-y-2 text-sm font-medium opacity-80">
              <li><Link to="/" className="hover:text-acid">{t('footer.shop.newArrivals')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.shop.mensCologne')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.shop.womensPerfume')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.shop.unisex')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.shop.discoverySets')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-acid mb-4">{t('footer.help.title')}</h4>
            <ul className="space-y-2 text-sm font-medium opacity-80">
              <li><Link to="/" className="hover:text-acid">{t('footer.help.trackOrder')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.help.shippingInfo')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.help.returns')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.help.contact')}</Link></li>
              <li><Link to="/" className="hover:text-acid">{t('footer.help.faq')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-acid mb-4">{t('footer.follow.title')}</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="bg-paper text-ink p-2 rounded-lg hover:bg-acid transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="bg-paper text-ink p-2 rounded-lg hover:bg-acid transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="bg-paper text-ink p-2 rounded-lg hover:bg-acid transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
            <p className="text-xs opacity-50">{t('footer.follow.lineId')}</p>
          </div>
        </div>

        {/* Partnership Section */}
        <div className="pt-8 border-t border-paper/20 mb-6">
          <a 
            href="https://bkkboost.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 group"
            aria-label="Visit Bangkok Boost Studios website"
          >
            <span className="text-xs font-bold opacity-50 uppercase tracking-wider text-center md:text-left">
              Managed & distributed by
            </span>
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-paper/10 hover:border-acid/50 hover:bg-paper/5 transition-all">
              <img 
                src="/11.png" 
                alt="Bangkok Boost Studios Logo" 
                className="h-8 md:h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-display text-lg md:text-xl text-acid font-bold group-hover:text-paper transition-colors">
                Bangkok Boost Studios
              </span>
            </div>
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-paper/20 text-xs font-bold opacity-40">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/">{t('footer.privacy')}</Link>
            <Link to="/">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

