import React, { PropTypes } from 'react';
import _ from 'lodash';
import { MissionBuilderForm } from '../forms';

/** ActiveMission Class
 *----------------------------------------------------------------------------*/
class ActiveMission extends React.Component {

  static displayName = 'ActiveMission';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1, 2]).isRequired,
    data: PropTypes.object.isRequired,
  };

  renderIndex() {
    return (
      <p>Empty</p>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {_.isEmpty(data) ? this.renderIndex() : <MissionBuilderForm data={data} />}
      </div>
    );
  }

}

export default ActiveMission;
