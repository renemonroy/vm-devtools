import React, { PropTypes } from 'react';

/** UIForm Class
 *----------------------------------------------------------------------------*/
class UIForm extends React.Component {

  static displayName = 'UIForm';

  static propTypes = {
    children: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    validate: PropTypes.func,
  };

  static defaultProps = {
    validate: () => true,
  };

  handleSubmit(e) {
    const { validate, onSubmit } = this.props;
    e.preventDefault();
    if (validate() === true && onSubmit) onSubmit(e);
  }

  render() {
    const { children } = this.props;
    return (
      <form onSubmit={::this.handleSubmit}>
        {children}
      </form>
    );
  }

}

export default UIForm;
