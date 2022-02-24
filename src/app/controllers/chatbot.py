import socketio
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import requests
import json
sio = socketio.Client()
# Create a new trainer for the chatbot
chatbot = ChatBot(name='Ron Obvious', storage_adapter='chatterbot.storage.SQLStorageAdapter',
                  database_uri='sqlite:///database.sqlite3')
chatbot.read_only = True

# Train the chatbot based on the list chat
trainer = ListTrainer(chatbot)

trainer.train([
    'Hi',
    "Xin chào, bạn muốn học khóa học liên quan tới gì? Ví dụ: 'html','css',...",
])


@sio.event
def connect():
    print("I'm connected!")


@sio.event
def disconnect():
    print("I'm disconnected!")


def send_message(msg):
    sio.emit('message', {
        'user': 'chatbot',
        'room': 'room-1',
        'message': msg,
    })


COURSE_INPUTS = ("html", "css", "javascript", "nodejs")


@sio.event
def new_message(data):
    if(data['user'] != 'chatbot'):
        if(data['message'] in COURSE_INPUTS):
            courses = json.dumps(requests.get(
                "http://localhost:3000/search/" + data['message']).json(), ensure_ascii=False)
            trainer.train([data['message'], courses])
            response = chatbot.get_response(data['message'])
            send_message(response.serialize()['text'])
        else:
            response = chatbot.get_response(data['message'])
            send_message(response.serialize()['text'])


sio.connect('http://localhost:3000')
sio.emit('join', {'user': 'chatbot', 'room': 'room-1'})
send_message(
    'Xin chào, mình là eLearn, mình có thể giúp bạn tìm khoá học bạn muốn, nếu muốn dừng cuộc trò chuyện này, hãy gõ "bye", xin cảm ơn.')
sio.wait()
