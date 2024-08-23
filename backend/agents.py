from crewai import Agent
from tools import tool
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

# call the gemini models
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash",
                             verbose=True,
                             temperature=0.5,
                             google_api_key=os.getenv("GOOGLE_API_KEY"))

def generate_backstory(role, topic):
    prompt = f"Generate a backstory for a {role} specializing in {topic}. The backstory should be 2-3 sentences long, highlighting their expertise and passion for the subject."
    response = llm.invoke(prompt)
    return response.content

def create_cybersecurity_researcher(topic):
    backstory = generate_backstory("Senior Researcher", topic)
    return Agent(
        role="Senior Researcher",
        goal=f'Uncover groundbreaking technologies in {topic}',
        verbose=True,
        memory=True,
        backstory=backstory,
        tools=[tool],
        llm=llm,
        allow_delegation=True
    )

def create_cybersecurity_writer(topic):
    backstory = generate_backstory("Writer", topic)
    return Agent(
        role='Writer',
        goal=f'Narrate compelling tech stories about {topic}',
        verbose=True,
        memory=True,
        backstory=backstory,
        tools=[tool],
        llm=llm,
        allow_delegation=False
    )