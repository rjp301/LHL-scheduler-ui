import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {
    time,
    interview,
    interviewers,
    bookInterview,
    cancelAppointment,
    id,
  } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(CREATE)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          id={id}
          interviewers={interviewers}
          {...interview}
          onSave={() => transition(SAVING)}
          onSaved={() => transition(SHOW)}
          onCancel={() => back()}
          onError={() => transition(ERROR_SAVE,true)}
          bookInterview={bookInterview}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          id={id}
          message="Do you really want to cancel that interview?"
          onCancel={() => back()}
          onDelete={() => transition(DELETING,true)}
          onDeleted={() => transition(EMPTY)}
          onError={() => transition(ERROR_DELETE,true)}
          cancelAppointment={cancelAppointment}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete content" onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save changes" onClose={() => back()} />
      )}
    </article>
  );
}
