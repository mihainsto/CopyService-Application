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
    output = os.popen('./client status '+str(id)).readlines()
    print(output)
    return output[0].replace("\n", "")

def stopeaza(id):
    output = os.popen('./client stop '+str(id)).readlines()
    print(output)
    return output

def suspenda(id):
    output = os.popen('./client suspend '+str(id)).readlines()
    print(output)
    return output

def resume1(id):
    output = os.popen('./client resume '+str(id)).readlines()
    print(output)
    return output

def allJobsClient():
    output = os.popen('./client getJobs').readlines()
    print(output)
    output = [x.replace('\n','') for x in output]
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
        try:
            os.remove(to)
        except:
            pass
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
        print(number)
        id = number['id']
        
        to_return = {}
        to_return['status'] = "OK"
        to_return['data'] = suspenda(id)
        return json.dumps(to_return)

@app.route('/resume', methods=['POST'])
def resume():
    if request.method == 'POST':
        number = json.loads(request.data)
        id = number['id']
        to_return = {}
        to_return['status'] = "OK"
        to_return['data'] = resume1(id)
        return json.dumps(to_return)
        
@app.route('/allJobs', methods=['POST'])
def allJobs():
    if request.method == 'POST':
        allJobsClientAr = allJobsClient()
        print(allJobsClient)
        to_return = {}
        to_return['status'] = "OK"
        to_return['data'] = allJobsClientAr
        return json.dumps(to_return)

@app.route('/')
def main():
    return 'merge bandaaa'

if __name__ == '__main__':
    app.run()
