import socketio
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import requests
import json
import sys
import time

# Create a new trainer for the chatbot
chatbot = ChatBot(name='Chatbot')
# Train the chatbot based on the list chat
trainer = ListTrainer(chatbot)

conversation = [
    "Bạn khỏe không",
    "Tôi rất khỏe và luôn sẵn sàng hỗ trợ bạn ^^",
    "Ai đã tạo ra bạn",
    "Một sinh viên Bách Khoa đã tạo ra mình đó ^^",
    "Bye",
    "Tạm biệt bạn, chúc bạn học tốt, để khởi động lại mình, hãy tắt và mở box chat 1 lần nữa :)))))",
    "Tôi muốn học về web",
    "Bạn nên học về HTML, CSS, JavaScript, sau đó có thể học thêm 3 Framework nổi tiếng là Angular, ReactJs hoặc VueJs bạn nhé, đừng quên gõ 'html' hoặc 'css',..., mình sẽ tìm giúp bạn ^^",
    "Tôi muốn học về Back-end",
    "Bạn nên học về Php, Node.js, Golang, Python, ExpressJs, ..., đừng quên gõ 'html' hoặc 'css', ..., mình sẽ tìm giúp bạn ^^",
    "Tôi muốn học về data sience",
    "Bạn nên học về Python, Java, SQL, Scala, ..., đừng quên gõ 'html' hoặc 'css',..., mình sẽ tìm giúp bạn ^^",
    "Tôi muốn học về game",
    "Bạn nên học về Python, JavaScipt, C#, C++, ... đừng quên gõ 'html' hoặc 'css',..., mình sẽ tìm giúp bạn ^^",
    "Tôi muốn học về cơ sở dữ liệu",
    "Bạn nên học về Python, SQL, R, C#, ..., đừng quên gõ 'html' hoặc 'css',..., mình sẽ tìm giúp bạn ^^",
    "Tôi muốn học về AI",
    "Bạn nên học về Python, Java, Lisp, C++, ..., đừng quên gõ 'html' hoặc 'css',..., mình sẽ tìm giúp bạn ^^",
]
greeting_1 = [
    "Hello",
    "Xin chào, bạn muốn học khóa học liên quan tới gì? Ví dụ: 'html','css',...",
]
greeting_2 = [
    "Hi",
    "Xin chào, bạn muốn học khóa học liên quan tới gì? Ví dụ: 'html','css',...",
]
greeting_3=[
    "Xin chào",
    "Xin chào, bạn muốn học khóa học liên quan tới gì? Ví dụ: 'html','css',...",
]
trainer.train(conversation)
trainer.train(greeting_1)

sio = socketio.Client()


@ sio.event
def connect():
    print("I'm connected!")


@ sio.event
def disconnect():
    print("I'm disconnected!")


def send_message(msg):
    sio.emit('message', {
        'user': 'chatbot',
        'room': sys.argv[1],
        'message': msg,
    })


COURSE_INPUTS = ("html", "css", "javascript", "nodejs",
                 "php", "python", "java", "expressjs", "sql", "c++", "c#", "r")


@ sio.event
def new_message(data):
    if(data['user'] != 'chatbot'):
        if(data['message'].lower() in COURSE_INPUTS):
            courses = json.dumps(requests.get(
                "http://localhost:3000/search/" + data['message']).json(), ensure_ascii=False)
            if(courses == '[]'):
                # trainer.train(
                #     [data['message'], 'Xin lỗi, hiện tại bên mình chưa có khóa học nào liên quan tới từ khóa bạn nhập ạ @@'])
                # response = chatbot.get_response(data['message'])
                # send_message(response.serialize()['text'])
                send_message(
                    'Xin lỗi, hiện tại bên mình chưa có khóa học nào liên quan tới từ khóa bạn nhập ạ @@')
            else:
                # trainer.train([data['message'], courses])
                # response = chatbot.get_response(data['message'])
                # send_message(response.serialize()['text'])
                send_message(courses)
        else:
            response = chatbot.get_response(data['message'])
            send_message(response.serialize()['text'])
        if(data['message'] == 'bye' or data['message'] == 'Bye'):
            response = chatbot.get_response(data['message'])
            send_message(response.serialize()['text'])
            sio.emit('leave', {'user': 'chatbot', 'room': sys.argv[1]})
            time.sleep(1)
            sio.disconnect()


sio.connect('http://localhost:3000')
sio.emit('join', {'user': 'chatbot', 'room': sys.argv[1]})
send_message(
    'Xin chào, mình là eLearn, mình có thể giúp bạn tìm khoá học bạn muốn, nếu muốn dừng cuộc trò chuyện này, hãy gõ "bye", xin cảm ơn.')
