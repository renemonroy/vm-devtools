import React from 'react';
import Radium from 'radium';

/** UITitlebar Class
 *----------------------------------------------------------------------------*/
@Radium
class UITitlebar extends React.Component {

  static displayName = 'UITitlebar';

  render() {
    const { leftItem, centerItem, rightItem } = this.props,
      { titlebarStyle, leftItemStyle, rightItemStyle } = styles;
    return (
      <div id="titlebar" style={titlebarStyle}>
        <div className="left-item" style={leftItemStyle}>
          {leftItem ? leftItem() : null}
        </div>
        <div className="center-item">
          {centerItem ? centerItem() : null}
        </div>
        <div className="right-item" style={rightItemStyle}>
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
    backgroundColor : 'rgb(251, 251, 251)',
    backgroundImage : 'linear-gradient(#f4f4f4, #d4d1d4)',
    borderBottom : '1px solid #d6dbe0',
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
    alignItems : 'center'
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
    height : '100%'
  }
};

export default UITitlebar;