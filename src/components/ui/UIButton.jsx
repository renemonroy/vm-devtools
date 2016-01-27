import React from 'react';
import Radium from 'radium';

/** UIButton Class
 *----------------------------------------------------------------------------*/
@Radium
class UIButton extends React.Component {

  static displayName = 'UIButton';

  static propTypes = {
    kind : React.PropTypes.string,
    onClick : React.PropTypes.func
  };

  render() {
    let { onClick, kind, children, style } = this.props;
    let { buttonStyle } = styles;
    let btnStyl = [ buttonStyle.base, buttonStyle[kind], style ];
    return (
      <div className="ui-button" onClick={onClick} style={btnStyl}>
        {children}
      </div>
    );
  }

};

/** UIButton Styles
 *----------------------------------------------------------------------------*/
let styles = {
  buttonStyle : {
    base : {
      fontSize : '1.4rem',
      color : '#303030',
      border : 0,
      backgroundColor : 'transparent'
    },
    primary : {
      backgroundColor : '#0074D9'
    },
    warning : {
      background : '#FF4136'
    },
    'window-gui' : {
      height : '1.3rem',
      width : '1.3rem',
      textIndent : '100%',
      whiteSpace : 'nowrap',
      overflow : 'hidden'
    }
  }
};

export default UIButton;