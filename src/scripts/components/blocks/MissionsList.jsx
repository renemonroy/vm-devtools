import React, { PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { connect } from 'react-redux';
import { MissionActions } from '../../actions';

/** MissionsList Class
 *----------------------------------------------------------------------------*/
@Radium
class MissionsList extends React.Component {

  static displayName = 'MissionsList';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1]).isRequired,
    data : PropTypes.array.isRequired
  };

  render() {
    const { data:missions, dispatch } = this.props;
    const { base, active } = styles.liStyle;
    const liStyles = [base];
    return (
      <aside>
        <ul style={styles.ulStyle}>
          {_.map(missions, (mission, i) =>
            <li
              style={liStyles}
              onClick={(e) => dispatch(MissionActions.loadActiveMission(mission))}
              key={'mission-' + mission}>
              {_.startCase(mission)}
            </li>
          )}
        </ul>
      </aside>
    );
  }

};

/** MissionsList Styles
 *----------------------------------------------------------------------------*/
const styles = {
  ulStyle: {
    paddingTop: '2.4rem'
  },
  liStyle: {
    base: {
      color: '#666666',
      fontSize: '1.2rem',
      padding: '.4rem 2rem'
    },
    active: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 0 0 rgba(0,0,0,.06)'
    }
  }
};

export default connect()(MissionsList);