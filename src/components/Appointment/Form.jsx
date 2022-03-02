import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const {
    interviewers,
    onSave,
    onSaved,
    onCancel,
    bookInterview,
    id,
    onError,
  } = props;

  const [error, setError] = useState("");

  const interviewId =
    props.interviewer instanceof Object
      ? props.interviewer.id
      : props.interviewer;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(interviewId || null);

  const reset = () => {
    setStudent("");
    setInterviewer("");
  };

  const cancel = () => {
    reset();
    setError("");
    onCancel();
  };

  const save = () => {
    const interview = { student, interviewer };
    onSave();
    bookInterview(id, interview).then(onSaved).catch(onError);
  };
  
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    setError("");
    return save();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
