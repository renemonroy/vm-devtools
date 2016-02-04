import React from 'react';
import Radium from 'radium';

const remote = require('electron').remote;
const currentWindow = remote.getCurrentWindow();

/** UITitlebar Class
 *----------------------------------------------------------------------------*/
@Radium
class UITitlebar extends React.Component {

  static displayName = 'UITitlebar';

  constructor(props) {
    super(props);
    this.state = { windowState : 'normal' };
  }

  componentDidMount() {
    currentWindow.on('blur', () => this.setState({
      windowState : 'blur'
    }));
    currentWindow.on('focus', () => this.setState({
      windowState : 'focus'
    }));
  }

  render() {
    const { leftItem, centerItem, rightItem } = this.props,
      { windowState } = this.state,
      { titlebarStyle, winStateStyle } = styles;
    const titlebarStyles = [titlebarStyle, winStateStyle[windowState]];
    return (
      <div id="titlebar" style={titlebarStyles}>
        <div className="left-item" style={styles.leftItemStyle}>
          {leftItem ? leftItem() : null}
        </div>
        <div className="center-item" style={styles.centerItemStyle}>
          {centerItem ? centerItem() : null}
        </div>
        <div className="right-item" style={styles.rightItemStyle}>
          {rightItem ? rightItem() : null}
        </div>
      </div>
    );
  }

};

/** UITitlebar Styles
 *----------------------------------------------------------------------------*/
const styles = {
  titlebarStyle : {
    position : 'absolute',
    zIndex : 3,
    top : 0,
    left : 0,
    width : '100%',
    height : '2.1rem',
    padding : '0 1.4rem',
    display : 'flex',
    WebkitJustifyContent : 'space-between',
    justifyContent : 'space-between',
    WebkitFlexDirection : 'row',
    flexDirection : 'row',
    WebkitAlignItems : 'center',
    alignItems : 'center',
    WebkitAppRegion : 'drag',
    fontFamily : '"Helvetica Neue", Helvetica, sans-serif',
    fontSize : '1.2rem'
  },
  leftItemStyle : {
    width : '5rem',
    height : '100%',
    WebkitTransition : 'all 0.3s',
    transition : 'all 0.3s',
    position : 'relative',
    display : 'flex',
    WebkitFlexDirection : 'row',
    flexDirection : 'row',
    WebkitAlignItems : 'center',
    alignItems : 'center'
  },
  rightItemStyle : {
    width : '5rem',
    height : '100%',
    WebkitTransition : 'all 0.3s',
    transition : 'all 0.3s',
    position : 'relative',
    display : 'flex',
    WebkitFlexDirection : 'row',
    flexDirection : 'row',
    WebkitAlignItems : 'center',
    alignItems : 'center'
  },
  centerItemStyle : {
    height : '100%',
    position : 'relative',
    display : 'flex',
    WebkitFlexDirection : 'row',
    flexDirection : 'row',
    WebkitAlignItems : 'center',
    alignItems : 'center'
  },
  winStateStyle : {
    blur : {
      borderBottom : '1px solid rgba(0, 0, 0, .1)',
      color : '#acacac',
      backgroundColor : '#f6f6f6',
      backgroundImage : 'none'
    },
    focus : {
      borderBottom : '1px solid rgba(0, 0, 0, .25)',
      color : '#484848',
      backgroundColor : 'rgb(251, 251, 251)',
      backgroundImage : 'linear-gradient(#f4f4f4, #d4d1d4)'
    }
  }
};

export default UITitlebar;