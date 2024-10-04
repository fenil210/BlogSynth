# Demo Video:

https://github.com/user-attachments/assets/4536b750-67f9-451f-ba1f-a07041a8f159



# BlogSynth - AI Agent Project-X

## Table of Contents
1. [Introduction](#introduction)
2. [Function Calling and AI Agents](#function-calling-and-ai-agents)
3. [Project Overview](#project-overview)
4. [Installation](#installation)
5. [Usage](#usage)
7. [Configuration](#configuration)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

**BlogSynth - AI Agent Project-X** showcases the implementation of AI agents using the CrewAI framework, with a specific focus on generating high-quality blogs based on user-input topics. The system demonstrates the collaboration of AI agents in performing complex tasks, offering insights into the future potential of AI systems, including the development of LLM-OS (Large Language Model Operating Systems) and AGI (Artificial General Intelligence).

## Function Calling and AI Agents

In the context of AI, function calling allows language models to invoke specific functions or tools to complete tasks. This capability expands their problem-solving abilities, enabling them to interact with external systems, databases, or APIs.

AI agents are autonomous entities powered by AI models that can perceive their environment, make decisions, and take actions to achieve specific goals. The combination of function calling and AI agents forms the foundation for building intelligent systems like LLM-OS and AGI.

- **LLM-OS**: These conceptual systems utilize language models as the primary interface for managing and orchestrating various computational tasks and resources.
- **AGI**: Refers to highly autonomous systems capable of outperforming humans across a wide range of economically valuable tasks, showcasing human-like adaptability.

## Project Overview

**BlogSynth** is designed to assist in writing well-researched and high-quality blogs. The system consists of a frontend and backend, with the backend powered by Flask and the frontend built using React.

### Key Components:
- **Researcher Agent**: Gathers information on the topic provided.
- **Writer Agent**: Structures the gathered information into a coherent blog.
- **Frontend (React)**: User interface for interacting with the AI agents.
- **Backend (Flask)**: Manages the AI agents and coordinates their tasks.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/fenil210/BlogSynth.git
    cd BlogSynth
    ```

2. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    npm install --prefix frontend
    ```

3. Set up environment variables:
   Create a `.env` file in the project root for the backend and frontend and add your API keys:
    ```bash
    GOOGLE_API_KEY="your_google_api_key"  # Get from "https://aistudio.google.com/app"
    SERPER_API_KEY="your_serper_api_key"  # Get from "https://serper.dev/"
    ```

## Usage

### Backend

1. Start the Flask backend server:
    ```bash
    python backend/server.py
    ```
    The backend will run on `http://localhost:5000`.

### Frontend

1. Start the React frontend:
    ```bash
    npm start --prefix frontend
    ```
    The frontend will run on `http://localhost:3000`.

2. Open your browser and navigate to `http://localhost:3000` to interact with the AI agents.


- **backend/**: Contains the core logic of AI agents and tasks.
- **frontend/**: Houses the user interface built with React.
- **server.py**: Main Flask server file.
- **AIAgentUI.jsx**: Main React component handling user interaction.

## Configuration

- Modify the `agents.py` file to adjust agent roles and goals.
- Update `tasks.py` to change the specific tasks assigned to each agent.
- The `.env` file should contain the API keys required for various external services.

## Examples

You can find examples of generated blog posts in the files:
- `new-blog-post.md`
- `new-blog-post_new.md`

## Acknowledgments

Visit [CREW-AI](https://docs.crewai.com/) for more details on the CrewAI framework.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


