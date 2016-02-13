import React, { PropTypes } from 'react';
import Radium from 'radium';
import { hashHistory } from 'react-router';
import { UIButton, UIIcon } from '../ui';
let styles = null;

/** Navigation Button Class
 *----------------------------------------------------------------------------*/
@Radium
class NavigationButton extends React.Component {

  static displayName = 'NavigationButton';

  static propTypes = {
    icon: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  onClick(e) {
    const { href } = this.props;
    e.preventDefault();
    hashHistory.push(href);
  }

  render() {
    const { href, icon } = this.props;
    const { button } = styles;
    const buttonMode = this.context.router.isActive(href) ? 'active' : 'normal';
    const buttonStyle = [button.base, button[buttonMode]];
    return (
      <UIButton style={buttonStyle} onClick={::this.onClick}>
        <UIIcon name={icon} size="22" />
      </UIButton>
    );
  }

}

/** Styles for each Navigation Button
 *----------------------------------------------------------------------------*/
styles = {
  button: {
    base: {
      width: '100%',
      textAlign: 'center',
      padding: '.8rem 0',
    },
    normal: {
      backgroundColor: 'transparent',
      color: '#7d7d7d',
    },
    active: {
      backgroundColor: '#3f4041',
      color: '#ffffff',
    },
  },
};

export default NavigationButton;
