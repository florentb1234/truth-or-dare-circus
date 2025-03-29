
import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Trophy, Star, Heart, Medal } from 'lucide-react';
import { Player } from '@/store/GameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

interface PlayerScoreboardProps {
  players: Player[];
  currentPlayerIndex: number;
}

const PlayerScoreboard: React.FC<PlayerScoreboardProps> = ({ players, currentPlayerIndex }) => {
  const t = useTranslation();
  
  const getPlayerIcon = (index: number, points: number) => {
    // Current player gets a star
    if (index === currentPlayerIndex) {
      return <Star className="text-yellow-500" size={18} />;
    }
    
    // Players with high points get different icons
    if (points >= 5) {
      return <Trophy className="text-yellow-500" size={18} />;
    } else if (points >= 3) {
      return <Medal className="text-purple-500" size={18} />;
    } else if (points >= 1) {
      return <Heart className="text-pink-500" size={18} />;
    }
    
    return null;
  };

  return (
    <motion.div 
      className="mt-6 bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-app-lightRed to-app-red">
            <TableHead className="text-white font-semibold">
              {t('game.player')} 🎮
            </TableHead>
            <TableHead className="text-white font-semibold text-right">
              {t('game.points')} 🎯
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow 
              key={index}
              className={index === currentPlayerIndex ? "bg-app-red/10" : ""}
            >
              <TableCell className="font-medium flex items-center gap-2">
                {getPlayerIcon(index, player.points)}
                {player.name}
                {index === currentPlayerIndex && <span className="text-xs bg-app-red text-white px-2 py-1 rounded-full">✨ {t('game.current')}</span>}
              </TableCell>
              <TableCell className="text-right font-bold text-app-red">
                {player.points} {player.points >= 3 ? '🔥' : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default PlayerScoreboard;
