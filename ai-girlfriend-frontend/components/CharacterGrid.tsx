'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import { Character } from '@/types';
import { CharacterCard } from './CharacterCard';
import { cn } from '@/utils/cn';

interface CharacterGridProps {
  characters: Character[];
  onCharacterSelect: (character: Character) => void;
}

export function CharacterGrid({ characters, onCharacterSelect }: CharacterGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const categories = ['all', 'romantic', 'friendly', 'playful', 'mysterious', 'intellectual'];

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = 
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.personality.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      character.personality.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character.id);
    onCharacterSelect(character);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          Choose Your AI Companion
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Find the perfect personality to chat with
        </motion.p>
      </div>

      {/* Search and Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, personality, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Characters Grid */}
      <AnimatePresence mode="wait">
        {filteredCharacters.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CharacterCard
                  character={character}
                  onClick={handleCharacterClick}
                  isSelected={selectedCharacter === character.id}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No characters found matching your criteria
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Create Custom Character
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
