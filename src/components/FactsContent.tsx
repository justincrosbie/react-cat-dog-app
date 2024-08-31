import React from 'react';
import { VStack, Heading, Spinner, Text, Button } from '@chakra-ui/react';
import { FactList } from './FactList';
import { FactSelector } from './FactSelector';
import { useFacts } from '../hooks/useFacts';

export const FactsContent: React.FC = () => {
  const { loading, error, lastFactElementRef, loadMoreFacts, changeSelectedType } = useFacts();

  return (
    <VStack spacing={6} align="stretch">
      <Heading color="white" fontSize={{ base: "2xl", md: "4xl" }} textAlign="center">
        🐱 Cat and Dog Facts 🐶
      </Heading>
      <FactSelector onSelectType={changeSelectedType} />
      <FactList lastFactElementRef={lastFactElementRef} />
      {error && (
        <VStack>
          <Text color="white">{error}</Text>
          <Button onClick={loadMoreFacts} colorScheme="teal">
            Retry
          </Button>
        </VStack>
      )}
      {loading && <Spinner color="white" size="xl" alignSelf="center" />}
    </VStack>
  );
};