import { useTranslation } from 'react-i18next';
import { ShieldCheck, Thermometer, Wallet } from 'lucide-react';

const WhyUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: ShieldCheck,
      title: t('whyUs.authentic.title'),
      description: t('whyUs.authentic.description'),
    },
    {
      icon: Thermometer,
      title: t('whyUs.climate.title'),
      description: t('whyUs.climate.description'),
    },
    {
      icon: Wallet,
      title: t('whyUs.tryBeforeBuy.title'),
      description: t('whyUs.tryBeforeBuy.description'),
    },
  ];

  return (
    <section className="bg-ink text-paper py-20 border-y-2 border-ink relative overflow-hidden">
      {/* Abstract shape */}
      <svg className="absolute -left-20 top-1/2 -translate-y-1/2 h-[150%] w-auto opacity-5 text-acid" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="currentColor"></circle>
      </svg>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-acid/20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-4 px-4">
                <div className="w-12 h-12 bg-acid/10 rounded-lg flex items-center justify-center border border-acid/20 mx-auto md:mx-0">
                  <Icon className="w-6 h-6 text-acid stroke-[1.5]" />
                </div>
                <h3 className="font-display text-2xl text-acid">{feature.title}</h3>
                <p className="opacity-80 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

