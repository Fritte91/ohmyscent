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

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-paper/20 text-xs font-bold opacity-40">
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

