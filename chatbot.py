import numpy as np
import nltk
import string
import random
from os import path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

f = open(path.abspath('src/data/chatbot.txt'), 'r',
         newline='', encoding="utf-8", errors='ignore')
raw_doc = f.read()
raw_doc = raw_doc.lower()  # convert text to lowercase
nltk.download('punkt')  # using the punkt tokenizer
nltk.download('wordnet')  # using the wordnet dictionary
sent_tokens = nltk.sent_tokenize(raw_doc)  # convert doc to list of sentences
word_tokens = nltk.word_tokenize(raw_doc)  # convert doc to list of words

# Text perprocessing
lemmer = nltk.stem.WordNetLemmatizer()
# WordNet is a semantically-oriented dictionary of English include in NLTK


def LemToekn(tokens):
    return [lemmer.lemmatize(token) for token in tokens]


remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)


def LemNormalize(text):
    return LemToekn(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


# Defining the greeting function
GREETING_INPUTS = ("hello", "hi", "greetings", "sups", "what's up", "hey")
GREET_RESPONSE = ["hi", "hey", "*nods*", "hi there",
                  "hello", "I am glad! You are talking to me"]


def greet(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREET_RESPONSE)

# Response generation


def response(user_response):
    robo1_response = ''
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf == 0):
        robo1_response = robo1_response+"I am sorry! I don't understand you"
        return robo1_response
    else:
        robo1_response = robo1_response+sent_tokens[idx]
        return robo1_response


# Define conversation start/end protocols
flag = True
print("BOT: My name is Let's Learn. Let's have a conversation! Also, if you want to exit any time, just type Bye!")
while(flag == True):
    user_response = input()
    user_response = user_response.lower()
    if(user_response != 'bye'):
        if(user_response == 'thanks' or user_response == 'thank you'):
            flag = False
            print("BOT: You are welcome..")
        else:
            if(greet(user_response) != None):
                print("BOT: " + greet(user_response))
            else:
                sent_tokens.append(user_response)
                word_tokens = word_tokens+nltk.word_tokenize(user_response)
                final_words = list(set(word_tokens))
                print("BOT: ", end="")
                print(response(user_response))
                sent_tokens.remove(user_response)
    else:
        flag = False
        print("BOT: Goodbye! Take care <3 ")
