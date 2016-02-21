import React, { PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { connect } from 'react-redux';
import { MissionItemButton } from '../buttons';
let styles = null;

/** MissionsList Class
 *----------------------------------------------------------------------------*/
@Radium
class MissionsList extends React.Component {

  static displayName = 'MissionsList';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1, 2]).isRequired,
    data: PropTypes.array.isRequired,
    activeMission: PropTypes.object.isRequired,
  };

  render() {
    const { data: missions, activeMission } = this.props;
    const { wrapperStyle, headerStyle, listStyle } = styles;
    return (
      <aside style={wrapperStyle}>
        <h3 style={headerStyle}>Missions</h3>
        <ul style={listStyle}>
          {_.map(missions, (missionName) =>
            <MissionItemButton
              name={missionName}
              key={`li-${missionName}`}
              active={activeMission.name === missionName}
            />
          )}
        </ul>
      </aside>
    );
  }

}

/** MissionsList Styles
 *----------------------------------------------------------------------------*/
styles = {
  wrapperStyle: {
    padding: '1rem 0',
  },
  headerStyle: {
    padding: '1rem 2rem',
    fontSize: '1.4rem',
    color: '#4c4c4c',
    fontWeight: 600,
  },
  listStyle: {
    paddingTop: '2.4rem',
  },
};

export default connect()(MissionsList);
