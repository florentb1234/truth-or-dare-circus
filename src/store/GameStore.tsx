import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import softChallenges from '../data/challenges/soft.json';
import partyChallenges from '../data/challenges/party.json';
import hotChallenges from '../data/challenges/hot.json';

export type Category = 'soft' | 'party' | 'hot';
export type ChallengeType = 'truth' | 'dare' | 'pledge';
export type Language = 'en' | 'fr';

export interface Player {
  name: string;
  points: number;
}

export interface GameState {
  players: Player[];
  category: Category | null;
  currentPlayerIndex: number;
  usedChallenges: {
    truths: string[];
    dares: string[];
    pledges: string[];
  };
  language: Language;
  currentRound: number;
  totalRounds: number;
  winner: Player | null;
  loser: Player | null;
  lastChallenge: {
    type: ChallengeType | null;
    content: string | null;
  };
  gameCompleted: boolean;
  
  // Actions
  setCategory: (category: Category) => void;
  addPlayer: (name: string) => void;
  removePlayer: (index: number) => void;
  startGame: () => void;
  nextPlayer: () => void;
  getChallenge: (type: 'truth' | 'dare') => string;
  getPledge: () => string;
  completeChallenge: (completed: boolean) => void;
  setLanguage: (language: Language) => void;
  resetGame: () => void;
  updatePlayers: (players: Player[]) => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: [],
      category: null,
      currentPlayerIndex: 0,
      usedChallenges: {
        truths: [],
        dares: [],
        pledges: [],
      },
      language: 'en',
      currentRound: 1,
      totalRounds: 20,
      winner: null,
      loser: null,
      lastChallenge: {
        type: null,
        content: null,
      },
      gameCompleted: false,

      setCategory: (category) => set({ category }),
      
      setLanguage: (language) => {
        // Reset used challenges when language changes to force new selections
        set({ 
          language,
          usedChallenges: {
            truths: [],
            dares: [],
            pledges: [],
          },
          lastChallenge: {
            type: null,
            content: null,
          }
        });
      },
      
      addPlayer: (name) => {
        if (!name) return;
        
        set((state) => ({
          players: [...state.players, { name, points: 0 }],
        }));
      },
      
      removePlayer: (index) => {
        set((state) => ({
          players: state.players.filter((_, i) => i !== index),
        }));
      },
      
      updatePlayers: (players) => set({ players }),
      
      startGame: () => {
        set({
          currentPlayerIndex: 0,
          currentRound: 1,
          usedChallenges: {
            truths: [],
            dares: [],
            pledges: [],
          },
          gameCompleted: false,
          winner: null,
          loser: null,
        });
      },
      
      nextPlayer: () => {
        const { players, currentPlayerIndex, currentRound, totalRounds } = get();
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        
        // If we've gone through all players, increase the round
        let newRound = currentRound;
        let gameCompleted = false;
        let winner = null;
        let loser = null;
        
        if (nextPlayerIndex === 0) {
          newRound++;
        }
        
        // Check if game is completed
        if (newRound > totalRounds) {
          gameCompleted = true;
          
          // Determine winner and loser
          if (players.length > 0) {
            const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
            winner = sortedPlayers[0];
            loser = sortedPlayers[sortedPlayers.length - 1];
          }
        }
        
        set({
          currentPlayerIndex: nextPlayerIndex,
          currentRound: newRound,
          gameCompleted,
          winner,
          loser,
        });
      },
      
      getChallenge: (type) => {
        const { category, language, usedChallenges } = get();
        if (!category) return '';
        
        let allChallenges: string[] = [];
        
        // Get challenges based on category
        switch (category) {
          case 'soft':
            allChallenges = softChallenges[language][type === 'truth' ? 'truths' : 'dares'];
            break;
          case 'party':
            allChallenges = partyChallenges[language][type === 'truth' ? 'truths' : 'dares'];
            break;
          case 'hot':
            allChallenges = hotChallenges[language][type === 'truth' ? 'truths' : 'dares'];
            break;
        }
        
        // Filter out used challenges
        const availableChallenges = allChallenges.filter(
          (challenge) => !usedChallenges[type === 'truth' ? 'truths' : 'dares'].includes(challenge)
        );
        
        // If all challenges have been used, reset
        if (availableChallenges.length === 0) {
          return allChallenges[Math.floor(Math.random() * allChallenges.length)];
        }
        
        // Get random challenge
        const challenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
        
        // Add to used challenges
        set((state) => ({
          usedChallenges: {
            ...state.usedChallenges,
            [type === 'truth' ? 'truths' : 'dares']: [...state.usedChallenges[type === 'truth' ? 'truths' : 'dares'], challenge],
          },
          lastChallenge: {
            type,
            content: challenge,
          },
        }));
        
        return challenge;
      },
      
      getPledge: () => {
        const { category, language, usedChallenges } = get();
        if (!category) return '';
        
        let allPledges: string[] = [];
        
        // Get pledges based on category
        switch (category) {
          case 'soft':
            allPledges = softChallenges[language].pledges;
            break;
          case 'party':
            allPledges = partyChallenges[language].pledges;
            break;
          case 'hot':
            allPledges = hotChallenges[language].pledges;
            break;
        }
        
        // Filter out used pledges
        const availablePledges = allPledges.filter(
          (pledge) => !usedChallenges.pledges.includes(pledge)
        );
        
        // If all pledges have been used, reset
        if (availablePledges.length === 0) {
          return allPledges[Math.floor(Math.random() * allPledges.length)];
        }
        
        // Get random pledge
        const pledge = availablePledges[Math.floor(Math.random() * availablePledges.length)];
        
        // Add to used pledges
        set((state) => ({
          usedChallenges: {
            ...state.usedChallenges,
            pledges: [...state.usedChallenges.pledges, pledge],
          },
          lastChallenge: {
            type: 'pledge',
            content: pledge,
          },
        }));
        
        return pledge;
      },
      
      completeChallenge: (completed) => {
        if (completed) {
          const { currentPlayerIndex, players } = get();
          const updatedPlayers = [...players];
          updatedPlayers[currentPlayerIndex].points += 1;
          
          set({
            players: updatedPlayers,
          });
        }
      },
      
      resetGame: () => {
        set({
          players: [],
          category: null,
          currentPlayerIndex: 0,
          usedChallenges: {
            truths: [],
            dares: [],
            pledges: [],
          },
          currentRound: 1,
          gameCompleted: false,
          winner: null,
          loser: null,
          lastChallenge: {
            type: null,
            content: null,
          },
        });
      },
    }),
    {
      name: 'truth-or-dare-game',
    }
  )
);

export default useGameStore;
