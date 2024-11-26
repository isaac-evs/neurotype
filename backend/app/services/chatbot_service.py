import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_chatbot_response(user_message: str) -> str:
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"You are a mental health assistant.\nUser: {user_message}\nAssistant:",
        max_tokens=150,
        n=1,
        stop=["\n", "User:", "Assistant:"],
        temperature=0.7,
    )
    answer = response.choices[0].text.strip()
    return answer
