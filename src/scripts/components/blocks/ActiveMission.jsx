import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { UIInputTag } from '../ui';
import { MissionActions } from '../../actions';

/** ActiveMission Class
 *----------------------------------------------------------------------------*/
class ActiveMission extends React.Component {

  static displayName = 'ActiveMission';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1, 2]).isRequired,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handleScreensChange(screens) {
    this.props.dispatch(MissionActions.changeActiveMissionData({ screens }));
  }

  renderForm() {
    const { data } = this.props;
    return (
      <div>
        <h3>Scenes Names</h3>
        <UIInputTag
          tags={data.screens}
          placeholder="Add a screen name"
          onChange={::this.handleScreensChange}
          stringCase="class"
        />
      </div>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {_.isEmpty(data) ? <p>Empty</p> : this.renderForm()}
      </div>
    );
  }

}

export default connect()(ActiveMission);
