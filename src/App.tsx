import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import { FactsContent } from './components/FactsContent';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
          <Box bgGradient="linear(to-r, teal.500, blue.500)" minH="100vh" py={4}>
            <Container maxW="container.md" px={4}>
              <FactsContent />
            </Container>
          </Box>
      </ChakraProvider>
    </Provider>
  );
};

export default App;