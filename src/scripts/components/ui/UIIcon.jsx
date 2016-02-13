import React, { PropTypes } from 'react';
import Radium from 'radium';
let styles = null;

/** UIIcon Class
 *----------------------------------------------------------------------------*/
@Radium
class UIIcon extends React.Component {

  static displayName = 'UIIcon';

  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  render() {
    const { name, color, size } = this.props;
    const fontSize = (size || 16) * 0.1;
    const attrs = { fontSize: `${fontSize}rem` };
    const iconStyle = [styles.base, attrs];
    if (color) attrs.color = color;
    return (
      <span className={`icon-${name}`} style={iconStyle}></span>
    );
  }

}

/** UIIcon Styles
 *----------------------------------------------------------------------------*/
styles = {
  base: {
    fontFamily: 'VMDevTools',
    speak: 'none',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    textTransform: 'none',
    lineHeight: 1,
    WebkitFontSmoothing: 'antialiased',
  },
};

export default UIIcon;
