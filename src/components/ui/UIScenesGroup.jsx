import React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import Radium from 'radium';
import { fastEaseOut } from '../../constants/SpringPresets';

/** UIScenesGroup Class
 *----------------------------------------------------------------------------*/
@Radium
class UIScenesGroup extends React.Component {

  static displayName = 'UIScenesGroup';

  static propTypes = {
    sceneRoute : React.PropTypes.string.isRequired
  };

  willEnter() {
    return { handler : this.props.scenes(), opacity : spring(0, fastEaseOut) };
  }

  willLeave(key, anim) {
    return { handler : anim.handler, opacity : spring(0, fastEaseOut) };
  }

  getAnimation() {
    return {
      [this.props.sceneRoute] : {
        handler : this.props.scenes(),
        opacity : spring(1, fastEaseOut)
      }
    };
  }

  handleScenesGroup(anim) {
    const scenes = Object.keys(anim).map( function(key) {
      const sceneAnim = anim[key],
        sceneStyle = { opacity : sceneAnim.opacity },
        style = [styles.sceneWrapper, sceneStyle];
      return (
        <div key={key + '-scene-trans'} style={style}>
          {sceneAnim.handler}
        </div>
      );
    });
    return <div id="scenes-group">{scenes}</div>;
  }

  render() {
    return (
      <TransitionMotion
        styles={this.getAnimation()}
        willEnter={this.willEnter.bind(this)}
        willLeave={this.willLeave.bind(this)}>
        {this.handleScenesGroup.bind(this)}
      </TransitionMotion>
    );
  }

};

/** UIScenesGroup Styles
 *----------------------------------------------------------------------------*/
const styles = {
  sceneWrapper : {
    position : 'absolute',
    width : '100%',
    height : '100%'
  }
};

export default UIScenesGroup;