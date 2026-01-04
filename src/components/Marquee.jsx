import { useTranslation } from 'react-i18next';

const Marquee = () => {
  const { t } = useTranslation();

  const items = [
    t('marquee.authenticDecants'),
    t('marquee.fastDelivery'),
    t('marquee.freeShipping'),
    t('marquee.originalJuice'),
    t('marquee.codAvailable'),
  ];

  return (
    <div className="bg-ink text-paper overflow-hidden py-2 border-b-2 border-ink relative z-20">
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="flex items-center gap-12 mx-4 font-display uppercase text-xs tracking-widest">
          {[...items, ...items].map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;

