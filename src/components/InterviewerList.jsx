import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import 'components/InterviewerList.scss';

export default function (props) {
  const parsedInterviewers = props.interviewers.map(interviewer => (
    <InterviewerListItem
      {...interviewer}
      key={interviewer.id}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  ))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )
}