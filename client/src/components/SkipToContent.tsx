import { useEffect, useState } from 'react';

export default function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsVisible(true);
      }
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleBlur);
    };
  }, []);

  const skipToMain = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.querySelector('main');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={skipToMain}
      className={`
        fixed top-4 left-4 z-[9999] px-6 py-3 
        bg-primary text-primary-foreground 
        rounded-lg font-semibold shadow-2xl
        focus:outline-none focus:ring-4 focus:ring-primary/50
        transition-all duration-200
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
      `}
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
}
