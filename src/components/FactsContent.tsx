import React from 'react';
import { VStack, Heading, Spinner, Text, Button } from '@chakra-ui/react';
import { FactList } from './FactList';
import { FactSelector } from './FactSelector';
import { useFacts } from '../hooks/useFacts';
import { FactType } from '../interfaces/Fact';

/**
 * Props for the FactsContent component
 * @interface FactsContentProps
 */
interface FactsContentProps {
  /** The currently selected fact type */
  selectedType: FactType;
  /** Callback function to handle fact type selection */
  onSelectType: (type: FactType) => void;
}

/**
 * FactsContent component displays the main content of the app,
 * including the title, fact type selector, and list of facts
 * @param {FactsContentProps} props - The component props
 */
export const FactsContent: React.FC<FactsContentProps> = ({ selectedType, onSelectType }) => {
  // Use the custom hook to manage facts
  const { facts, loading, error, lastFactElementRef, fetchMoreFacts } = useFacts(selectedType);

  return (
    <VStack spacing={6} align="stretch">
      <Heading color="white" fontSize={{ base: "2xl", md: "4xl" }} textAlign="center">
        🐱 Cat and Dog Facts 🐶
      </Heading>
      <FactSelector selectedType={selectedType} onSelect={onSelectType} />
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