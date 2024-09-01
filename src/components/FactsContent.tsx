import React from 'react';
import { VStack, Heading, Spinner, Text, Button } from '@chakra-ui/react';
import { FactList } from './FactList';
import { FactSelector } from './FactSelector';
import { useFacts } from '../hooks/useFacts';
import { useFactType } from '../contexts/FactTypeContext';

/**
 * FactsContent component displays the main content of the app,
 * including the title, fact type selector, and list of facts
 */
export const FactsContent: React.FC = () => {
  // Use the FactTypeContext to get and set the selected fact type
  const { selectedType } = useFactType();
  
  // Use the custom hook to manage facts
  const { facts, loading, error, lastFactElementRef, fetchMoreFacts } = useFacts(selectedType);

  return (
    <VStack spacing={6} align="stretch">
      <Heading color="white" fontSize={{ base: "2xl", md: "4xl" }} textAlign="center">
        🐱 Cat and Dog Facts 🐶
      </Heading>
      <FactSelector/>
      <FactList facts={facts} lastFactElementRef={lastFactElementRef} />
      {error && (
        <VStack>
          <Text color="white">{error}</Text>
          <Button onClick={fetchMoreFacts} colorScheme="teal">
            Retry
          </Button>
        </VStack>
      )}
      {loading && <Spinner color="white" size="xl" alignSelf="center" />}
    </VStack>
  );
};