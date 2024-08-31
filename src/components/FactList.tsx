import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Fact } from '../interfaces/Fact';

// Create a motion-enabled version of Chakra UI's Box component
const MotionBox = motion(Box);

/**
 * Props for the FactList component
 * @interface FactListProps
 * @property {Fact[]} facts - An array of Fact objects to display
 * @property {(node: HTMLDivElement | null) => void} lastFactElementRef - Callback ref for the last fact element
 */
export interface FactListProps {
    facts: Fact[];
    lastFactElementRef: (node: HTMLDivElement | null) => void;
  }
  
/**
 * FactList Component
 * 
 * This component renders a list of facts about cats and dogs.
 * It uses Framer Motion for animations and Chakra UI for styling.
 *
 * @component
 * @param {FactListProps} props - The props for the FactList component
 * @returns {React.FC} A React functional component
 */
export const FactList: React.FC<FactListProps> = ({ facts, lastFactElementRef }) => {
  return (
    <VStack spacing={4} align="stretch" w="100%">
      {facts.map((fact, index) => (
        <MotionBox
          key={fact._id}
          // Apply the ref to the last element for infinite scrolling
          ref={index === facts.length - 1 ? lastFactElementRef : null}
          // Initial state for enter animation
          initial={{ opacity: 0, y: 20 }}
          // Final state for enter animation
          animate={{ opacity: 1, y: 0 }}
          // Animation configuration
          transition={{ duration: 0.5, delay: index * 0.1 }}
          // Styling
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          // Hover effect
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        >
          <Text fontSize="lg">
            {/* Emoji indicator for fact type */}
            <Text as="span" fontSize="2xl" mr={2}>
              {fact.type === 'cat' ? '🐱' : '🐶'}
            </Text>
            {/* Fact text */}
            {fact.text}
          </Text>
        </MotionBox>
      ))}
    </VStack>
  );
};
