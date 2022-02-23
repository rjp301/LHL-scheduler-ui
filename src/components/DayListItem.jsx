import React from "react";
import classNames from "classnames";

import 'components/DayListItem.scss';

const formatSpots = spots => {
  switch (spots) {
    case 0: return 'no spots remaining';
    case 1: return '1 spot remaining';
    default: return `${spots} spots remaining`;
  }
}

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
    
  const classes = classNames('day-list__item', {
    'day-list__item--full': spots === 0,
    'day-list__item--selected': selected
  });
  
  return (
    <li
      className={classes}
      onClick={setDay}
    >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}