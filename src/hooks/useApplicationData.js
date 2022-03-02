import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // Intital fetch of data
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = () => {
    setState((prev) => {
      const days = prev.days.map((day) => {
        const totalSpots = day.appointments.length;
        const numAppts = day.appointments.filter(
          (appt) => prev.appointments[appt].interview
        ).length;
        return { ...day, spots: totalSpots - numAppts };
      });

      return { ...prev, days };
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(url, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments }));
      updateSpots();
    });
  };

  const cancelAppointment = (id) => {
    // update state
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log(`Cancelled appointment ${id}`);

    // update database
    const url = `http://localhost:8001/api/appointments/${id}`;
    return axios.delete(url).then(() => {
      setState({ ...state, appointments });
      updateSpots();
    });
  };

  return { state, setDay, bookInterview, cancelAppointment };
}
