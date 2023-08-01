import React from 'react';
import {Spinner} from "react-bootstrap";

const Button = ({loading = false, color = '#ffffff', ...props}) => {

  return (
    <>
      <button {...props} disabled={loading}>
        <>
          {loading ? (
            <>
              <span
                class="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
              <span>{props.children}</span>
            </>
          ) : (
            props.children
          )}
        </>
      </button>
    </>
  );
}

export default Button;