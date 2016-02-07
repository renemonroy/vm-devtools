import React from 'react';
import Radium from 'radium';
import { UIContent, UISidebar, UITitlebar, UIScenesGroup, UIWinControls } from './ui';
import { Navigation } from './blocks';
import { SidebarToggler } from './buttons';

/** App Class
 *----------------------------------------------------------------------------*/
@Radium
class App extends React.Component {

  static displayName = 'App';

  render() {
    const { children, location:loc } = this.props,
      { appStyle, titleStyle, logoStyle } = styles;
    return (
      <div id="app" style={styles.appStyle}>
        <UISidebar>
          <UIWinControls/>
          <img src="/images/vm-logo.png" style={logoStyle}/>
          <Navigation/>
        </UISidebar>
        <UIContent>
          <UITitlebar
            centerItem={() => <span style={titleStyle}>Virgin MEGA DevTools</span>}/>
          <UIScenesGroup
            scenes={() => children}
            sceneRoute={loc.pathname}/>
        </UIContent>
      </div>
    );
  }

};

/** App Styles
 *----------------------------------------------------------------------------*/
const styles = {
  appStyle : {
    backgroundColor : '#fff'
  },
  titleStyle : {
    marginTop : '1px'
  },
  logoStyle : {
    maxWidth : '3.7rem',
    height : 'auto',
    display : 'block',
    margin : '1.3rem auto'
  }
};

export default App;