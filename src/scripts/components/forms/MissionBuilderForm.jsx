import React, { PropTypes } from 'react';
import _ from 'lodash';
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

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.data, nextProps.data);
  }

  updateData(e) {
    this.props.dispatch(MissionActions.changeActiveMissionData(e));
  }

  handleSubmit() {
    this.props.dispatch(MissionActions.setMission('edit', this.props.data));
  }

  handleAddedProperty(properties, newProperty) {
    let value;
    switch (newProperty.type) {
      case 'String':
        value = ''; break;
      case 'Number':
        value = 0; break;
      case 'Boolean':
        value = false; break;
      case 'Array':
        value = []; break;
      case 'Object':
        value = {}; break;
      default:
        value = null;
    }
    _.set(properties[properties.length - 1], 'value', value);
    this.updateData({ properties });
  }

  validateText(str) {
    return str !== '' && str !== ' ' && !validator.isNumeric(str);
  }

  validateTag(tag) {
    return this.validateText(tag.name)
      && this.validateText(tag.type)
      && !validator.isNull(tag.type)
      && (_.indexOf(tag.args, tag.type) !== -1);
  }

  validateForm() {
    const invalidFields = _.reduce(this.refs, (result, comp) => {
      if (comp.state.status === 0) result.push(comp);
      return result;
    }, []);
    return invalidFields.length === 0;
  }

  render() {
    const { data } = this.props;
    return (
      <UIForm onSubmit={::this.handleSubmit} validate={::this.validateForm}>
        <UIFormGroup legend="Component">
          <UIFormRow label="Mission name">
            <UIInputText
              ref="missionName"
              type="text"
              value={data.name}
              placeholder="e.g. ViewMedia"
              validate={::this.validateText}
            />
          </UIFormRow>
          <UIFormRow label="Screens">
            <UIInputTag
              ref="missionScreens"
              tags={data.screens}
              placeholder="e.g. Home @stateless"
              stringCase="class"
              color="lilac"
              onAdd={(screens) => this.updateData({ screens })}
              onRemove={(screens) => this.updateData({ screens })}
              validate={::this.validateTag}
              validArgs={['Stateful', 'Stateless']}
            />
          </UIFormRow>
        </UIFormGroup>
        <UIFormGroup legend="Store">
          <UIFormRow label="Identifier">
            <UIInputText
              ref="missionIdentifier"
              type="text"
              value={data.identifier}
              placeholder="e.g. com.virginmegausa.mission.view-media"
              onChange={(e) => this.updateData({ identifier: e.target.value })}
              validate={::this.validateText}
            />
          </UIFormRow>
          <UIFormRow label="Properties @type">
            <UIInputTag
              ref="missionProperties"
              tags={data.properties}
              placeholder="e.g. screen @string"
              stringCase="variable"
              color="green"
              onAdd={::this.handleAddedProperty}
              onRemove={(properties) => this.updateData({ properties })}
              validate={::this.validateTag}
              validArgs={['String', 'Object', 'Array', 'Boolean', 'Number']}
            />
          </UIFormRow>
        </UIFormGroup>
        <UIButton kind="primary" type="submit">Save</UIButton>
      </UIForm>
    );
  }

}

export default connect()(MissionBuilderForm);
