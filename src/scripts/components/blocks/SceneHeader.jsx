import React, { PropTypes } from 'react';
import Radium from 'radium';
let styles = null;

/** SceneHeader Class
 *----------------------------------------------------------------------------*/
@Radium
class SceneHeader extends React.Component {

  static displayName = 'SceneHeader';

  static propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    background: PropTypes.string,
  };

  render() {
    const { heading, description, background } = this.props;
    const { headingStyle, descStyle } = styles;
    const headerStyle = styles.headerStyle;
    headerStyle.backgroundImage = background ? `url(${background})` : 'none';
    return (
      <header style={headerStyle}>
        <h2 style={headingStyle}>{heading}</h2>
        <p style={descStyle}>{description}</p>
      </header>
    );
  }

}

/** SceneHeader Styles
 *----------------------------------------------------------------------------*/
styles = {
  headerStyle: {
    padding: '2.1rem 2.4rem',
    backgroundSize: 'cover',
  },
  headingStyle: {
    color: '#ffffff',
    fontSize: '2.4rem',
    fontWeight: 700,
    marginBottom: '.6rem',
  },
  descStyle: {
    color: '#ceced1',
    fontSize: '1.2rem',
    fontWeight: 300,
    lineHeight: '1.8rem',
  },
};

export default SceneHeader;
