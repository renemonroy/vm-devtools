import React from 'react';
import Radium from 'radium';
import { hashHistory } from 'react-router';
import { UIButton, UIIcon } from '../ui';

/** Navigation Button Class
 *----------------------------------------------------------------------------*/
@Radium
class NavigationButton extends React.Component {

  static displayName = "NavigationButton";

  static contextTypes = {
    router : React.PropTypes.object
  };

  static propTypes = {
    icon : React.PropTypes.string.isRequired,
    href : React.PropTypes.string.isRequired
  };

  onClick(e) {
    const { href } = this.props;
    e.preventDefault();
    hashHistory.push(href);
  }

  render() {
    const { href, icon } = this.props,
      { button } = styles,
      buttonMode = this.context.router.isActive(href) ? 'active' : 'normal',
      buttonStyle = [button.base, button[buttonMode]];
    return (
      <UIButton
        style={buttonStyle}
        onClick={this.onClick.bind(this)}>
        <UIIcon name={icon} size="22" />
      </UIButton>
    );
  }

};

/** Styles for each Navigation Button
 *----------------------------------------------------------------------------*/
const styles = {
  button : {
    base : {
      width : '100%',
      textAlign : 'center',
      padding : '.8rem 0',
    },
    normal : {
      backgroundColor : 'transparent',
      color : '#7d7d7d'
    },
    active : {
      backgroundColor : '#3f4041',
      color : '#ffffff'
    }
  }
};

export default NavigationButton;