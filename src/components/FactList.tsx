import React, { useEffect } from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';
import { Fact } from '../interfaces/Fact';

const MotionBox = motion(Box);

interface FactListProps {
  lastFactElementRef: (node: HTMLDivElement | null) => void;
}

const FactItem: React.FC<{ fact: Fact; isLast: boolean; lastFactElementRef: (node: HTMLDivElement | null) => void }> = React.memo(({ fact, isLast, lastFactElementRef }) => (
  <MotionBox
    ref={isLast ? lastFactElementRef : null}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    bg="white"
    p={4}
    borderRadius="md"
    boxShadow="md"
    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
  >
    <Text fontSize="lg">
      <Text as="span" fontSize="2xl" mr={2}>
        {fact.type === 'cat' ? '🐱' : '🐶'}
      </Text>
      {fact.text}
    </Text>
  </MotionBox>
));

export const FactList: React.FC<FactListProps> = React.memo(({ lastFactElementRef }) => {
  const { facts, loading, selectedType } = useAppSelector((state) => state.facts);

  useEffect(() => {
    console.log('FactList re-rendered');
    console.log('Facts in FactList:', facts);
    console.log('Loading state:', loading);
    console.log('Selected type:', selectedType);
  }, [facts, loading, selectedType]);

  if (facts.length === 0 && !loading) {
    console.log('No facts available');
    return <Text color="white">No facts available. Try selecting a different category or refreshing.</Text>;
  }

  console.log('Rendering fact list with', facts.length, 'facts');
  return (
    <VStack spacing={4} align="stretch" w="100%">
      {facts.map((fact, index) => (
        <FactItem
          key={fact._id}
          fact={fact}
          isLast={index === facts.length - 1}
          lastFactElementRef={lastFactElementRef}
        />
      ))}
    </VStack>
  );
});
