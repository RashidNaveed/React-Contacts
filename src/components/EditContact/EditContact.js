import React from "react";

const EditContact = (props) => {
  if (!props.location.state) {
    props.history.replace("/");
  }
  console.log(props);

  return (
    <div>
      <input
        value={props.location.state.data.name}
        name="name"
        placeholder="Contact Name"
        onChange={(event) => props.location.state.changeContactHAndler(event)}
      />
    </div>
  );
};

export default EditContact;
