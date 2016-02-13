import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { TransitionMotion, spring } from 'react-motion';
import { fastEaseOut } from '../../constants/SpringPresets';
let styles = null;

/** UISidebar Class
 *----------------------------------------------------------------------------*/
@connect(state => ({
  active: state.UI.get('showSidebar'),
  width: state.UI.get('sidebarWidth'),
}))
@Radium
class UISidebar extends React.Component {

  static displayName = 'UISidebar';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    children: PropTypes.any,
  };

  getAnimation() {
    return this.props.active ? { sidebar: { opacity: spring(1, fastEaseOut) } } : {};
  }

  setStyles(anim) {
    const animStyle = { opacity: anim.opacity, width: this.props.width };
    return [styles.sidebarStyle, animStyle];
  }

  willEnter() {
    return { opacity: spring(0, fastEaseOut) };
  }

  willLeave() {
    return { opacity: spring(0, fastEaseOut) };
  }

  render() {
    return (
      <TransitionMotion
        styles={this.getAnimation()}
        willEnter={::this.willEnter}
        willLeave={::this.willLeave}
      >
        {(anims) =>
          <div style={styles.sidebarWrapperStyle}>
            {Object.keys(anims).map(key =>
              <div key={`ui-${key}`} style={this.setStyles(anims[key])}>
                {this.props.children}
              </div>
            )}
          </div>
        }
      </TransitionMotion>
    );
  }

}

/** UISidebar Styles
 *----------------------------------------------------------------------------*/
styles = {
  sidebarWrapperStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#1d1f20',
  },
  sidebarStyle: {
    position: 'relative',
    height: '100%',
    top: 0,
    paddingTop: '.4rem',
    borderRight: '1px solid #000000',
  },
};

export default UISidebar;
