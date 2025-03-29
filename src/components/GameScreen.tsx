
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import useGameStore from '@/store/GameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import TruthOrDareSelection from './TruthOrDareSelection';
import ChallengeDisplay from './ChallengeDisplay';
import PledgeDisplay from './PledgeDisplay';
import GameComplete from './GameComplete';
import PlayerScoreboard from './PlayerScoreboard';
import { Home, Crown, Party } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const GameScreen: React.FC = () => {
  const { 
    players, 
    currentPlayerIndex, 
    currentRound,
    totalRounds,
    gameCompleted,
    resetGame,
    language,
    lastChallenge
  } = useGameStore();
  const t = useTranslation();
  
  const [showingTruthOrDare, setShowingTruthOrDare] = useState(true);
  const [showingChallenge, setShowingChallenge] = useState(false);
  const [showingPledge, setShowingPledge] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<'truth' | 'dare' | null>(null);
  const [challengeContent, setChallengeContent] = useState('');
  const [pledgeContent, setPledgeContent] = useState('');
  
  const currentPlayer = players[currentPlayerIndex];
  
  // Effect to update UI state when language changes
  useEffect(() => {
    if (lastChallenge.content) {
      if (lastChallenge.type === 'truth' || lastChallenge.type === 'dare') {
        setChallengeContent(lastChallenge.content);
      } else if (lastChallenge.type === 'pledge') {
        setPledgeContent(lastChallenge.content);
      }
    }
  }, [language, lastChallenge]);
  
  if (gameCompleted) {
    return <GameComplete />;
  }
  
  const handleChallengeSelect = (type: 'truth' | 'dare') => {
    const { getChallenge } = useGameStore.getState();
    setSelectedChallenge(type);
    const challenge = getChallenge(type);
    setChallengeContent(challenge);
    setShowingTruthOrDare(false);
    setShowingChallenge(true);
  };
  
  const handleChallengeComplete = (completed: boolean) => {
    const { completeChallenge, getPledge } = useGameStore.getState();
    completeChallenge(completed);
    
    if (!completed) {
      const pledge = getPledge();
      setPledgeContent(pledge);
      setShowingChallenge(false);
      setShowingPledge(true);
    } else {
      handleNext();
    }
  };
  
  const handleNext = () => {
    const { nextPlayer } = useGameStore.getState();
    nextPlayer();
    setShowingTruthOrDare(true);
    setShowingChallenge(false);
    setShowingPledge(false);
    setSelectedChallenge(null);
  };
  
  const handleBackToMenu = () => {
    resetGame();
    toast({
      title: t('game.game_ended'),
      description: t('game.back_to_menu_message')
    });
  };
  
  return (
    <motion.div 
      className="w-full max-w-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="text-gray-700 font-medium flex items-center">
          <Crown className="text-yellow-500 mr-2" size={18} />
          {t('game.round')} {currentRound} {t('game.of')} {totalRounds}
        </div>
        <div className="text-app-red font-medium flex items-center">
          {currentPlayer?.points} {t('game.points')} 🏆
        </div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleBackToMenu}
        className="mb-4 text-app-red hover:bg-app-red hover:text-white"
      >
        <Home size={16} className="mr-2" /> {t('game.back_to_menu')}
      </Button>
      
      {showingTruthOrDare && (
        <TruthOrDareSelection 
          player={currentPlayer} 
          onSelect={handleChallengeSelect} 
        />
      )}
      
      {showingChallenge && selectedChallenge && (
        <ChallengeDisplay
          type={selectedChallenge}
          content={challengeContent}
          onComplete={handleChallengeComplete}
        />
      )}
      
      {showingPledge && (
        <PledgeDisplay
          content={pledgeContent}
          onComplete={handleNext}
        />
      )}
      
      {/* Player Scoreboard */}
      <PlayerScoreboard 
        players={players} 
        currentPlayerIndex={currentPlayerIndex} 
      />
    </motion.div>
  );
};

export default GameScreen;
