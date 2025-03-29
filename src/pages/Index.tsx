
import React from 'react';
import GameContainer from '@/components/GameContainer';
import LanguageSelector from '@/components/LanguageSelector';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-app-offWhite to-white p-4">
      <LanguageSelector />
      <GameContainer />
    </div>
  );
};

export default Index;
