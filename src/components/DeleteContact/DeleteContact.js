import React from "react";

const DeleteContact = (props) => {
  if (!props.location.state) {
    props.history.replace("/");
  }
  console.log(props);
  return (
    <div>
      <h1>Delete Contact</h1>
      <button
        onClick={() => {
          props.location.state.deleteContact(props.location.state.id);
          props.history.push("/");
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default React.memo(DeleteContact);
