from crewai import Task
from tools import tool

def create_research_task(topic, agent):
    return Task(
        description=(
            f"Identify the next big trend in {topic}. "
            "Focus on identifying pros and cons and the overall narrative. "
            "Your final report should clearly articulate the key points, "
            "its market opportunities, and potential risks."
        ),
        expected_output=f'A comprehensive 3 paragraphs long report on the latest AI trends in {topic}.',
        tools=[tool],
        agent=agent,
    )

def create_write_task(topic, agent):
    return Task(
        description=(
            f"Compose an insightful article on {topic}. "
            "Focus on the latest trends and how it's impacting the industry. "
            "This article should be easy to understand, engaging, and positive."
        ),
        expected_output=f'A 4 paragraph article on {topic} advancements formatted as markdown.',
        tools=[tool],
        agent=agent,
        async_execution=False,
        output_file='new-blog-post.md'  
    )