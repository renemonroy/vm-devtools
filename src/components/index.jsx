import React from 'react';
import Radium from 'radium';
import { UIContent, UISidebar, UITitlebar, UIScenesGroup, UIWinControls, UIIcon } from './ui';
import { SidebarToggler } from './buttons';

/** App Class
 *----------------------------------------------------------------------------*/
@Radium
class App extends React.Component {

  static displayName = 'App';

  render() {
    const { children, location:loc } = this.props,
      { appStyle, titleStyle } = styles;
    return (
      <div id="app" style={styles.appStyle}>
        <UISidebar>
          <UIWinControls />
          <UIIcon name="rocket" color="#fff" />
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
     color : '#484848',
     fontFamily : '"Helvetica Neue", Helvetica, sans-serif',
     fontSize : '1.3rem'
   }
 };

 export default App;