import React from "react";

export default function (props) {
  const { name, avatar } = props;
  
  return (
    <li className="interviews__item">
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name} />
      {name}
    </li>
  );
}