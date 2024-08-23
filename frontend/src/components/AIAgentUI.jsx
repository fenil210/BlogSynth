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
  ScaleFade,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  IconButton,
  Divider,
  useColorMode,
  useColorModeValue,
  Tooltip,
  SimpleGrid,
  Flex,
  Avatar,
  Tag,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiTrash2, FiMoon, FiSun } from 'react-icons/fi';

const MotionInput = motion(Input);
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionText = motion(Text);

const AIAgentUI = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [history, setHistory] = useState([]);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const boxShadowColor = useColorModeValue('2xl', 'dark-lg');

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('progress', (data) => {
      setProgress((prev) => [...prev, data.message]);
    });

    socket.on('result', (data) => {
      setResult(data.data);
      setHistory((prev) => [...prev, { topic, result: data.data }]);
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
  }, [toast, topic]);

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

  const clearHistory = () => setHistory([]);

  return (
    <MotionBox
      maxWidth="900px"
      margin="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow={boxShadowColor}
      bg={bgColor}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Flex justifyContent="space-between" mb={4}>
        <MotionText
          fontSize="4xl"
          color={useColorModeValue('teal.500', 'teal.300')}
          fontWeight="bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          BlogSynth
        </MotionText>
        <Tooltip label="Toggle Dark Mode">
          <IconButton
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            aria-label="Toggle dark mode"
            onClick={toggleColorMode}
            variant="ghost"
            colorScheme="teal"
          />
        </Tooltip>
      </Flex>

      <Tabs variant="enclosed" colorScheme="teal">
        <TabList>
          <Tab>Generate Blog</Tab>
          <Tab>History</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Text fontSize="lg" textAlign="center" color={textColor}>
                Enter your topic below, and let BlogSynth generate a comprehensive blog for you!
              </Text>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <MotionInput
                    placeholder="Enter a topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    size="lg"
                    focusBorderColor="teal.500"
                    initial={{ x: '-100vw' }}
                    animate={{ x: 0 }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    bg={bgColor}
                    color={textColor}
                  />
                  <MotionButton
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    isLoading={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Research & Writing
                  </MotionButton>
                </VStack>
              </form>

              {loading && (
                <Fade in={loading}>
                  <Box mt={4}>
                    <Heading as="h2" size="md" color="teal.500">Progress:</Heading>
                    <List spacing={2}>
                      {progress.map((step, index) => (
                        <ListItem key={index}>{step}</ListItem>
                      ))}
                    </List>
                    <Progress size="xs" isIndeterminate colorScheme="teal" mt={4} />
                    <Spinner mt={4} color="teal.500" />
                  </Box>
                </Fade>
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
                <ScaleFade initialScale={0.9} in={!!result}>
                  <Box mt={4}>
                    <Heading as="h2" size="md" color="teal.500">Research Results:</Heading>
                    <Text mt={2} whiteSpace="pre-wrap" color={textColor}>{result.research}</Text>
                    <Divider my={4} />
                    <Heading as="h2" size="md" color="teal.500">Generated Blog:</Heading>
                    <Text mt={2} whiteSpace="pre-wrap" color={textColor}>{result.article}</Text>
                    {result.references && (
                      <Box mt={4}>
                        <Heading as="h2" size="md" color="teal.500">References:</Heading>
                        <List spacing={2} mt={2}>
                          {result.references.map((reference, index) => (
                            <ListItem key={index}>
                              <Text as="cite" color={textColor}>{reference}</Text>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                </ScaleFade>
              )}
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Heading size="lg" color="teal.500">Previous Topics</Heading>
                <IconButton
                  icon={<FiTrash2 />}
                  aria-label="Clear history"
                  colorScheme="red"
                  variant="ghost"
                  onClick={clearHistory}
                  isDisabled={history.length === 0}
                />
              </HStack>

              {history.length === 0 ? (
                <Text color={textColor}>No history available. Start generating blogs to see them here!</Text>
              ) : (
                <SimpleGrid columns={[1, null, 2]} spacing={4}>
                  {history.map((entry, index) => (
                    <MotionBox
                      key={index}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow={boxShadowColor}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Text fontSize="lg" fontWeight="bold" color="teal.500">{entry.topic}</Text>
                      <Text mt={2} whiteSpace="pre-wrap" color={textColor}>{entry.result.article}</Text>
                      <Divider my={2} />
                      <HStack spacing={2} alignItems="center">
                        <Avatar size="xs" />
                        <Tag colorScheme="teal">Generated</Tag>
                      </HStack>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MotionBox>
  );
};

export default AIAgentUI;
