#include "IPC.h"
#include "threadService.h"


int main() {
    maxThreads = 2;


    while (1) {
        IPCmessageToDaemon client_message;
        IPCmessageToClient sentmessage;
        client_message = IPC_DaemonReciveMessage();
        printf("%s\n", client_message.task);
        if (strcmp(client_message.task, "copy") == 0)
        {
            printf("Starting copy job!\n");
            sentmessage.jobId = id;
            printf("Successfully started copy job with id %d \n", id);
            IPC_DaemonSentMessage(sentmessage);
        }
        else if (strcmp(client_message.task, "status") == 0)
        {
            printf("Requesting status for job with id: %d \n", client_message.jobID);
            float status = statusThread(client_message.jobID);
            printf("Successfully requested the copy status: %f \n", status);
            sentmessage.status = status;
            IPC_DaemonSentMessage(sentmessage);
        }
        else if (strcmp(client_message.task, "stop") == 0)
        {
            printf("Requesting stop for job with id: %d \n", client_message.jobID);
            stopThread(client_message.jobID);
        }
        else if (strcmp(client_message.task, "suspend") == 0)
        {
            printf("Requesting suspend for job with id: %d \n", client_message.jobID);
            pauseThread(client_message.jobID);
        }
        else if (strcmp(client_message.task, "resume") == 0)
        {
            printf("Requesting resume for job with id: %d \n", client_message.jobID);
            resumeThread(client_message.jobID);
        }
        /*printf("%s\n",client_message.task);
        printf("%s\n", client_message.source);
        printf("%s\n", client_message.destination);
        printf("%d\n", client_message.jobID);*/

    }
    return 0;
}


