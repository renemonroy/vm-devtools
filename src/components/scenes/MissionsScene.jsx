import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIScene, UIInputTag } from '../ui';
import * as missionActions from '../../actions/Mission';

var ipcRenderer = require('electron').ipcRenderer;

/** MissionScene Class
 *----------------------------------------------------------------------------*/
@connect(state => (state.Mission.toJS()))
class MissionsScene extends React.Component {

  static displayName = 'MissionsScene';

  static propTypes = {
    sceneMode: PropTypes.oneOf([-1, 0, 1, 2, 3]),
    missionsNames: PropTypes.array,
    activeMission: PropTypes.object
  };

  componentWillMount() {
    ipcRenderer.on('missions:res:list', ::this.onMissionsNames);
  }

  componentDidMount() {
    ipcRenderer.send('missions:req:list');
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('missions:res:list', ::this.onMissionsNames);
  }

  onMissionsNames(e, names) {
    this.props.dispatch(missionActions.updateMissionsNames(names));
  }

  handleScreensChange(tags) {
    this.props.dispatch(missionActions.editActiveMission({ screens : tags }));
  }

  render() {
    const { missionsNames, activeMission } = this.props;
    return (
      <UIScene name="missions">
        <ul>
          {missionsNames.map((mn) =>
            <li>{mn}</li>
          )}
        </ul>
        <h3>Scenes names</h3>
        <UIInputTag
          tags={activeMission.screens}
          placeholder="Add a screen name"
          onChange={::this.handleScreensChange}/>
      </UIScene>
    );
  }

};

export default MissionsScene;