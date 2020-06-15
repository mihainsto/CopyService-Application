import os

os.system('gcc -pthread daemon.c IPC.c threadService.c -o daemon')
os.system('gcc -pthread client.c IPC.c -o client')

