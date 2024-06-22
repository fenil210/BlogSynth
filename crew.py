from crewai import Crew, Process
from tasks import research_task, write_task
from agents import cybersecurity_researcher, cybersecurity_writer


crew = Crew(
    agents=[cybersecurity_researcher, cybersecurity_writer],
    tasks=[research_task, write_task],
    process=Process.sequential,
)

## task init
result = crew.kickoff(inputs={'topic': 'AI in Cybersecurity and Threat Detection'})

print(result)
