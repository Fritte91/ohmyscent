import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../contexts/ToastContext';

const Newsletter = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Newsletter subscription logic would go here
    // You can add API call here
    // Simulate API call
    setTimeout(() => {
      setEmail('');
      setIsSubmitting(false);
      showToast(t('newsletter.success') || 'Successfully subscribed! Check your email.', 'success');
    }, 500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10">
      <div className="bg-acid rounded-[2rem] border-2 border-ink p-8 md:p-16 text-center relative overflow-hidden shadow-hard-xl">
        {/* Background doodle */}
        <svg className="absolute top-0 left-0 opacity-10 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100 M100 0 L0 100" stroke="#0A2A1F" strokeWidth="0.5"></path>
          <circle cx="50" cy="50" r="20" stroke="#0A2A1F" strokeWidth="0.5" fill="none"></circle>
        </svg>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-ink mb-6 tracking-tighter">{t('newsletter.title')}</h2>
          <p className="text-ink text-lg font-medium mb-8">{t('newsletter.description')}</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.emailPlaceholder')}
              className="flex-1 bg-paper border-2 border-ink rounded-xl px-6 py-4 font-bold text-ink placeholder:text-ink/40 outline-none focus:shadow-hard transition-all"
              required
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-ink text-acid font-display text-xl px-8 py-4 rounded-xl border-2 border-ink hover:translate-x-1 hover:translate-y-1 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('newsletter.subscribeButton') || 'Subscribe to newsletter'}
            >
              {isSubmitting ? t('common.subscribing') || 'Subscribing...' : t('common.join')}
            </button>
          </form>
          <p className="mt-4 text-xs font-bold opacity-60">{t('newsletter.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

