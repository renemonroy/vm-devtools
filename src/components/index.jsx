import React from 'react';
import Radium from 'radium';
import { UIContent, UISidebar, UITitlebar, UIScenesGroup } from './ui';
import { SidebarToggler } from './buttons';

/** App Class
 *----------------------------------------------------------------------------*/
@Radium
class App extends React.Component {

  static displayName = 'App';

  render() {
    const { children, location:loc } = this.props;
    return (
      <div id="app" style={styles.appStyle}>
        <UISidebar>
          <p>:)</p>
        </UISidebar>
        <UIContent>
          <UITitlebar
            centerItem={() => <span>Virgin MEGA DevTools</span>}/>
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
   }
 };

 export default App;