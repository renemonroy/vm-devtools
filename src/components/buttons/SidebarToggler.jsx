import React from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { UIButton } from '../ui';
import Radium from 'radium';
import * as UIActions from '../../actions/UI';

/** Sidebar Button Class
 *----------------------------------------------------------------------------*/
@connect(state => ({
  activeSidebar : state.UI.get('showSidebar')
}))
@Radium
class SidebarToggler extends React.Component {

  static displayName = 'SidebarToggler';

  static propTypes = {
    activeSidebar : React.PropTypes.bool.isRequired
  };

  getAnimation() {
    return this.props.activeSidebar ? {
      topDeg : spring(45),
      bottomDeg : spring(-45),
      topDist : spring(0.9),
      bottomDist : spring(0.9),
      centerOpa : spring(0)
    } : {
      topDeg : spring(0),
      bottomDeg : spring(0),
      topDist : spring(0.4),
      bottomDist : spring(1.4),
      centerOpa : spring(1)
    }
  }

  setStyles(anim) {
    const dist = anim.dist, deg = anim.deg, opa = anim.opa;
    const animStyle = {
      WebkitTransform : 'translateY(' + dist + 'rem) rotate(' + deg + 'deg)',
      transform : 'translateY(' + dist + 'rem) rotate(' + deg + 'deg)',
      opacity : opa
    };
    return [styles.lineStyle, animStyle];
  }

  renderSidebarToggler(anim) {
    const { dispatch } = this.props,
      { buttonStyle, centerLineStyle, topLineStyle, bottomLineStyle } = styles,
      toggleSidebar = (e) => { dispatch(UIActions.toggleSidebar()) };
    const topAnim = { deg : anim.topDeg, dist : anim.topDist, opa : 1 },
      centerAnim = { deg : 0, dist : 0.9, opa : anim.centerOpa },
      bottomAnim = { deg : anim.bottomDeg, dist : anim.bottomDist, opa : 1 };
    return (
      <UIButton style={buttonStyle} onClick={toggleSidebar}>
        <span style={this.setStyles(topAnim)}></span>
        <span style={this.setStyles(centerAnim)}></span>
        <span style={this.setStyles(bottomAnim)}></span>
      </UIButton>
    );
  }

  render() {
    return (
      <Motion style={this.getAnimation()}>
        {this.renderSidebarToggler.bind(this)}
      </Motion>
    );
  }

};

/** Sidebar Button Styles
 *----------------------------------------------------------------------------*/
const lineColor = '#636363',
  lineDistance = '0.6rem';
const styles = {
  buttonStyle : {
    display : 'block',
    position : 'relative',
    height : '2rem',
    width : '2rem'
  },
  lineStyle : {
    position : 'absolute',
    height : '0.2rem',
    width : '1.6rem',
    backgroundColor : lineColor,
    marginLeft : '.2rem'
  }
};

export default SidebarToggler;