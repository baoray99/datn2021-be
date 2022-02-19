import socketio
from os import path
from nltk.stem import WordNetLemmatizer
import nltk
import io
import random
import string  # to process standard python strings
import warnings
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings('ignore')

nltk.download('popular', quiet=True)  # for downloading packages
# nltk.download('punkt') # first-time use only
# nltk.download('wordnet') # first-time use only

f = open(path.abspath('src/data/chatbot.txt'), 'r',
         newline='', encoding="utf-8", errors='ignore')
raw = f.read()
raw = raw.lower()  # converts to lowercase

sent_tokens = nltk.sent_tokenize(raw)  # converts to list of sentences

lemmer = nltk.stem.WordNetLemmatizer()
# WordNet is a semantically-oriented dictionary of English included in NLTK.


def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]


remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)


def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey",)
GREETING_RESPONSES = ["hi", "hey", "*nods*", "hi there",
                      "hello", "I am glad! You are talking to me"]


def greeting(sentence):

    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)


def response(user_response):
    word_tokens = nltk.word_tokenize(raw)  # converts to list of words
    robo_response = ''
    sent_tokens.append(user_response)
    word_tokens = word_tokens+nltk.word_tokenize(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf == 0):
        robo_response = robo_response+"I am sorry! I don't understand you"
        return robo_response
    else:
        robo_response = robo_response+sent_tokens[idx]
        return robo_response


sio = socketio.Client()


@sio.event
def connect():
    print("I'm connected!")


@sio.event
def connect_error(data):
    print(data)


@sio.event
def disconnect():
    print("I'm disconnected!")


@sio.event
def send_message(msg):
    sio.emit('message', {
        'user': 'chatbot',
        'room': 'room-1',
        'message': msg,
    })


@sio.on('new message')
def get_message(msg):
    user_response = msg['message']
    user_response = user_response.lower()
    if(user_response != 'bye'):
        if(user_response == 'thanks' or user_response == 'thank you'):
            send_message("ROBO: You are welcome..")
        else:
            if(greeting(user_response) != None):
                send_message("ROBO: "+greeting(user_response))
            else:
                if(response(user_response) != None):
                    send_message(response(user_response))
                    sent_tokens.remove(user_response)
    else:
        send_message("ROBO: Bye! take care..")


sio.connect('http://localhost:3000')
sio.emit('join', {'user': 'chatbot', 'room': 'room-1'})
send_message(
    'Xin chào, mình là eLearn, mình có thể giúp bạn tìm khoá học bạn muốn, nếu muốn dừng cuộc trò chuyện này, hãy gõ "bye", xin cảm ơn.')
print("Chatbot active")

# Define conversation start/end protocols
# flag = True
# while(flag == True):
#     user_response = ""
#     user_response = user_response.lower()
#     if(user_response != 'bye'):
#         if(user_response == 'thanks' or user_response == 'thank you'):
#             flag = False
#             send_message('BOT: You are welcome..')
#         else:
#             if(greet(user_response) != None):
#                 send_message(greet(user_response))
#             else:
#                 print("BOT: ", end="")
#                 send_message(response(user_response))
#                 sent_tokens.remove(user_response)
#     else:
#         flag = False
#         send_message("BOT: Goodbye! Take care <3 ")
#         sio.disconnect()


# def rep(msg):
#     sent_tokens.append(user_response)
#     word_tokens = word_tokens+nltk.word_tokenize(user_response)
#     final_words = list(set(word_tokens))
#     print("BOT: ", end="")
#     print(response(user_response))
#     sent_tokens.remove(user_response)
