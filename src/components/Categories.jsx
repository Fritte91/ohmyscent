import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sun, PackageOpen } from 'lucide-react';

const Categories = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-orange font-bold text-xs tracking-widest uppercase mb-2 block">{t('categories.sectionTitle')}</span>
          <h2 className="font-display text-4xl md:text-5xl tracking-tighter text-ink uppercase whitespace-pre-line">{t('categories.heading')}</h2>
        </div>
        <Link to="/shop" className="hidden md:flex items-center gap-2 font-bold hover:text-acid hover:bg-ink px-4 py-2 rounded-lg border-2 border-transparent hover:border-transparent transition-all">
          {t('categories.viewAllCollections')} <ArrowRight className="w-5 h-5 stroke-[1.5]" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        {/* Large Card */}
        <div className="md:col-span-2 md:row-span-2 relative group rounded-2xl border-2 border-ink overflow-hidden shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-ink">
          <img src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Date Night Killers" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="bg-acid text-ink inline-block self-start px-2 py-1 text-xs font-bold rounded mb-2 border border-ink">{t('categories.trending')}</div>
            <h3 className="text-5xl font-display text-white mb-2 tracking-tighter mix-blend-overlay whitespace-pre-line">{t('categories.dateNightKillers')}</h3>
            <div className="flex justify-between items-end">
              <p className="text-paper max-w-xs font-medium">{t('categories.dateNightDescription')}</p>
              <Link 
                to="/shop?category=men"
                className="bg-paper text-ink rounded-full p-3 hover:bg-acid border-2 border-transparent hover:border-ink transition-colors"
                aria-label={t('categories.viewAllCollections')}
              >
                <ArrowRight className="w-6 h-6 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Small Card 1 */}
        <div className="relative group rounded-2xl border-2 border-ink overflow-hidden shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-paper">
          <div className="absolute inset-0 bg-[radial-gradient(#D2E823_2px,transparent_2px)] [background-size:16px_16px] opacity-30"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
            <div className="w-16 h-16 bg-acid rounded-full flex items-center justify-center border-2 border-ink mb-4 group-hover:scale-110 transition-transform">
              <Sun className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-display tracking-tight text-ink">{t('categories.officeSafe')}</h3>
            <p className="text-xs opacity-60 font-semibold mt-1 uppercase tracking-wide">{t('categories.officeSafeTag')}</p>
          </div>
        </div>

        {/* Small Card 2 */}
        <div className="relative group rounded-2xl border-2 border-ink overflow-hidden shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-acid">
          <div className="absolute top-4 right-4">
            <span className="bg-ink text-acid text-[10px] font-bold px-2 py-1 rounded animate-pulse-slow">{t('categories.hotDeal')}</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
            <div className="w-16 h-16 bg-paper rounded-full flex items-center justify-center border-2 border-ink mb-4 group-hover:scale-110 transition-transform">
              <PackageOpen className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-display tracking-tight text-ink">{t('categories.mysteryBox')}</h3>
            <p className="text-xs opacity-60 font-semibold mt-1 uppercase tracking-wide">{t('categories.mysteryBoxPrice')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;

