
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface PledgeDisplayProps {
  content: string;
  onComplete: () => void;
}

const PledgeDisplay: React.FC<PledgeDisplayProps> = ({ content, onComplete }) => {
  const t = useTranslation();
  
  return (
    <motion.div 
      className="game-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="name-circle mb-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold uppercase tracking-wide">
        {t('game.pledge')}
      </div>
      
      <div className="bg-gray-50 p-5 rounded-xl shadow-inner mb-6 w-full">
        <p className="text-gray-800 text-lg">{content}</p>
      </div>
      
      <Button
        className="action-btn w-full bg-app-red hover:bg-app-darkRed text-white"
        onClick={onComplete}
      >
        {t('game.next')}
        <ArrowRight className="ml-2" size={20} />
      </Button>
    </motion.div>
  );
};

export default PledgeDisplay;
