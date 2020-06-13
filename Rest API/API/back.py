from flask import Flask, request
from flask_cors import CORS
import os
import json

a  = os.popen('pwd').readlines()

app = Flask(__name__)

CORS(app)

def copiere(from_,to):
    output = os.popen('./client copy '+from_+' '+to).readlines()
    print(output)
    return int(output[0])

def statusCS(id):
    output = os.popen('./client status '+id).readlines()
    print(output)
    return output

def stopeaza(id):
    output = os.popen('./client stop '+id).readlines()
    print(output)
    return output

def suspenda(id):
    output = os.popen('./client suspend '+id).readlines()
    print(output)
    return output

def resume1(id):
    output = os.popen('./client resume '+id).readlines()
    print(output)
    return output



@app.route('/copy', methods=['POST'])
def copy():
    if request.method == 'POST':
        locatie = json.loads(request.data)
        print(locatie)
        from_ = locatie['from']
        to = locatie['to']
        print(from_)
        print(to)
        to_return = {}
        to_return['status'] = "OK"
        to_return['id'] = copiere(from_,to)
        print(to_return)
      	
        return json.dumps(to_return)


@app.route('/status', methods=['POST'])
def status():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        to_return = {}
        to_return['status'] = "OK"
        to_return['data'] = statusCS(id)
        return json.dumps(to_return)


@app.route('/stop', methods=['POST'])
def stop():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        to_return = {}
        to_return['status'] = "OK"
        to_return['data'] = stopeaza(id)
        
        return json.dumps(to_return)


@app.route('/suspend', methods=['POST'])
def suspend():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        
        to_return = {}
        to_return['status'] = "OK"
        to_return['data'] = suspenda(id)
        return json.dumps(to_return)

@app.route('/resume', methods=['POST'])
def resume():
    if request.method == 'POST':
        number = json.loads(request.data)
        to_return = {}
        to_return['status'] = "OK"
        to_return['data'] = resume1(id)
        return json.dumps(to_return)


@app.route('/')
def main():
    return 'merge bandaaa'

if __name__ == '__main__':
    app.run()
