import React, { PropTypes } from 'react';

/** UIForm Class
 *----------------------------------------------------------------------------*/
class UIForm extends React.Component {

  static displayName = 'UIForm';

  static propTypes = {
    children: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e);
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
