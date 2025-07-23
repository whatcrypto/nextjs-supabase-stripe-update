'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Sparkles } from 'lucide-react';
import { Character } from '@/types';
import { cn } from '@/utils/cn';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
  isSelected?: boolean;
}

export function CharacterCard({ character, onClick, isSelected = false }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(character)}
      className={cn(
        "relative cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br",
        "from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20",
        "border-2 transition-all duration-300",
        isSelected
          ? "border-primary shadow-xl shadow-primary/20"
          : "border-transparent hover:border-primary/30 hover:shadow-lg"
      )}
    >
      <div className="p-6">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-xl">
            <img
              src={character.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${character.name}`}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>
          {character.isActive && (
            <div className="absolute bottom-0 right-1/2 translate-x-12 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800 animate-pulse" />
          )}
        </div>

        {/* Name and Personality */}
        <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          {character.name}
        </h3>
        <p className="text-sm text-center text-primary font-medium mb-3">
          {character.personality}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4 line-clamp-2">
          {character.description}
        </p>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {character.traits.slice(0, 3).map((trait, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
          <button className="hover:text-pink-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="hover:text-primary transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="hover:text-purple-500 transition-colors">
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
