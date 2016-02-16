import React, { PropTypes } from 'react';
let styles = null;

/** UIFormGroup Stateless Component
 *----------------------------------------------------------------------------*/
const UIFormGroup = (props) =>
  <fieldset style={styles.fieldset}>
    {props.legend ? <legend style={styles.legend}>{props.legend}</legend> : null}
    <div style={styles.group}>
      {props.children}
    </div>
  </fieldset>;

UIFormGroup.propTypes = {
  children: PropTypes.any,
  legend: PropTypes.string,
};

/** UIFormRow Stateless Component
 *----------------------------------------------------------------------------*/
const UIFormRow = (props) =>
  <div style={styles.row}>
    {props.label ? <label style={styles.label}>{props.label}</label> : null}
    <div>
      {props.children}
    </div>
  </div>;

UIFormRow.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
};

/** UIForm Styles
 *----------------------------------------------------------------------------*/
styles = {
  fieldset: {
    paddingBottom: '1rem',
  },
  legend: {
    fontSize: '1.1rem',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  group: {
    padding: '1rem',
  },
  row: {
    paddingBottom: '1rem',
  },
  label: {
    color: '#A7A7A9',
    fontSize: '.9rem',
    display: 'block',
    padding: '.2rem 0',
    fontWeight: 400,
  },
};

export default {
  UIFormGroup,
  UIFormRow,
};
