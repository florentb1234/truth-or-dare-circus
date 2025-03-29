import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import useGameStore from '@/store/GameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const PlayerSetup: React.FC = () => {
  const { players, addPlayer, removePlayer, startGame } = useGameStore();
  const [playerInputs, setPlayerInputs] = useState<string[]>(['', '']);
  const t = useTranslation();
  
  useEffect(() => {
    if (players.length > 0) {
      setPlayerInputs(players.map(player => player.name));
    } else {
      setPlayerInputs(['', '']);
    }
  }, []);
  
  const updatePlayerInput = (index: number, value: string) => {
    const updatedInputs = [...playerInputs];
    updatedInputs[index] = value;
    setPlayerInputs(updatedInputs);
  };
  
  const handleAddPlayerInput = () => {
    if (playerInputs.length < 10) {
      setPlayerInputs([...playerInputs, '']);
    } else {
      toast({
        title: t('setup.max_players'),
        variant: 'destructive',
      });
    }
  };
  
  const handleRemovePlayerInput = (index: number) => {
    const updatedInputs = [...playerInputs];
    updatedInputs.splice(index, 1);
    setPlayerInputs(updatedInputs);
  };
  
  const handleStart = () => {
    players.forEach((_, index) => removePlayer(0));
    
    const validPlayers = playerInputs.filter(name => name.trim() !== '');
    
    if (validPlayers.length < 2) {
      toast({
        title: t('setup.min_players'),
        variant: 'destructive',
      });
      return;
    }
    
    validPlayers.forEach(name => addPlayer(name.trim()));
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
      
      <div className="mb-6 max-h-60 overflow-y-auto">
        <AnimatePresence>
          {playerInputs.map((inputValue, index) => (
            <motion.div 
              key={index}
              className="flex gap-2 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={inputValue}
                onChange={(e) => updatePlayerInput(index, e.target.value)}
                placeholder={t('setup.player_placeholder')}
                className="player-input"
                maxLength={20}
              />
              {playerInputs.length > 2 && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemovePlayerInput(index)}
                  className="text-gray-500 hover:text-app-red"
                  aria-label={t('setup.remove_player')}
                >
                  <X size={16} />
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="flex gap-2 mb-6">
        <Button 
          onClick={handleAddPlayerInput}
          className="bg-app-red hover:bg-app-darkRed w-full"
          disabled={playerInputs.length >= 10}
          aria-label={t('setup.add_more')}
        >
          <Plus size={20} className="mr-2" /> {t('setup.add_more')}
        </Button>
      </div>
      
      <Button 
        onClick={handleStart}
        className="w-full py-6 bg-app-red hover:bg-app-darkRed rounded-xl text-white text-lg font-bold"
      >
        {t('setup.start_game')} <ArrowRight className="ml-2" size={20} />
      </Button>
    </motion.div>
  );
};

export default PlayerSetup;
