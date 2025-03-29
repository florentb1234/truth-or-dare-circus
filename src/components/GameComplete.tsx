
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Home } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import useGameStore from '@/store/GameStore';
import { motion } from 'framer-motion';

const GameComplete: React.FC = () => {
  const { winner, loser, resetGame, getPledge } = useGameStore();
  const t = useTranslation();
  
  // Get a final pledge for the loser
  const finalPledge = getPledge();
  
  return (
    <motion.div 
      className="game-card bg-white rounded-2xl p-8 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-app-red mb-6">
        {t('game.game_over')}
      </h2>
      
      <div className="space-y-6 mb-8">
        {winner && (
          <motion.div 
            className="result-card bg-gradient-to-r from-yellow-100 to-yellow-200"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Trophy className="text-yellow-500 mb-2" size={40} />
            <h3 className="text-xl font-semibold mb-1">{t('game.winner')}</h3>
            <div className="player-badge bg-yellow-500 text-white">
              {winner.name} ({winner.points} {t('game.points')})
            </div>
          </motion.div>
        )}
        
        {loser && (
          <motion.div 
            className="result-card bg-gradient-to-r from-gray-100 to-gray-200"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Medal className="text-gray-500 mb-2" size={40} />
            <h3 className="text-xl font-semibold mb-1">{t('game.loser')}</h3>
            <div className="player-badge bg-gray-500 text-white">
              {loser.name} ({loser.points} {t('game.points')})
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="result-card bg-gradient-to-r from-red-50 to-red-100"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-3">{t('game.final_pledge')}</h3>
          <p className="text-gray-800 bg-white p-4 rounded-lg shadow-inner">
            {finalPledge}
          </p>
        </motion.div>
      </div>
      
      <Button 
        className="w-full py-6 bg-app-red hover:bg-app-darkRed rounded-xl text-white text-lg font-bold"
        onClick={resetGame}
      >
        <Home className="mr-2" size={20} />
        {t('game.back_to_menu')}
      </Button>
    </motion.div>
  );
};

export default GameComplete;
