#include "IPC.h"


void IPC_ClientSentMessage(IPCmessageToDaemon msg){
	int pipe;
	
	char* pipeName = "/tmp/clientToDaemonFIFO";
	mkfifo(pipeName, 0666);
	pipe = open(pipeName, O_WRONLY);

	write(pipe, &msg, sizeof(IPCmessageToDaemon));

	close(pipe);
}

IPCmessageToDaemon* IPC_DaemonReciveMessage(){
	int pipe;
	IPCmessageToDaemon msg;

	char* pipeName = "/tmp/clientToDaemonFIFO";
	mkfifo(pipeName, 0666);
	pipe = open(pipeName, O_RDONLY);
	read(pipe, &msg, sizeof(IPCmessageToDaemon));
	

	close(pipe);
	
	IPCmessageToDaemon *cpy_msg = (IPCmessageToDaemon*)malloc(sizeof(IPCmessageToDaemon));
	strcpy(cpy_msg->source, msg.source);
	strcpy(cpy_msg->destination, msg.destination);
	strcpy(cpy_msg->task, msg.task);
	cpy_msg->jobID = msg.jobID;

	return cpy_msg;
}

void IPC_DaemonSentMessage(IPCmessageToClient msg) {
	int pipe;
	char* pipeName = "/tmp/daemonToClientFIFO";
	mkfifo(pipeName, 0666);
	pipe = open(pipeName, O_WRONLY);

	write(pipe, &msg, sizeof(IPCmessageToClient));

	close(pipe);
}

IPCmessageToClient IPC_ClientReciveMessage() {
	int pipe;
	IPCmessageToClient msg;

	char* pipeName = "/tmp/daemonToClientFIFO";
	mkfifo(pipeName, 0666);
	pipe = open(pipeName, O_RDONLY);

	read(pipe, &msg, sizeof(IPCmessageToClient));


	close(pipe);
	return msg;
}