import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
  
  const dayItems = days.map(day => (
    <DayListItem
      {...day}
      key={day.id}
      selected={day.name === value}
      setDay={() => onChange(day.name)}
    />
  ))
  
  return (
    <ul>
      {dayItems}
    </ul>
  )
}

