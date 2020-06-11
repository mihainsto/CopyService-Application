import React from "react"
import "./layout.scss"
import Job from "../job/job"

const Layout = () => {
    return(
    <div className="layout">
        
        <div className="title">
            Copy Service
        </div>
        <div className="buttonContainer">
            <button>
                Select Input File Path
            </button>

            <button>
                Select Output File Path
            </button>

            <button>
                Add Copy Job
            </button>
        </div>
        <div className="jobsContainer">
            <Job className = "job"></Job>
            <Job className = "job"></Job>
        </div>
    </div>
    )
}

export default Layout;