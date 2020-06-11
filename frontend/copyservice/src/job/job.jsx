import React from "react";
import "./job.scss";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/core";
import { Button, Progress } from 'semantic-ui-react'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Job = (props) => {
  return (
      
    <div className="job">
      <div className="jobContents">
        <div className="text">JOB #1</div>
        <div className="loader">
          <FadeLoader
            css={override}
            size={150}
            color={"#36D7B7"}
            loading={true}
          />
        </div>
        <div className="progressbar">
            
        </div>
      </div>
    </div>
  );
};

export default Job;
