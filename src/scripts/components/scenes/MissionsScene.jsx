import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { UIScene } from '../ui';
import { SceneHeader, MissionsList } from '../blocks';
import { MissionBuilderForm } from '../forms';
import { MissionActions } from '../../actions';

/** MissionScene Class
 *----------------------------------------------------------------------------*/
class MissionsScene extends React.Component {

  static displayName = 'MissionsScene';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(MissionActions.fetchMissionsList());
  }

  renderHeader() {
    return (
      <SceneHeader
        heading="Mission Boilerplate"
        description="Set the values to generate the boostrap code of your next mission.
        Remember, is not a builder but only a starter. Code and configurations are saved
        in File System, check missions folder."
        background="/images/banner-mission.jpg"
      />
    );
  }

  render() {
    return (
      <UIScene
        header={::this.renderHeader}
        sidebar={() => <MissionsList />}
        content={() => <MissionBuilderForm />}
        name="missions"
      />
    );
  }

}

export default connect()(MissionsScene);
