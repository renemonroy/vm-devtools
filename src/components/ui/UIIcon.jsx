import React from 'react';
import Radium from 'radium';

/** UIIcon Class
 *----------------------------------------------------------------------------*/
@Radium
class UIIcon extends React.Component {

  static propTypes = {
    name : React.PropTypes.string.isRequired
  };

  render() {
    const { name, color, size } = this.props;
    const attrs = {
      color : color || '#000',
      fontSize : ((size || 16) * .1) + 'rem'
    };
    const iconStyle = [styles.base, attrs];
    return (
      <span className={'icon-' + name} style={iconStyle}></span>
    );
  }

};

/** UIIcon Styles
 *----------------------------------------------------------------------------*/
const styles = {
  base : {
    fontFamily : 'VMDevTools',
    speak : 'none',
    fontStyle : 'normal',
    fontWeight : 'normal',
    fontVariant : 'normal',
    textTransform : 'none',
    lineHeight : 1,
    'WebkitFontSmoothing' : 'antialiased'
  }
};

export default UIIcon;