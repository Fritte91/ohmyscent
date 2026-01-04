import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThermometerSun, ArrowRight, Heart } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <header className="px-4 md:px-8 pt-12 pb-20 max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
          <div className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 rounded-full bg-acid shadow-hard-sm rotate-[-2deg] animate-float">
            <ThermometerSun className="w-4 h-4 stroke-[1.5]" />
            <span className="font-semibold text-xs uppercase tracking-wider">{t('hero.badge')}</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-ink">
            {t('hero.title1')} <br />
            <span className="relative inline-block">
              {t('hero.title2')}
              <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full" viewBox="0 0 200 20" fill="none">
                <path d="M2 15Q100 2 198 12" stroke="#D2E823" strokeWidth="8" strokeLinecap="round"></path>
              </svg>
            </span><br />
            {t('hero.title3')}
          </h1>
          
          <p className="font-medium text-lg max-w-lg leading-relaxed opacity-90">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4 w-full pt-2">
            <Link to="/shop" className="flex-1 md:flex-none text-center bg-ink text-acid border-2 border-ink px-8 py-4 rounded-xl font-display text-lg tracking-wide shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-2 group">
              {t('common.shopNow')} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/" className="flex-1 md:flex-none text-center bg-paper text-ink border-2 border-ink px-8 py-4 rounded-xl font-display text-lg tracking-wide shadow-hard hover:bg-acid hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              {t('common.findMyScent')}
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm font-semibold mt-2">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=33" className="w-10 h-10 rounded-full border-2 border-paper bg-gray-300" alt="User" />
              <img src="https://i.pravatar.cc/100?img=47" className="w-10 h-10 rounded-full border-2 border-paper bg-gray-400" alt="User" />
              <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-2 border-paper bg-gray-500" alt="User" />
            </div>
            <p>{t('hero.lovedBy')} <span className="bg-acid px-1 text-ink border border-ink rounded-sm">5,000+</span> {t('hero.thais')}</p>
          </div>
        </div>

        {/* Right Visual: Advanced Composition */}
        <div className="lg:col-span-5 relative mt-10 lg:mt-0">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-acid rounded-[2rem] border-2 border-ink rotate-6 z-0"></div>
          
          {/* Floating Badge */}
          <div className="absolute -top-6 -right-4 z-20 animate-bounce delay-700">
            <div className="bg-orange text-paper border-2 border-ink p-3 rounded-full shadow-hard rotate-12">
              <div className="font-display text-xs text-center leading-tight">FLASH<br />SALE</div>
            </div>
          </div>

          {/* Main Card */}
          <div className="relative bg-ink rounded-[2rem] border-2 border-ink overflow-hidden z-10 aspect-[4/5] shadow-hard-xl group cursor-pointer">
            <img src="/perfume1.jpg" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Featured Product" />
            
            {/* Advanced UI Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90"></div>
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <span className="bg-paper/20 backdrop-blur-md text-paper border border-paper/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Editor's Pick</span>
              <button 
                className="bg-paper p-2 rounded-full text-ink hover:bg-acid transition-colors"
                aria-label="Add to favorites"
              >
                <Heart className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 text-paper">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <h3 className="font-display text-3xl tracking-tight">OMBRÉ LEATHER</h3>
                  <p className="font-mono text-sm text-acid">Tom Ford</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs opacity-60 line-through">฿950</span>
                  <span className="font-display text-xl text-acid">฿450</span>
                </div>
              </div>
              
              {/* Scent Profile Bar */}
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest opacity-70">
                  <span>Fresh</span>
                  <span>Spicy</span>
                  <span>Leather</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-acid to-orange w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;

