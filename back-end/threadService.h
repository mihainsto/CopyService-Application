#pragma once

/*  \file threadService.h
	\breif Thread Service Libraray.

	Thread Service is a Library that allows the start, pause, resume and cancel of a copy job.
*/


#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include <errno.h>
#include <sys/stat.h>
#include <string.h>
#include <signal.h>
#include "IPC.h"

/*  \var pthread_t threads[1024]
	\breif Array of threads, used to store thee jobs on independent threads
*/
pthread_t threads[1024];


/*	\var int maxThreads
	\breif The maximum number of threads that can run in the same time. Configurabile.
*/
int maxThreads;


/*	\var int pause_status[1024]
	\breif Array of ints that store the status of the thread (running/paused/stopped).
*/
int pause_status[1024];


/*	\var float progress[1024]
	\breif Array of floats that store the progress of the thread (from 0=no progress to 1=done)
*/
float progress[1024];


/*	\var pthread_mutex_t mtx
	\breif General mutex, for all type of jobs
*/
pthread_mutex_t mtx;


/*	\var pthread_mutex_t copyThreadMutex
	\breif Mutex for the copy jobs
*/
pthread_mutex_t copyThreadMutex;


/*	\var phtread_mutex_t pauseMutex
	\breif Mutex got the pause jobs
*/
pthread_mutex_t pauseMutex;
pthread_mutex_t pauseMutex;


/*	\var phtread_mutex_t progressMutex
	\breif Mutex ffor the progress jobs
*/
pthread_mutex_t progressMutex;

/*
	\var stopMutex 
	\breif This Mutex takes cake of the stopping of the job to prevent disk writing errors.
*/
pthread_mutex_t stopMutex;

/* 	\fn void stopThread(int index)
	\breif Stops a thread found at position index in threads array
	\param index Index of the thread that needs to be stopped
	\returns void
*/
void stopThread(int index);


/*	/fn int copyThread(IPCmessageToDaemon* client_message)
	/breif Starts a new copy job on a new thread;
	/param client_message Informations got form the client like from where to where to copy.
	/returns Integer, is the index of the new thread. Needs to be stored in order to know what thread it is.
*/
int copyThread(IPCmessageToDaemon* client_message);


/*	/fn void pauseThread(int jobID)
	/breif Pauses a thread with the idex / jobID
	/param jobID Integer, the job that needs to be paused
	/returns void
*/
void pauseThread(int jobID);


/*	/fn float statusThread(int jobID)
	/breif Gets the progress of a job.
	/param jobID Integer, the job that i want to know it's progress
	/returns Float, the progress of the job
*/
float statusThread(int jobID);


/*
	/fn void resumeThread(int jobID)
	/breif Resumes a job that has been paused
	/param jobID Integer, the job that needs to be resumed
	/returns void
*/
void resumeThread(int jobID);