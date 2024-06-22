# AI Agent Project-X

## Table of Contents
1. [Introduction](#introduction)
2. [Function Calling and AI Agents](#function-calling-and-ai-agents)
3. [Project Overview](#project-overview)
4. [Installation](#installation)
5. [Usage](#usage)
6. [File Structure](#file-structure)
7. [Configuration](#configuration)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

This project demonstrates the implementation of AI agents using the CrewAI framework. It showcases how multiple AI agents can collaborate to perform complex tasks, paving the way for more advanced AI systems and potentially contributing to the development of LLM-OS (Large Language Model Operating Systems) and AGI (Artificial General Intelligence).

## Function Calling and AI Agents

Function calling in the context of AI refers to the ability of language models to invoke specific functions or tools to complete tasks. This capability allows AI models to interact with external systems, databases, or APIs, greatly expanding their problem-solving abilities.

AI agents are autonomous entities powered by AI models that can perceive their environment, make decisions, and take actions to achieve specific goals. They represent a significant step towards more intelligent and versatile AI systems.

The combination of function calling and AI agents is seen as a potential building block for LLM-OS and AGI:

- **LLM-OS (Large Language Model Operating Systems)**: These are conceptual systems where language models serve as the primary interface for managing and orchestrating various computational tasks and resources.
- **AGI (Artificial General Intelligence)**: This refers to highly autonomous systems that outperform humans at most economically valuable work, showcasing human-like adaptability across diverse domains.

By leveraging function calling and agent-based architectures, this project demonstrates a small-scale example of how AI systems can be designed to tackle complex, multi-step tasks through collaboration and specialized roles.

## Project Overview

This project implements a crew of AI agents specializing in cybersecurity research and writing. The agents collaborate to research emerging trends in AI-driven cybersecurity and produce informative articles on the subject.

Key components:
- Cybersecurity Researcher Agent
- Cybersecurity Writer Agent
- Task definitions for research and writing
- Integration with external tools for web searches

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/ai-agent-project.git
cd ai-agent-project
```

2. Install required dependencies:
```
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the project root and add your API keys:
```
GOOGLE_API_KEY="your_google_api_key" (from "https://aistudio.google.com/app")
SERPER_API_KEY="your_serper_api_key" (from "https://serper.dev/")
```

## Usage

Run the main script to start the AI agent crew:
```
python crew.py
```

This will initiate the research and writing tasks, producing a markdown file with the results.

## File Structure

- `crew.py`: Main script that initializes and runs the AI agent crew
- `agents.py`: Defines the AI agents and their characteristics
- `tasks.py`: Specifies the tasks to be performed by the agents
- `tools.py`: Implements external tools used by the agents (e.g., web search)
- `.env`: Contains API keys and other environment variables

## Configuration

Modify the `agents.py` file to adjust agent roles, goals, and backstories. Update `tasks.py` to change the specific tasks assigned to each agent.

## Find 2 examples of generated blog post in
```
new-blog-post.md
new-blog-post_new.md
```
