import React from 'react'

export default function Signup(props) {
  return (
    <div>
      <h3>Register</h3>
      <button
        onClick={() => {
          props.history.goBack();
        }}
      >
        back
      </button>
    </div>
  );
}
