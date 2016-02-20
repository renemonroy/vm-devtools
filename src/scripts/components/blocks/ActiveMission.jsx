import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { UIFormGrid, UIInputText, UIInputTag, UIButton } from '../ui';
import { MissionActions } from '../../actions';
const { UIFormGroup, UIFormRow } = UIFormGrid;

/** ActiveMission Class
 *----------------------------------------------------------------------------*/
class ActiveMission extends React.Component {

  static displayName = 'ActiveMission';

  static propTypes = {
    status: PropTypes.oneOf([-1, 0, 1, 2]).isRequired,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  updateActiveMission(e) {
    this.props.dispatch(MissionActions.changeActiveMissionData(e));
  }

  handleInitialKeysChange(initialKeys) {
    console.log('>>> Initial Keys change:', initialKeys);
  }

  handleActionsChange(actions) {
    console.log('>>> Actions change', actions);
  }

  handleSave() {
    this.props.dispatch(MissionActions.setMission('edit', this.props.data));
  }

  renderIndex() {
    return (
      <p>Empty</p>
    );
  }

  renderForm() {
    const { data } = this.props;
    return (
      <div>
        <UIFormGroup legend="Component">
          <UIFormRow label="Mission name">
            <UIInputText
              type="text"
              placeholder="e.g. ViewMedia @stateless"
            />
          </UIFormRow>
          <UIFormRow label="Screens">
            <UIInputTag
              tags={data.screens}
              placeholder="e.g. MissionSetup"
              onAdd={(screens) => this.updateActiveMission({ screens })}
              onRemove={(screens) => this.updateActiveMission({ screens })}
              stringCase="class"
              color="lilac"
            />
          </UIFormRow>
        </UIFormGroup>
        <UIFormGroup legend="Store">
          <UIFormRow label="Identifier">
            <UIInputText
              type="text"
              placeholder="e.g. com.virginmegausa.mission.view-media"
              value={data.identifier}
            />
          </UIFormRow>
        </UIFormGroup>
        <UIButton kind="primary" onClick={::this.handleSave}>
          Save
        </UIButton>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {_.isEmpty(data) ? this.renderIndex() : this.renderForm()}
      </div>
    );
  }

}

export default connect()(ActiveMission);
