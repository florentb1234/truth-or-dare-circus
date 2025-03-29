
import React from 'react';
import { Button } from '@/components/ui/button';
import { Player } from '@/store/GameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface TruthOrDareSelectionProps {
  player: Player;
  onSelect: (type: 'truth' | 'dare') => void;
}

const TruthOrDareSelection: React.FC<TruthOrDareSelectionProps> = ({ player, onSelect }) => {
  const t = useTranslation();
  
  return (
    <motion.div 
      className="game-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="name-circle bg-app-red text-white text-xl font-bold mb-4 px-8 py-3">
        {player.name}{t('game.turn')}
      </div>
      
      <p className="text-lg font-medium text-gray-700 mb-6">
        {t('game.choose')}
      </p>
      
      <div className="flex gap-4 w-full">
        <Button
          className="truth-dare-btn flex-1 bg-gradient-to-r from-app-lightRed to-app-red text-white shadow-md"
          onClick={() => onSelect('truth')}
        >
          {t('game.truth')}
        </Button>
        
        <Button
          className="truth-dare-btn flex-1 bg-gradient-to-r from-app-darkRed to-app-red text-white shadow-md"
          onClick={() => onSelect('dare')}
        >
          {t('game.dare')}
        </Button>
      </div>
    </motion.div>
  );
};

export default TruthOrDareSelection;
