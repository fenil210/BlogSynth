from crewai import Crew, Process
from tasks import create_research_task, create_write_task
from agents import create_cybersecurity_researcher, create_cybersecurity_writer

def create_crew(topic):
    cybersecurity_researcher = create_cybersecurity_researcher(topic)
    cybersecurity_writer = create_cybersecurity_writer(topic)
    
    research_task = create_research_task(topic, cybersecurity_researcher)
    write_task = create_write_task(topic, cybersecurity_writer)

    return Crew(
        agents=[cybersecurity_researcher, cybersecurity_writer],
        tasks=[research_task, write_task],
        process=Process.sequential,
    )

def run_crew(topic):
    crew = create_crew(topic)
    
    yield f"Starting research on {topic}"
    research_result = crew.tasks[0].execute()
    yield f"Research completed. Writing article..."
    article = crew.tasks[1].execute()
    
    yield {
        "research": research_result,
        "article": article
    }