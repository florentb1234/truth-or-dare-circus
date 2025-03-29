
import React from 'react';
import CategorySelection from './CategorySelection';
import PlayerSetup from './PlayerSetup';
import GameScreen from './GameScreen';
import useGameStore from '@/store/GameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

const GameContainer: React.FC = () => {
  const { category, players } = useGameStore();
  const t = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto px-4">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-app-red mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('app.title')}
      </motion.h1>
      
      {!category && <CategorySelection />}
      {category && players.length === 0 && <PlayerSetup />}
      {category && players.length > 0 && <GameScreen />}
    </div>
  );
};

export default GameContainer;
