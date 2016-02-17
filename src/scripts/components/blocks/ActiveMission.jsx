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

  handleScreensChange(screens) {
    this.props.dispatch(MissionActions.changeActiveMissionData({ screens }));
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
              placeholder="e.g. ViewMedia"
            />
          </UIFormRow>
          <UIFormRow label="Screens">
            <UIInputTag
              tags={data.screens}
              placeholder="e.g. MissionSetup"
              onChange={::this.handleScreensChange}
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
            />
          </UIFormRow>
          <UIFormRow label="Initial keys @type">
            <UIInputTag
              tags={[]}
              placeholder="e.g. jumps @number"
              onChange={::this.handleInitialKeysChange}
              stringCase="class"
              color="salmon"
            />
          </UIFormRow>
          <UIFormRow label="Actions [args]">
            <UIInputTag
              tags={[]}
              placeholder="e.g. earnJumps [jumps]"
              onChange={::this.handleActionsChange}
              stringCase="class"
              color="green"
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
