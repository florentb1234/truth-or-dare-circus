
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import useGameStore from '@/store/GameStore';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useGameStore();
  const t = useTranslation();

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <Globe size={20} className="text-app-red" />
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-app-red hover:bg-app-darkRed' : ''}
      >
        {t('app.english')}
      </Button>
      <Button
        variant={language === 'fr' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className={language === 'fr' ? 'bg-app-red hover:bg-app-darkRed' : ''}
      >
        {t('app.french')}
      </Button>
    </div>
  );
};

export default LanguageSelector;
