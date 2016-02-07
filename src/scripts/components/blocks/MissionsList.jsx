import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/** MissionsList Class
 *----------------------------------------------------------------------------*/
@connect(state => (state.Mission.get('missionsList').toJS()))
class MissionsList extends React.Component {

  static displayName = 'MissionsList';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1]).isRequired,
    data : PropTypes.array.isRequired
  };

  render() {
    const { status, data } = this.props;
    return (
      <div>
        <ul>
          {data.map((missionName, i) =>
            <li key={'mission-' + i}>{missionName}</li>
          )}
        </ul>
      </div>
    );
  }

};

export default MissionsList;