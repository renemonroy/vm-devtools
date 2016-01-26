import React from 'react';
import Radium from 'radium';
import { UIButton } from '../ui';

/** Close Window Button Class
 *----------------------------------------------------------------------------*/
@Radium
class WinCloseButton extends React.Component {

  static displayName = 'WinCloseButton';

  static propTypes = {
    groupState : React.PropTypes.oneOf(['normal', 'hover', 'active', 'disable'])
  };

  render() {
    const { groupState } = this.props,
      { buttonStyle } = styles;
    return (
      <UIButton kind="window-gui" style={buttonStyle}>
        <span>Close</span>
      </UIButton>
    );
  }

};

/** Close Window Button Styles
 *----------------------------------------------------------------------------*/
let styles = {
  buttonStyle : {
    backgroundColor : 'red'
  }
};

export default WinCloseButton;