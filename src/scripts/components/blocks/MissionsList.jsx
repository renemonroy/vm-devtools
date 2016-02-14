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
  };

  render() {
    const { data: missions } = this.props;
    return (
      <aside>
        <ul style={styles.ulStyle}>
          {_.map(missions, (missionName) =>
            <MissionItemButton name={missionName} key={`li-${missionName}`}/>
          )}
        </ul>
      </aside>
    );
  }

}

/** MissionsList Styles
 *----------------------------------------------------------------------------*/
styles = {
  ulStyle: {
    paddingTop: '2.4rem',
  },
};

export default connect()(MissionsList);
