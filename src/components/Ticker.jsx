import { useTranslation } from 'react-i18next';
import { Sparkles, Droplet, Zap, Heart } from 'lucide-react';

const Ticker = () => {
  const { t } = useTranslation();

  const items = [
    { type: 'text', content: t('ticker.brandName') },
    { type: 'icon', icon: Sparkles },
    { type: 'text', content: t('ticker.originalBrands'), outline: true },
    { type: 'icon', icon: Droplet },
    { type: 'text', content: t('ticker.startsAt') },
    { type: 'icon', icon: Zap },
    { type: 'text', content: t('ticker.fastShipping'), outline: true },
    { type: 'icon', icon: Heart },
  ];

  return (
    <div className="border-y-2 border-ink bg-acid py-6 overflow-hidden rotate-1 scale-105 transform origin-left relative z-20">
      <div className="animate-marquee whitespace-nowrap flex gap-12 text-4xl font-display text-ink items-center">
        {[...items, ...items].map((item, index) => {
          if (item.type === 'icon') {
            const Icon = item.icon;
            return <Icon key={index} className="w-8 h-8 fill-ink" />;
          }
          return (
            <span key={index} className={item.outline ? 'text-outline' : ''}>
              {item.content}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Ticker;

