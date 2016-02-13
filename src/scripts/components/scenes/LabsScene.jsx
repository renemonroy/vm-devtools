import React from 'react';
import { UIScene } from '../ui';

/** LabsScene Class
 *----------------------------------------------------------------------------*/
class LabsScene extends React.Component {

  static displayName = 'LabsScene';

  renderContent() {
    return (
      <p>Labs scene (example).</p>
    );
  }

  render() {
    return (
      <UIScene content={::this.renderContent} name="auth"/>
    );
  }

}

export default LabsScene;
