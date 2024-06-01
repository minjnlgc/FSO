import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/CloseButton';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={hideWhenVisible} className="ms-2 mt-4">
        <Button onClick={toggleVisibility} size="sm" variant="outline-primary">
          {props.label}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <br />
        <CloseButton onClick={toggleVisibility} className="ms-2" />
      </div>
    </>
  );
});

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
