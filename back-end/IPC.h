#pragma once
#include <stdio.h> 
#include <string.h> 
#include <fcntl.h> 
#include <sys/stat.h> 
#include <sys/types.h> 
#include <unistd.h>

/*  \file IPC.h
	\breif Inter Process Communication Library

	Inter-Process communication library that allows the deamon and the client to send and recive messages in a defined way.	


*/


/*	\struct IPCmessageToDaemon
	\breif Struct contains the source, destination, the task and the type of job.
	\param source Char array with len of 1024, contains the source from where it should copy.
	\param destination Char array with len of 1024, contains the destination to where it should copy.
	\param task Char array with len of 1024, tells the deamon what job it should accomplish:
						-"copy" = tells the deamon to start a copy tipe job
						-"status" = gets the status of a curent job
						-"stop" = stops a job
						-"suspent" = pauses / suspends a job
						-"resume" = resumes a job
						- \warning A wrong typed task will result in the deamon doing nothing.
	\param jobID Integer, tells us the thread id.

*/
typedef struct IPCmessageToDaemon {
	char source[1024];
	char destination[1024];
	
	char task[1024];
	int jobID;
} IPCmessageToDaemon;


/*	\strtuct IPCmessageToClient
	\breif Struct contains the id of the curent job, the status and a list of other jobs.
	\param jobList Integer arrray with len of 1024.
	\param jobId  Integer, tells us the id / thread id.
	\param status Float, the status of the current job. 

*/
typedef struct IPCmessageToClient {
	int jobList[1024];
	int activeJobs[1024];
	int jobId;
	float status;
} IPCmessageToClient;


/*  \fn IPC_ClientSentMessage(IPCmessageToDeamon msg)
	\breif Send the IPCmessageToDaemon struct to the Daemon.
	\param msg The  message sent to the deamon.
	\returns void
	\warning Use only in Clients!
*/
void IPC_ClientSentMessage(IPCmessageToDaemon msg);


/*
	\fn IPC_DaemonReciveMessage()
	\breif Recive the IPCmessageToDaemon struct
	\params None
	\returns The message from Deamon
	\warning Use only in Daemon
*/
IPCmessageToDaemon* IPC_DaemonReciveMessage();


/*  \fn IPC_DaemonSentMessage(IPCmessageToClient msg)
	\breif Send the IPCmessageToClient struct to the Client
	\params msg The message to be sent to the Client
	\returns void
	\warning Use only in Daemon
*/
void IPC_DaemonSentMessage(IPCmessageToClient msg);


/*	\fn IPCmessageToClient IPC_ClientReciveMessage()
	\breif Recive the IPCmessageToClient struct
	\params None
	\returns The message from Client
	\Warning Use only in Clients
*/
IPCmessageToClient IPC_ClientReciveMessage();


/*
Daemon Example:

#include "IPC.h"

int main() {
	IPCmessageToDaemon message;
	IPCmessageToClient sentmessage;

	while (1) {
		message = IPC_DaemonReciveMessage(); // Here the program stops and waits for a message
		printf("message recived\n");
		printf("%s\n", message.source);

		sentmessage.jobId = 5;
		IPC_DaemonSentMessage(sentmessage); // Sending message back to client
	}
	return 0;
}


Client Example:

#include "IPC.h"

int main() {
	IPCmessageToDaemon message;

	strcpy(message.source, "/c/test");
	IPC_ClientSentMessage(message);
	printf("Message sent \n");

	IPCmessageToClient reciveMessage;
	reciveMessage = IPC_ClientReciveMessage();

	printf("%d\n", reciveMessage.jobId);
	return 0;
}
*/