import React, { PropTypes } from 'react';
import validator from 'validator';
import { UIForm, UIFormGrid, UIInputTag, UIInputText, UIButton } from '../ui';
const { UIFormGroup, UIFormRow } = UIFormGrid;

/** MissionBuilder Form Class
 *----------------------------------------------------------------------------*/
class MissionBuilderForm extends React.Component {

  static displayName = 'MissionBuilderForm';

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  handleSubmit() {
    debugger;
  }

  handleAddedProperty() {
    debugger;
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
            />
          </UIFormRow>
          <UIFormRow label="Screens">
            <UIInputTag
              tags={data.screens}
              placeholder="e.g. Home @stateless"
              onAdd={(screens) => this.updateData({ screens })}
              onRemove={(screens) => this.updateData({ screens })}
              stringCase="class"
              color="lilac"
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
              validate={(str) => validator.isLowercase(str) && str !== '' && !validator.isInt(str)}
            />
          </UIFormRow>
          <UIFormRow label="Properties @type">
            <UIInputTag
              tags={data.properties}
              placeholder="e.g. screen @string"
              onAdd={::this.handleAddedProperty}
              onRemove={(properties) => this.updateData({ properties })}
              stringCase="variable"
              color="green"
            />
          </UIFormRow>
        </UIFormGroup>
        <UIButton kind="primary" type="submit">Save</UIButton>
      </UIForm>
    );
  }

}

export default MissionBuilderForm;
