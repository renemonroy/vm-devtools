import React from 'react';
import Radium from 'radium';
import { UIButton } from './index';

const remote = require('electron').remote;
const currentWindow = remote.getCurrentWindow();

/** UIWinControls Class
 *----------------------------------------------------------------------------*/
@Radium
class UIWinControls extends React.Component {

  static displayName = 'UIWinControls';

  constructor(props) {
    super(props);
    this.state = {
      groupState : 'normal',
      closeStateStyle : null,
      minStateStyle : null,
      maxStateStyle : null
    };
  }

  componentDidMount() {
    currentWindow.on('blur', () => this.setState({
      groupState : 'disable'
    }));
    currentWindow.on('focus', () => this.setState({
      groupState : 'normal'
    }));
  }

  render() {
    const { groupState, closeStateStyle, minStateStyle, maxStateStyle } = this.state,
      { winControlsStyle, baseBtnStyle, activeState } = styles;

    const gs = styles[groupState + 'State'],
      closeBtnStyles = [baseBtnStyle, gs.closeBtnStyle, closeStateStyle],
      minBtnStyles = [baseBtnStyle, gs.minBtnStyle, minStateStyle],
      maxBtnStyles = [baseBtnStyle, gs.maxBtnStyle, maxStateStyle];

    return (
      <div
        className="ui-win-controls"
        onMouseOver={() => {this.setState({ groupState : 'hover' })}}
        onMouseOut={() => {this.setState({ groupState : 'normal' })}}
        style={winControlsStyle}>
        <UIButton
          onClick={() => currentWindow.hide()}
          onMouseDown={() => this.setState({ closeStateStyle : activeState.closeBtnStyle })}
          onMouseLeave={() => this.setState({ closeStateStyle : null })}
          kind="window-gui"
          style={closeBtnStyles}
          key="close-window">
          Close
        </UIButton>
        <UIButton
          onClick={() => currentWindow.minimize()}
          onMouseDown={() => this.setState({ minStateStyle : activeState.minBtnStyle })}
          onMouseLeave={() => this.setState({ minStateStyle : null })}
          kind="window-gui"
          style={minBtnStyles}
          key="minimize-window">
          Minimize
          </UIButton>
        <UIButton
          onClick={() => currentWindow.isMaximized ? currentWindow.unmaximize() : currentWindow.maximize()}
          onMouseDown={() => this.setState({ maxStateStyle : activeState.maxBtnStyle })}
          onMouseLeave={() => this.setState({ maxStateStyle : null })}
          kind="window-gui"
          style={maxBtnStyles}
          key="maximize-window">
          Maximize
          </UIButton>
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
  },
  activeState : {
    closeBtnStyle : {
      backgroundPosition : '-.1rem -3.1rem'
    },
    minBtnStyle : {
      backgroundPosition : '-1.6rem -3.1rem'
    },
    maxBtnStyle : {
      backgroundPosition : '-3.1rem -3.1rem'
    }
  },
  disableState : {
    closeBtnStyle : {
      backgroundPosition : '-.1rem -4.6rem'
    },
    minBtnStyle : {
      backgroundPosition : '-1.6rem -4.6rem'
    },
    maxBtnStyle : {
      backgroundPosition : '-3.1rem -4.6rem'
    }
  }
};

export default UIWinControls;