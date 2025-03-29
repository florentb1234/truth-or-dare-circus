
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import useGameStore from '@/store/GameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const PlayerSetup: React.FC = () => {
  const { players, addPlayer, removePlayer, startGame } = useGameStore();
  const [newPlayerName, setNewPlayerName] = useState('');
  const t = useTranslation();
  
  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      if (players.length >= 10) {
        toast({
          title: t('setup.max_players'),
          variant: 'destructive',
        });
        return;
      }
      
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };
  
  const handleStart = () => {
    if (players.length < 2) {
      toast({
        title: t('setup.min_players'),
        variant: 'destructive',
      });
      return;
    }
    
    startGame();
  };
  
  return (
    <motion.div 
      className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-app-red mb-6 text-center">
        {t('setup.add_players')}
      </h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder={t('setup.player_placeholder')}
          className="player-input"
          onKeyPress={handleKeyPress}
          maxLength={20}
        />
        <Button 
          onClick={handleAddPlayer}
          className="bg-app-red hover:bg-app-darkRed"
        >
          <Plus size={20} />
        </Button>
      </div>
      
      <div className="mb-6 max-h-60 overflow-y-auto">
        <AnimatePresence>
          {players.map((player, index) => (
            <motion.div 
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-medium text-gray-800">{player.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removePlayer(index)}
                className="text-gray-500 hover:text-app-red"
              >
                <X size={16} />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <Button 
        onClick={handleStart}
        className="w-full py-6 bg-app-red hover:bg-app-darkRed rounded-xl text-white text-lg font-bold"
        disabled={players.length < 2}
      >
        {t('setup.start_game')} <ArrowRight className="ml-2" size={20} />
      </Button>
    </motion.div>
  );
};

export default PlayerSetup;
