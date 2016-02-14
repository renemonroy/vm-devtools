import React, { PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { connect } from 'react-redux';
import { MissionActions } from '../../actions';
let styles = null;

/** MissionsList Class
 *----------------------------------------------------------------------------*/
@Radium
class MissionsList extends React.Component {

  static displayName = 'MissionsList';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1]).isRequired,
    data: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  selectMission(mission) {
    this.props.dispatch(MissionActions.fetchActiveMissionData(mission));
  }

  render() {
    const { data: missions } = this.props;
    const { base } = styles.liStyle;
    const liSt = [base];
    return (
      <aside>
        <ul style={styles.ulStyle}>
          {_.map(missions, (mission) =>
            <li style={liSt} onClick={this.selectMission.bind(this, mission)} key={`li-${mission}`}>
              {_.startCase(mission)}
            </li>
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
  liStyle: {
    base: {
      color: '#666666',
      fontSize: '1.2rem',
      padding: '.4rem 2rem',
    },
    active: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 0 0 rgba(0,0,0,.06)',
    },
  },
};

export default connect()(MissionsList);
