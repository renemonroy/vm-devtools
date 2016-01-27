import React from 'react';
import Radium from 'radium';
import { UIButton } from './index';

require('../../images/window-icons-actions.png');

/** UIWinControls Class
 *----------------------------------------------------------------------------*/
@Radium
class UIWinControls extends React.Component {

  static displayName = 'UIWinControls';

  constructor(props) {
    super(props);
    this.state = {
      groupState : 'normal'
    };
  }

  render() {
    const { groupState } = this.state,
      { winControlsStyle, baseBtnStyle } = styles;

    const gs = styles[groupState + 'State'],
      closeBtnStyles = [baseBtnStyle, gs.closeBtnStyle],
      minBtnStyles = [baseBtnStyle, gs.minBtnStyle],
      maxBtnStyles = [baseBtnStyle, gs.maxBtnStyle];

    return (
      <div
        className="ui-win-controls"
        onMouseOver={() => {this.setState({ groupState : 'hover' })}}
        onMouseOut={() => {this.setState({ groupState : 'normal' })}}
        style={winControlsStyle}>
        <UIButton kind="window-gui" style={closeBtnStyles}>Close</UIButton>
        <UIButton kind="window-gui" style={minBtnStyles}>Min</UIButton>
        <UIButton kind="window-gui" style={maxBtnStyles}>Max</UIButton>
      </div>
    );
  }

};

/** UIWinControls Styles
 *----------------------------------------------------------------------------*/
let styles = {
  winControlsStyle : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    alignContent : 'center',
    height : '1.4rem',
    width : '5.2rem',
    margin : '0 auto'
  },
  baseBtnStyle : {
    backgroundImage : 'url("/images/window-icons-actions.png")',
    backgroundRepeat : 'no-repeat',
    backgroundSize : '4.5rem'
  },
  normalState : {
    closeBtnStyle : {
      backgroundPosition : '-.1rem -.1rem'
    },
    minBtnStyle : {
      backgroundPosition : '-1.6rem -.1rem'
    },
    maxBtnStyle : {
      backgroundPosition : '-3.1rem -.1rem'
    }
  },
  hoverState : {
    closeBtnStyle : {
      backgroundPosition : '-.1rem -1.6rem'
    },
    minBtnStyle : {
      backgroundPosition : '-1.6rem -1.6rem'
    },
    maxBtnStyle : {
      backgroundPosition : '-3.1rem -1.6rem'
    }
  }
};

export default UIWinControls;