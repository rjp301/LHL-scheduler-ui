export function getAppointmentsForDay(state, day) {
  const days = state.days;
  if (days.length > 0) {
    const filteredDays = days.filter(d => d.name === day);
    
    if (filteredDays.length > 0) {
      return filteredDays[0].appointments.map(i => state.appointments[i]);
    }
  }
  return [];
}

export function getInterviewersForDay(state, day) {
  const days = state.days;
  if (days.length > 0) {
    const filteredDays = days.filter(d => d.name === day);
    
    if (filteredDays.length > 0) {
      return filteredDays[0].interviewers.map(i => state.interviewers[i]);
    }
  }
  return [];
}

export function getInterview(state, interview) {
  if (interview && interview.interviewer) {
    const interviewer = state.interviewers[interview.interviewer]
    return { ...interview, interviewer}
  }
  return null;
}