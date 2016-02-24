import React, { Component, PropTypes } from 'react';

export default function validateForm() {
  return function decorateForm(DecoratedForm) {
    const displayName =
      DecoratedForm.displayName ||
      DecoratedForm.name ||
      'Form';

    return class ValidForm extends Component {

      static displayName = `Valid${displayName}`;

      static propTypes = {
        onSubmit: PropTypes.func.isRequired,
      };

      constructor(props, context) {
        super(props, context);
        this.state = {
          isValid: false,
        };
      }

      onSubmit(e) {
        e.preventDefault();
        debugger;
        this.props.onSubmit(e);
      }

      render() {
        return (
          <DecoratedForm {...this.props} {...this.state} />
        );
      }

    };
  };
}
