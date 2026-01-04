import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="hidden md:flex items-center border border-ink rounded px-2 py-1 text-xs font-bold gap-2 bg-white" role="group" aria-label="Language selector">
      <button
        onClick={() => changeLanguage('th')}
        className={i18n.language === 'th' ? 'text-ink' : 'text-ink/40 hover:text-ink'}
        aria-label="Switch to Thai"
        aria-pressed={i18n.language === 'th'}
      >
        {t('nav.th')}
      </button>
      <span className="w-[1px] h-3 bg-ink/20" aria-hidden="true"></span>
      <button
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'text-ink' : 'text-ink/40 hover:text-ink'}
        aria-label="Switch to English"
        aria-pressed={i18n.language === 'en'}
      >
        {t('nav.en')}
      </button>
    </div>
  );
};

export default LanguageToggle;

