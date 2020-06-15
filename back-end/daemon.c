#include "IPC.h"
#include "threadService.h"


int main() {
    maxThreads = 4;

    int currentJobs[1024];
    int noCurentJobs = 0;


    while (1) {
        IPCmessageToDaemon *client_message;
        IPCmessageToClient sentmessage;
        client_message = IPC_DaemonReciveMessage();
        printf("%s\n", client_message->task);
        if (strcmp(client_message->task, "copy") == 0)
        {
            printf("Starting copy job!\n");
            int id = copyThread(client_message);
            noCurentJobs ++;
            currentJobs[noCurentJobs - 1] = id;
            sentmessage.jobId = id;
            printf("Successfully started copy job with id %d \n", id);
            IPC_DaemonSentMessage(sentmessage);
        }else if (strcmp(client_message->task, "status") == 0)
        {
            printf("Requesting status for job with id: %d \n", client_message->jobID);
            float status = statusThread(client_message->jobID);
            printf("Successfully requested the copy status: %f \n", status);
            sentmessage.status = status;
            IPC_DaemonSentMessage(sentmessage);
        }
        else if (strcmp(client_message->task, "stop") == 0)
        {
            printf("Requesting stop for job with id: %d \n", client_message->jobID);
            stopThread(client_message->jobID);
            for (int i = 0; i < noCurentJobs; ++i){
                if (currentJobs[i] == client_message->jobID){
                    for(int k = i; k < noCurentJobs -1; ++k){
                        currentJobs[k] = currentJobs[k+1];
                    }
                    noCurentJobs --;
                    break;
                }
            }
        }
        else if (strcmp(client_message->task, "suspend") == 0)
        {
            printf("Requesting suspend for job with id: %d \n", client_message->jobID);
            pauseThread(client_message->jobID);
        }
        else if (strcmp(client_message->task, "resume") == 0)
        {
            printf("Requesting resume for job with id: %d \n", client_message->jobID);
            resumeThread(client_message->jobID);
        }
        else if(strcmp(client_message->task, "getJobs") == 0){
            printf("Requesting all running jobs \n");
            for (int i = 0; i < noCurentJobs; ++i){
                if(statusThread(currentJobs[i]) >= 0.95){ //Job is almost done, we can consider it finished
                    for(int k = i; k < noCurentJobs -1; ++k){
                        currentJobs[k] = currentJobs[k+1];
                    }
                    noCurentJobs--;
                } 
            }
            printf("Will return %d jobs \n", noCurentJobs);
            sentmessage.activeJobs[0] = noCurentJobs;
            for (int i = 0; i<noCurentJobs; ++i){
                sentmessage.activeJobs[i+1] = currentJobs[i];
                printf("%d \n", sentmessage.activeJobs[i]);
            }
            IPC_DaemonSentMessage(sentmessage);

        }

    }
    return 0;
}


