import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      text: t('testimonials.review1.text'),
      author: t('testimonials.review1.author'),
      location: t('testimonials.review1.location'),
      initials: 'T',
      highlighted: false,
    },
    {
      text: t('testimonials.review2.text'),
      author: t('testimonials.review2.author'),
      location: t('testimonials.review2.location'),
      initials: 'P',
      highlighted: true,
    },
    {
      text: t('testimonials.review3.text'),
      author: t('testimonials.review3.author'),
      location: t('testimonials.review3.location'),
      initials: 'S',
      highlighted: false,
    },
  ];

  return (
    <section className="py-24 bg-paper relative overflow-hidden">
      {/* Abstract Decoration */}
      <div className="absolute -right-10 top-20 w-40 h-40 bg-acid rounded-full border-2 border-ink opacity-20 blur-xl"></div>
      <div className="absolute -left-10 bottom-20 w-20 h-20 bg-ink rounded-full opacity-10 blur-xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-ink text-acid font-bold text-xs uppercase px-3 py-1 rounded-full mb-4 border border-ink">{t('testimonials.badge')}</div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tighter text-ink">{t('testimonials.title')}</h2>
          <p className="mt-4 text-lg opacity-70">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 border-ink shadow-hard transition-transform duration-300 flex flex-col ${
                review.highlighted
                  ? 'bg-ink text-paper md:-rotate-2 hover:rotate-0 z-10'
                  : 'bg-white hover:translate-y-[-4px]'
              }`}
            >
              <div className={`flex gap-1 mb-4 ${review.highlighted ? 'text-acid' : 'text-orange'}`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${review.highlighted ? 'fill-acid stroke-acid' : 'fill-orange stroke-ink'}`}
                  />
                ))}
              </div>
              <p className="font-medium text-lg leading-relaxed mb-6 flex-grow">{review.text}</p>
              <div className={`flex items-center gap-3 border-t ${review.highlighted ? 'border-white/10' : 'border-gray-100'} pt-4`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm ${
                    review.highlighted
                      ? 'bg-acid text-ink border border-paper'
                      : review.initials === 'T'
                      ? 'bg-ink text-paper'
                      : 'bg-gray-200 text-ink border-2 border-ink'
                  }`}
                >
                  {review.initials}
                </div>
                <div>
                  <div className="font-bold text-sm">{review.author}</div>
                  <div className="text-[10px] opacity-50 font-bold uppercase tracking-wide">
                    {t('testimonials.verified')} • {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

