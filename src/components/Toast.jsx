import { useEffect } from 'react';
import { Check, X as XIcon } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const isError = type === 'error';
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`border-2 border-ink rounded-xl shadow-hard-xl p-4 flex items-center gap-3 min-w-[300px] max-w-[400px] animate-fade-in ${
        isError ? 'bg-orange text-paper' : 'bg-acid text-ink'
      }`}
      role="alert"
      aria-live="polite"
    >
      {isError ? (
        <XIcon className="w-5 h-5 flex-shrink-0" />
      ) : (
        <Check className="w-5 h-5 flex-shrink-0" />
      )}
      <p className="font-bold text-sm flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/10 rounded transition-colors"
        aria-label="Close"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;

