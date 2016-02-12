import React, { PropTypes } from 'react';

/** SceneHeader Class
 *----------------------------------------------------------------------------*/
class SceneHeader extends React.Component {

  static displayName = 'SceneHeader';

  static propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    const { heading, description } = this.props,
      { headerStyle, headingStyle, descStyle } = styles;
    return (
      <header style={headerStyle}>
        <h2 style={headingStyle}>{heading}</h2>
        <p style={descStyle}>{description}</p>
      </header>
    );
  }

};

/** SceneHeader Styles
 *----------------------------------------------------------------------------*/
const styles = {
  headerStyle: {
    padding: '2rem 2.4rem'
  },
  headingStyle: {
    color: '#ffffff',
    fontSize: '2.4rem',
    fontWeight: 700,
    marginBottom: '.6rem'
  },
  descStyle: {
    color: '#ceced1',
    fontSize: '1.2rem',
    fontWeight: 300,
    lineHeight: '1.8rem'
  }
};

export default SceneHeader;