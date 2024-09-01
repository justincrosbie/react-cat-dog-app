import React from 'react';
import { Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useAppSelector } from '../store/hooks';
import { FactType } from '../interfaces/Fact';

interface FactSelectorProps {
  onSelectType: (type: FactType) => void;
}

/**
 * FactSelector component
 * 
 * This component renders a set of buttons that allow the user to select
 * the type of facts they want to see (cat, dog, or both).
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSelectType - Callback function to handle type selection
 */
export const FactSelector: React.FC<FactSelectorProps> = ({ onSelectType }) => {
  // Get the currently selected fact type from the Redux store
  const selectedType = useAppSelector((state) => state.facts.selectedType);

  // Use Chakra UI's useBreakpointValue hook for responsive design
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const flexDirection = useBreakpointValue({ base: 'column', sm: 'row' }) as 'column' | 'row';

  return (
    <Flex 
      direction={flexDirection}
      justify="center"
      align="center"
      wrap="wrap"
      gap={2}
      width="100%"
    >
      <Button
        onClick={() => onSelectType('cat')}
        colorScheme="teal"
        variant={selectedType === 'cat' ? 'solid' : 'outline'}
        leftIcon={<span role="img" aria-label="cat">🐱</span>}
        size={buttonSize}
        flexGrow={1}
        maxWidth={{ base: '100%', sm: '150px' }}
      >
        Cat Facts
      </Button>
      <Button
        onClick={() => onSelectType('dog')}
        colorScheme="blue"
        variant={selectedType === 'dog' ? 'solid' : 'outline'}
        leftIcon={<span role="img" aria-label="dog">🐶</span>}
        size={buttonSize}
        flexGrow={1}
        maxWidth={{ base: '100%', sm: '150px' }}
      >
        Dog Facts
      </Button>
      <Button
        onClick={() => onSelectType('both')}
        colorScheme="purple"
        variant={selectedType === 'both' ? 'solid' : 'outline'}
        leftIcon={<span role="img" aria-label="both">🐾</span>}
        size={buttonSize}
        flexGrow={1}
        maxWidth={{ base: '100%', sm: '150px' }}
      >
        Both
      </Button>
    </Flex>
  );
};
