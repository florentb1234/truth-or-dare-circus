
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface ChallengeDisplayProps {
  type: 'truth' | 'dare';
  content: string;
  onComplete: (completed: boolean) => void;
}

const ChallengeDisplay: React.FC<ChallengeDisplayProps> = ({ 
  type, 
  content, 
  onComplete 
}) => {
  const t = useTranslation();
  
  return (
    <motion.div 
      className="game-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={`name-circle mb-4 px-6 py-2 ${
        type === 'truth' 
          ? 'bg-gradient-to-r from-app-lightRed to-app-red' 
          : 'bg-gradient-to-r from-app-darkRed to-app-red'
      } text-white font-bold uppercase tracking-wide`}>
        {t(`game.${type}`)}
      </div>
      
      <div className="bg-gray-50 p-5 rounded-xl shadow-inner mb-6 w-full">
        <p className="text-gray-800 text-lg">{content}</p>
      </div>
      
      <div className="flex gap-4 w-full">
        <Button
          className="action-btn flex-1 bg-green-500 hover:bg-green-600 text-white"
          onClick={() => onComplete(true)}
        >
          <Check className="mr-2" size={20} />
          {t('game.completed')}
        </Button>
        
        <Button
          className="action-btn flex-1 bg-app-red hover:bg-app-darkRed text-white"
          onClick={() => onComplete(false)}
        >
          <X className="mr-2" size={20} />
          {t('game.failed')}
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeDisplay;
