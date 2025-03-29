
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import useGameStore from '@/store/GameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import TruthOrDareSelection from './TruthOrDareSelection';
import ChallengeDisplay from './ChallengeDisplay';
import PledgeDisplay from './PledgeDisplay';
import GameComplete from './GameComplete';

const GameScreen: React.FC = () => {
  const { 
    players, 
    currentPlayerIndex, 
    currentRound,
    totalRounds,
    gameCompleted
  } = useGameStore();
  const t = useTranslation();
  
  const [showingTruthOrDare, setShowingTruthOrDare] = useState(true);
  const [showingChallenge, setShowingChallenge] = useState(false);
  const [showingPledge, setShowingPledge] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<'truth' | 'dare' | null>(null);
  const [challengeContent, setChallengeContent] = useState('');
  const [pledgeContent, setPledgeContent] = useState('');
  
  const currentPlayer = players[currentPlayerIndex];
  
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
  
  return (
    <motion.div 
      className="w-full max-w-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="text-gray-700 font-medium">
          {t('game.round')} {currentRound} {t('game.of')} {totalRounds}
        </div>
        <div className="text-app-red font-medium">
          {currentPlayer?.points} {t('game.points')}
        </div>
      </div>
      
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
    </motion.div>
  );
};

export default GameScreen;
