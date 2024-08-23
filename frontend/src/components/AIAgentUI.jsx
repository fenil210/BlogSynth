import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  useToast,
  List,
  ListItem,
  Spinner,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Fade,
} from '@chakra-ui/react';

const AIAgentUI = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const socket = io('http://localhost:5000');
    
    socket.on('progress', (data) => {
      setProgress((prev) => [...prev, data.message]);
    });

    socket.on('result', (data) => {
      setResult(data.data);
      setLoading(false);
    });

    socket.on('error', (data) => {
      toast({
        title: 'An error occurred.',
        description: data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [toast]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress([]);
    setResult(null);
    try {
      await axios.post('http://localhost:5000/api/run-crew', { topic });
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.response?.data?.error || 'Unable to start the AI agent.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="teal.500">
          Blog Writing Assistant
        </Heading>
        <Text fontSize="lg" textAlign="center" color="gray.500">
          Enter your topic below, and let our AI agent do the rest!
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="Enter a topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              size="lg"
              focusBorderColor="teal.500"
            />
            <Button type="submit" colorScheme="teal" size="lg" isLoading={loading}>
              Start Research & Writing
            </Button>
          </VStack>
        </form>
        {loading && (
          <Box mt={4}>
            <Heading as="h2" size="md">Progress:</Heading>
            <List spacing={2}>
              {progress.map((step, index) => (
                <ListItem key={index}>{step}</ListItem>
              ))}
            </List>
            <Progress size="xs" isIndeterminate colorScheme="teal" mt={4} />
            <Spinner mt={4} color="teal.500" />
          </Box>
        )}
        {showNotification && (
          <Fade in={showNotification}>
            <Alert status="info" variant="left-accent" mt={4}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Stay tuned!</AlertTitle>
                <AlertDescription>
                  Your research & writing is ongoing. Due to higher user traffic, expect minor delay in response.
                </AlertDescription>
              </Box>
            </Alert>
          </Fade>
        )}
        {result && (
          <Box mt={4}>
            <Heading as="h2" size="md" color="teal.500">Research Results:</Heading>
            <Text mt={2} whiteSpace="pre-wrap">{result.research}</Text>
            <Heading as="h2" size="md" mt={4} color="teal.500">Generated Blog:</Heading>
            <Text mt={2} whiteSpace="pre-wrap">{result.article}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default AIAgentUI;
