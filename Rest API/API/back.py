from flask import Flask, request, json
from flask_cors import CORS
import subprocess
app = Flask(__name__)

CORS(app)

def copiere(from_,to):
    output = subprocess.check_output(['./copy', 'from_' , 'to'])
    print(output)

def status(id):
    output = subprocess.check_output(['./status', 'id'])
    print(output)

def stopeaza(id):
    output = subprocess.check_output(['./status', 'id'])
    print(output)

def suspenda(id):
    output = subprocess.check_output(['./status', 'id'])
    print(output)

def resume1(id):
    output = subprocess.check_output(['./status', 'id'])
    print(output)



@app.route('/copy', methods=['POST'])
def copy():
    if request.method == 'POST':
        locatie = json.loads(request.data)
        print(locatie)
        from_ = locatie['from']
        to = locatie['to']
        print(from_)
        print(to)
        return copiere(from_,to)


@app.route('/status', methods=['POST'])
def status():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        return status(id)


@app.route('/stop', methods=['POST'])
def stop():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        return stopeaza(id)


@app.route('/suspend', methods=['POST'])
def suspend():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        return suspenda(id)

@app.route('/resume', methods=['POST'])
def resume():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        return resume1(id)


@app.route('/')
def main():
    return 'merge bandaaa'

if __name__ == '__main__':
    app.run()