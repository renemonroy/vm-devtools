import React from 'react';
import Radium from 'radium';
import { NavigationButton } from '../buttons';

/** Navigation Class
 *----------------------------------------------------------------------------*/
@Radium
class Navigation extends React.Component {

  render() {
    return (
      <nav style={styles.navStyle}>
        <NavigationButton icon="rocket" href="/missions" />
        <NavigationButton icon="lab" href="/labs" />
      </nav>
    );
  }

};

/** Navigation Styles
 *----------------------------------------------------------------------------*/
const styles = {
  navStyle : {
    display : 'flex',
    WebkitFlexDirection : 'column',
    flexDirection : 'column',
    WebkitJustifyContent : 'center',
    justifyContent : 'center',
    WebkitAlignItems : 'flex-start',
    alignItems : 'flex-start',
    WebkitAlignContent : 'flex-start',
    alignContent : 'flex-start',
    width : '100%'
  }
};

export default Navigation;