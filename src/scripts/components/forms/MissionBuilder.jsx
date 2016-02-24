import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { UIForm, UIFormGrid, UIInputTag, UIInputText, UIButton } from '../ui';
import { MissionActions } from '../../actions';
const { UIFormGroup, UIFormRow } = UIFormGrid;

/** MissionBuilder Form Class
 *----------------------------------------------------------------------------*/
class MissionBuilderForm extends React.Component {

  static displayName = 'MissionBuilderForm';

  static propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  updateData(e) {
    this.props.dispatch(MissionActions.changeActiveMissionData(e));
  }

  handleSubmit() {
    this.props.dispatch(MissionActions.setMission('edit', this.props.data));
  }

  handleAddedProperty() {
    debugger;
  }

  validateText(str) {
    return str !== '' && str !== ' ' && !validator.isNumeric(str);
  }

  validateTag(tag) {
    return this.validateText(tag.name)
      && this.validateText(tag.type)
      && !validator.isNull(tag.type);
  }

  render() {
    const { data } = this.props;
    return (
      <UIForm onSubmit={::this.handleSubmit}>
        <UIFormGroup legend="Component">
          <UIFormRow label="Mission name">
            <UIInputText
              type="text"
              placeholder="e.g. ViewMedia"
              validate={::this.validateText}
            />
          </UIFormRow>
          <UIFormRow label="Screens">
            <UIInputTag
              tags={data.screens}
              placeholder="e.g. Home @stateless"
              stringCase="class"
              color="lilac"
              onAdd={(screens) => this.updateData({ screens })}
              onRemove={(screens) => this.updateData({ screens })}
              validate={::this.validateTag}
            />
          </UIFormRow>
        </UIFormGroup>
        <UIFormGroup legend="Store">
          <UIFormRow label="Identifier">
            <UIInputText
              ref="identifier"
              type="text"
              value={data.identifier}
              placeholder="e.g. com.virginmegausa.mission.view-media"
              debounceTime={500}
              onChange={(e) => this.updateData({ identifier: e.target.value })}
              validate={::this.validateText}
            />
          </UIFormRow>
          <UIFormRow label="Properties @type">
            <UIInputTag
              tags={data.properties}
              placeholder="e.g. screen @string"
              stringCase="variable"
              color="green"
              onAdd={::this.handleAddedProperty}
              onRemove={(properties) => this.updateData({ properties })}
              validate={::this.validateTag}
            />
          </UIFormRow>
        </UIFormGroup>
        <UIButton kind="primary" type="submit">Save</UIButton>
      </UIForm>
    );
  }

}

export default connect()(MissionBuilderForm);
