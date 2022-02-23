import React from "react";

import 'components/InterviewerListItem.scss';

export default function (props) {
  const { name, avatar, setInterviewer, selected } = props;
  
  return (
    <li className={selected ? 'interviewers__item--selected' : 'interviewers__item'}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
        onClick={setInterviewer}
      />
      {selected && name}
    </li>
  );
}