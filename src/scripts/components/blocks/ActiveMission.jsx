import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIInputTag } from '../ui';
import { MissionActions } from '../../actions';

/** ActiveMission Class
 *----------------------------------------------------------------------------*/
@connect(state => (state.Mission.get('activeMission').toJS()))
class ActiveMission extends React.Component {

  static displayName = 'ActiveMission';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1]).isRequired,
    data: PropTypes.object.isRequired
  };

  handleScreensChange(screens) {
    this.props.dispatch(MissionActions.updateActiveMission({ screens: screens }))
  }

  render() {
    const { status, data } = this.props;
    return (
      <div>
        <h3>Scenes Names</h3>
        <UIInputTag
          tags={data.screens}
          placeholder="Add a screen name"
          onChange={::this.handleScreensChange}/>
      </div>
    );
  }

};

export default ActiveMission;