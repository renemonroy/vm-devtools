import React, { PropTypes } from 'react';
import Radium from 'radium';
import { UIContent, UISidebar, UITitlebar, UIScenesGroup, UIWinControls } from './ui';
import { Navigation } from './blocks';
let styles = null;

/** App Class
 *----------------------------------------------------------------------------*/
@Radium
class App extends React.Component {

  static displayName = 'App';

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.object,
  };


  render() {
    const { children, location: loc } = this.props;
    const { appStyle, titleStyle, logoStyle } = styles;
    return (
      <div id="app" style={appStyle}>
        <UISidebar>
          <UIWinControls/>
          <img src="/images/vm-logo.png" style={logoStyle}/>
          <Navigation/>
        </UISidebar>
        <UIContent>
          <UITitlebar centerItem={() => <span style={titleStyle}>Virgin MEGA DevTools</span>}/>
          <UIScenesGroup scenes={() => children} sceneRoute={loc.pathname}/>
        </UIContent>
      </div>
    );
  }

}

/** App Styles
 *----------------------------------------------------------------------------*/
styles = {
  appStyle: {
    backgroundColor: '#fff',
  },
  titleStyle: {
    marginTop: '1px',
  },
  logoStyle: {
    maxWidth: '3.7rem',
    height: 'auto',
    display: 'block',
    margin: '1.3rem auto',
  },
};

export default App;
