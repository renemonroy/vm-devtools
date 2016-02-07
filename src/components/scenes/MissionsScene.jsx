import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIScene, UIInputTag } from '../ui';
import * as missionActions from '../../actions/Mission';

/** MissionScene Class
 *----------------------------------------------------------------------------*/
@connect(state => (state.Mission.toJS()))
class MissionsScene extends React.Component {

  static displayName = 'MissionsScene';

  static propTypes = {
    missionsList: PropTypes.shape({
      status: PropTypes.oneOf([-1, 0, 1, 2, 3]),
      data: PropTypes.array.isRequired
    }),
    activeMission: PropTypes.shape({
      status: PropTypes.oneOf([-1, 0, 1, 2, 3]),
      data: PropTypes.object.isRequired
    }),
  };

  componentDidMount() {
    this.props.dispatch(missionActions.getMissionsList());
  }

  handleScreensChange(tags) {
    this.props.dispatch(missionActions.updateActiveMission({ screens: tags }));
  }

  render() {
    const { missionsList, activeMission } = this.props;
    return (
      <UIScene name="missions">
        <ul>
          {missionsList.data.map((mn, i) =>
            <li key={'mission-' + i}>{mn}</li>
          )}
        </ul>
        <h3>Scenes names</h3>
        <UIInputTag
          tags={activeMission.data.screens}
          placeholder="Add a screen name"
          onChange={::this.handleScreensChange}/>
      </UIScene>
    );
  }

};

export default MissionsScene;