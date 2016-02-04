import React from 'react';
import { connect } from 'react-redux';
import { UIScene, UIInputTag } from '../ui';
import * as missionActions from '../../actions/Mission';

var ipcRenderer = require('electron').ipcRenderer;

/** MissionScene Class
 *----------------------------------------------------------------------------*/
@connect(state => ({
  missions : state.MissionStore.get('missions').toJS()
}))
class MissionsScene extends React.Component {

  static displayName = 'MissionsScene';

  static propTypes = {
    missions : React.PropTypes.object
  };

  componentWillMount() {
    ipcRenderer.on('missions:resList', this.onMissionsList);
  }

  componentDidMount() {
    ipcRenderer.send('missions:reqList');
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('missions:resList', this.onMissionsList);
    ipcRenderer = null;
  }

  onMissionsList(e, missions) {
    console.log('>>> Missions Found', missions);
  }

  handleScreensChange(tags) {
    this.props.dispatch(missionActions.editMission('com.virginmegausa.mission.view-media', { screens : tags }));
  }

  render() {
    const { missions } = this.props;
    const mission = missions['com.virginmegausa.mission.view-media'];
    return (
      <UIScene name="missions">
        <h3>Missions names</h3>
        <UIInputTag
          tags={mission.screens}
          placeholder="Add a screen name"
          onChange={::this.handleScreensChange}/>
      </UIScene>
    );
  }

};

export default MissionsScene;