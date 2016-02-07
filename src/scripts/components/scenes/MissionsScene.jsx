import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIScene } from '../ui';
import { MissionsList, ActiveMission } from '../blocks';
import { MissionActions } from '../../actions';

/** MissionScene Class
 *----------------------------------------------------------------------------*/
@connect(state => (state.Mission.toJS()))
class MissionsScene extends React.Component {

  static displayName = 'MissionsScene';

  static propTypes = {
    missionsList: PropTypes.object.isRequired,
    activeMission: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.dispatch(MissionActions.getMissionsList());
  }

  render() {
    const { missionsList, activeMission } = this.props;
    return (
      <UIScene name="missions">
        <MissionsList
          status={missionsList.status}
          data={missionsList.data}/>
        <ActiveMission
          status={activeMission.status}
          data={activeMission.data}/>
      </UIScene>
    );
  }

};

export default MissionsScene;