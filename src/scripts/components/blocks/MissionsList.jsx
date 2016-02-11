import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { MissionActions } from '../../actions';

/** MissionsList Class
 *----------------------------------------------------------------------------*/
class MissionsList extends React.Component {

  static displayName = 'MissionsList';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1]).isRequired,
    data : PropTypes.array.isRequired
  };

  render() {
    const { data:missions, dispatch } = this.props;
    return (
      <ul>
        {_.map(missions, (mission, i) =>
          <li
            onClick={(e) => dispatch(MissionActions.loadActiveMission(mission))}
            key={'mission-' + mission}>
            {_.startCase(mission)}
          </li>
        )}
      </ul>
    );
  }

};

export default connect()(MissionsList);