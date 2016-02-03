import React from 'react';
import { UIScene, UIInputTag } from '../ui';

/** MissionScene Class
 *----------------------------------------------------------------------------*/
class MissionsScene extends React.Component {

  render() {
    return (
      <UIScene name="missions">
        <h3>Missions names</h3>
        <UIInputTag
          placeholder="Add a screen name"
          onChange={(tags) => {console.log('tags:', tags)}}/>
      </UIScene>
    );
  }

};

export default MissionsScene;