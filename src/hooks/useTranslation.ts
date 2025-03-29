
import useGameStore from '@/store/GameStore';
import enTranslations from '@/locales/en.json';
import frTranslations from '@/locales/fr.json';

export const useTranslation = () => {
  const { language } = useGameStore();
  
  // Function to get a translation by key
  const translate = (key: string): string => {
    const translations = language === 'fr' ? frTranslations : enTranslations;
    
    // Split the key by dots to navigate the nested structure
    const keys = key.split('.');
    let result: any = translations;
    
    // Navigate through the object
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return result;
  };
  
  return translate;
};
