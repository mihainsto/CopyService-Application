const lodash = require('lodash')

const findJobIndex = (jobList, id) => {
    for (let i=0; i<jobList.length; i++){
        if (jobList[i].id === id.toString()){
            return i
        }
    }
    return -1
}
export const alterCopyJob = (id, state, setState, progress=null, status=null) =>{
    const curentJobs = lodash.cloneDeep(state);
    console.log(progress)
    console.log(curentJobs)
    const jobIndex = findJobIndex(curentJobs.list, id)
    if (jobIndex === -1){
        return -1
    }
    console.log(jobIndex)
    if (progress != null){
        curentJobs.list[jobIndex].progress = progress
    }
    if (status != null){
        curentJobs.list[jobIndex].status = status
    }
    setState(curentJobs)
}

export const createCopyJob = (from, to, state, setState) => {

    const id = 3 // TODO: API request
    const curentJobs = lodash.cloneDeep(state);
    const status = "working"
    const progress = 1

    curentJobs.list.push({id:id, progress: progress, status: status, switchStatus: true})

    setState(curentJobs)
}

export const updateCopyJob = (id, state, setState) => {
    const curentJobs = lodash.cloneDeep(state);
    const progress = 40 // TODO: API request
    alterCopyJob(id, state, setState, progress)
    
}