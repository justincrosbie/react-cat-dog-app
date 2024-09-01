import React, { useState } from 'react';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import { FactsContent } from './components/FactsContent';
import { FactType } from './interfaces/Fact';

/**
 * Main App component that sets up the application structure and manages global state
 * @returns {JSX.Element} The rendered App component
 */
const App: React.FC = () => {
  // State for the selected fact type
  return (
    <ChakraProvider>
      <Box bgGradient="linear(to-r, teal.500, blue.500)" minH="100vh" py={4}>
        <Container maxW="container.md" px={4}>
          <FactsContent/>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;