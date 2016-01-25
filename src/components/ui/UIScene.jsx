import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

/** Scene Class
 *----------------------------------------------------------------------------*/
@Radium
class UIScene extends React.Component {

  static propTypes = {
    name : React.PropTypes.string.isRequired
  };

  render() {
    let { name, children, style } = this.props;
    let { sceneStyle } = styles;
    let className = cx({ [name + '-scene'] : true });
    let sceneStyl = [sceneStyle.base, style];
    return (
      <section className={className} style={sceneStyl}>
        {children}
      </section>
    );
  }

};

/** Scene Styles
 *----------------------------------------------------------------------------*/
const styles = {
  sceneStyle : {
    base : {
      height : '100%',
      width : '100%',
      padding : '6.3rem 2rem 2rem',
      overflowY : 'auto'
    }
  }
};

export default UIScene;