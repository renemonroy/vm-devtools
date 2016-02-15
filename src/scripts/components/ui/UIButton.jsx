import React, { PropTypes } from 'react';
import Radium from 'radium';
let styles = null;

/** UIButton Class
 *----------------------------------------------------------------------------*/
@Radium
class UIButton extends React.Component {

  static displayName = 'UIButton';

  static propTypes = {
    kind: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any,
    style: PropTypes.object,
  };

  render() {
    const { kind, children, style } = this.props;
    const { buttonStyle } = styles;
    const btnStyl = [buttonStyle.base, buttonStyle[kind], style];
    return (
      <div {...this.props} className="ui-button" style={btnStyl}>
        {children}
      </div>
    );
  }

}

/** UIButton Styles
 *----------------------------------------------------------------------------*/
styles = {
  buttonStyle: {
    base: {
      fontSize: '1.4rem',
      color: '#303030',
      border: 0,
      backgroundColor: 'transparent',
    },
    primary: {
      color: '#ffffff',
      display: 'inline-block',
      backgroundColor: '#0074D9',
    },
    warning: {
      background: '#FF4136',
    },
    'window-gui': {
      height: '1.3rem',
      width: '1.3rem',
      textIndent: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },
};

export default UIButton;
