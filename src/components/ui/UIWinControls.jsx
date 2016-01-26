import React from 'react';
import Radium from 'radium';
import { UIButton } from './index';

/** UIWinControls Class
 *----------------------------------------------------------------------------*/
@Radium
class UIWinControls extends React.Component {

  static displayName = 'UIWinControls';

  render() {
    return (
      <UIButton kind="window-gui">Close</UIButton>
    );
  }

};

/** UIWinControls Styles
 *----------------------------------------------------------------------------*/
let styles = {

};

export default UIWinControls;