
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, PartyPopper, Smile } from 'lucide-react';
import useGameStore, { Category } from '@/store/GameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

const CategorySelection: React.FC = () => {
  const { setCategory } = useGameStore();
  const t = useTranslation();
  
  const categories: { id: Category; icon: React.ReactNode; title: string; description: string }[] = [
    {
      id: 'soft',
      icon: <Smile size={48} className="category-icon" />,
      title: t('categories.soft'),
      description: t('categories.soft_description'),
    },
    {
      id: 'party',
      icon: <PartyPopper size={48} className="category-icon" />,
      title: t('categories.party'),
      description: t('categories.party_description'),
    },
    {
      id: 'hot',
      icon: <Heart size={48} className="category-icon" />,
      title: t('categories.hot'),
      description: t('categories.hot_description'),
    },
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={item}>
          <Card 
            className="category-card hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => setCategory(category.id)}
          >
            <CardContent className="flex flex-col items-center p-6">
              {category.icon}
              <h3 className="text-2xl font-bold text-app-red mb-2">{category.title}</h3>
              <p className="text-gray-600 text-center">{category.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategorySelection;
