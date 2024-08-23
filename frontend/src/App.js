import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AIAgentUI from './components/AIAgentUI';

function App() {
  return (
    <ChakraProvider>
      <AIAgentUI />
    </ChakraProvider>
  );
}

export default App;