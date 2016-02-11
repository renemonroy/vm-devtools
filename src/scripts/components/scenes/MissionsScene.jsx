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
    this.props.dispatch(MissionActions.loadMissionsList());
  }

  renderSidebar() {
    const { missionsList:ml } = this.props;
    return <MissionsList status={ml.status} data={ml.data} />;
  }

  renderContent() {
    const { activeMission:am } = this.props;
    return <ActiveMission status={am.status} data={am.data} />
  }

  render() {
    const { missionsList, activeMission } = this.props;
    return (
      <UIScene
        sidebar={::this.renderSidebar}
        content={::this.renderContent}
        name="missions"/>
    );
  }

};

export default MissionsScene;