from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer
import requests
import json
# Create a new trainer for the chatbot
chatbot = ChatBot(name='Ron Obvious')

# Train the chatbot based on the list chat
trainer = ListTrainer(chatbot)


trainer.train([
    'Hi',
    'Hello',
    'I need your assistance regarding my order',
    'Please, Provide me with your order id',
    'I have a complaint.',
    'Please elaborate, your concern',
    'How long it will take to receive an order ?',
    'An order takes 3-5 Business days to get delivered.',
    'Okay Thanks',
    'No Problem! Have a Good Day!',
    'con cak',
    'cai lon',
])


def listToString(s):

    # initialize an empty string
    str1 = ""

    # traverse in the string
    for ele in s:
        str1 += ele

    # return string
    return str1


while True:
    courses = requests.get(
        "http://localhost:3000/search/html").json()
    courses = json.dumps(courses, ensure_ascii=False)
    print(courses)
    request = input()
    if (request == 'Bye' or request == 'bye'):
        print('Bot: Bye')
        break
    else:
        response = chatbot.get_response(request)
        print(response.serialize()['text'])
