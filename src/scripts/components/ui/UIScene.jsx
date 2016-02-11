import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

/** Scene Class
 *----------------------------------------------------------------------------*/
@Radium
class UIScene extends React.Component {

  static displayName = 'UIScene';

  static propTypes = {
    name : React.PropTypes.string.isRequired,
    header: React.PropTypes.func,
    sidebar: React.PropTypes.func,
    content: React.PropTypes.func
  };

  render() {
    let { name, header, sidebar, content, style } = this.props;
    let { sceneStyle, sidebarStyle } = styles;
    let className = cx({ [name + '-scene'] : true });
    let sceneStyl = [sceneStyle.base, style];
    return (
      <section className={className} style={sceneStyl}>
        {header ? <div>{header()}</div> : null}
        {sidebar ? <div style={sidebarStyle}>{sidebar()}</div> : null}
        {content ? <div>{content()}</div> : null}
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
      padding : '2.1rem 0 0',
      overflowY : 'auto'
    }
  },
  sidebarStyle : {
    backgroundColor: '#f3f3f4',
    height: '100%',
    width: '15rem',
    float: 'left'
  }
};

export default UIScene;