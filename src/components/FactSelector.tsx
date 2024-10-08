import React from 'react';
import { Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import { FactType } from '../interfaces/Fact';

/**
 * Props for the FactSelector component
 * @interface FactSelectorProps
 * @property {FactType} selectedType - The currently selected fact type
 * @property {(type: FactType) => void} onSelect - Callback function to handle type selection
 */
interface FactSelectorProps {
  selectedType: FactType;
  onSelect: (type: FactType) => void;
}

/**
 * FactSelector Component
 * 
 * This component renders a set of buttons that allow users to select
 * the type of facts they want to see (cat, dog, or both).
 * It uses Chakra UI for styling and is responsive to different screen sizes.
 *
 * @component
 * @param {FactSelectorProps} props - The props for the FactSelector component
 * @returns {React.FC} A React functional component
 */
export const FactSelector: React.FC<FactSelectorProps> = ({ selectedType, onSelect }) => {
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
      {/* Cat Facts Button */}
      <Button
        onClick={() => onSelect('cat')}
        colorScheme="teal"
        variant={selectedType === 'cat' ? 'solid' : 'outline'}
        leftIcon={<span role="img" aria-label="cat">🐱</span>}
        size={buttonSize}
        flexGrow={1}
        maxWidth={{ base: '100%', sm: '150px' }}
      >
        Cat Facts
      </Button>

      {/* Dog Facts Button */}
      <Button
        onClick={() => onSelect('dog')}
        colorScheme="blue"
        variant={selectedType === 'dog' ? 'solid' : 'outline'}
        leftIcon={<span role="img" aria-label="dog">🐶</span>}
        size={buttonSize}
        flexGrow={1}
        maxWidth={{ base: '100%', sm: '150px' }}
      >
        Dog Facts
      </Button>

      {/* Both (Cat and Dog) Facts Button */}
      <Button
        onClick={() => onSelect('both')}
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
