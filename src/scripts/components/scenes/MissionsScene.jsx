import React from 'react';
import { connect } from 'react-redux';
import { UIScene } from '../ui';
import { MissionsList, ActiveMission } from '../blocks';
import { MissionActions } from '../../actions';

/** MissionScene Class
 *----------------------------------------------------------------------------*/
class MissionsScene extends React.Component {

  static displayName = 'MissionsScene';

  componentDidMount() {
    this.props.dispatch(MissionActions.getMissionsList());
  }

  render() {
    return (
      <UIScene name="missions">
        <MissionsList />
        <ActiveMission />
      </UIScene>
    );
  }

};

export default connect()(MissionsScene);