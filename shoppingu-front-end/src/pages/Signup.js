import React from 'react'
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  return (
    <div>
      <h3>Register</h3>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        back
      </button>
    </div>
  );
}
