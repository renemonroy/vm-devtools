import React from 'react';
import Radium from 'radium';
import { NavigationButton } from '../buttons';
let styles = null;

/** Navigation Class
 *----------------------------------------------------------------------------*/
@Radium
class Navigation extends React.Component {

  static displayName = 'Navigation';

  render() {
    return (
      <nav style={styles.navStyle}>
        <NavigationButton icon="rocket" href="/missions" />
        <NavigationButton icon="lab" href="/labs" />
      </nav>
    );
  }

}

/** Navigation Styles
 *----------------------------------------------------------------------------*/
styles = {
  navStyle: {
    display: 'flex',
    WebkitFlexDirection: 'column',
    flexDirection: 'column',
    WebkitJustifyContent: 'center',
    justifyContent: 'center',
    WebkitAlignItems: 'flex-start',
    alignItems: 'flex-start',
    WebkitAlignContent: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
  },
};

export default Navigation;
