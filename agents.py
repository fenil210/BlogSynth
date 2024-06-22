from crewai import Agent
from tools import tool
from dotenv import load_dotenv

load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI
import os

# call the gemini models
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash",
                             verbose=True,
                             temperature=0.5,
                             google_api_key=os.getenv("GOOGLE_API_KEY"))

# Creating a senior researcher agent with memory and verbose mode
cybersecurity_researcher = Agent(
    role="Senior Researcher",
    goal='Uncover groundbreaking technologies in {topic}',
    verbose=True,
    memory=True,
    backstory=(
        "You are a seasoned cybersecurity expert, deeply passionate about"
        "staying ahead of cyber threats. Your mission is to discover"
        "innovative AI technologies that can revolutionize threat detection"
        "and defense mechanisms."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=True
)

# creating a writer agent with custom tools responsible for writing news blogs
cybersecurity_writer = Agent(
    role='Writer',
    goal='Narrate compelling tech stories about {topic}',
    verbose=True,
    memory=True,
    backstory=(
        "With a background in cybersecurity journalism, you excel at"
        "translating complex security concepts into engaging and informative"
        "stories. Your goal is to highlight the latest advancements in AI-driven"
        "cybersecurity and threat detection."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=False
)
