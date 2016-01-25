import React from 'react';
import { connect } from 'react-redux';
import { Motion, spring, presets } from 'react-motion';
import Radium from 'radium';
import { fastEaseOutElastic } from '../../constants/SpringPresets';
import * as UIActions from '../../actions/ui';

/** UIContent Class
 *----------------------------------------------------------------------------*/
@connect(state => ({
  active : !state.UI.get('showSidebar'),
  slideWidth : state.UI.get('sidebarWidth')
}))
@Radium
class UIContent extends React.Component {

  static displayName = 'Content';

  static propTypes = {
    active : React.PropTypes.bool.isRequired
  };

  getAnimation() {
    const { active, slideWidth } = this.props;
    return { x : spring(active ? 0 : slideWidth, fastEaseOutElastic) };
  }

  setStyles(anim) {
    const animStyle = {
      WebkitTransform : 'translate3d(' + anim.x + 'px, 0, 0)',
      transform : 'translate3d(' + anim.x + 'px, 0, 0)',
    };
    return [styles.contentStyle, animStyle];
  }

  renderOverlay() {
    const toggleSidebar = (e) => this.props.dispatch(UIActions.toggleSidebar());
    return <div style={styles.overlayStyle} onClick={toggleSidebar}></div>;
  }

  renderContent(anim) {
    const { active, children } = this.props;
    return (
      <div style={this.setStyles(anim)}>
        {/* active ? null : this.renderOverlay() */}
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <Motion style={this.getAnimation()}>
        {this.renderContent.bind(this)}
      </Motion>
    );
  }

};

/** UIContent Styles
 *----------------------------------------------------------------------------*/
const styles = {
  contentStyle : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%',
    backgroundColor : '#ffffff'
  },
  overlayStyle : {
    position : 'absolute',
    zIndex : 4,
    height : '100%',
    width : '100%'
  }
};

export default UIContent;