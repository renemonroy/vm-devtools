import React, { PropTypes } from 'react';
let styles = null;

/** UIInputText Component
 *----------------------------------------------------------------------------*/
class UIInputText extends React.Component {

  static displayName = 'UIInputText';

  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  render() {
    const { type } = this.props;
    return (
      <div style={styles.wrapper} onClick={() => this._input.focus()}>
        {type === 'textarea' ?
          <textarea
            {...this.props}
            style={styles.input}
          /> :
          <input
            {...this.props}
            style={styles.input}
            ref={(comp) => {this._input = comp;}}
          />
        }
      </div>
    );
  }

}

/** UIInputText Component
 *----------------------------------------------------------------------------*/
styles = {
  wrapper: {
    borderBottom: '1px solid #e7e7e7',
    overflow: 'hidden',
  },
  input: {
    border: '0 none',
    lineHeight: '2.2rem',
    height: '2.2rem',
    width: '100%',
    display: 'inline-block',
    fontSize: '1.4rem',
    padding: '.2rem',
    fontWeight: 600,
    marginBottom: '.5rem',
    fontFamily: '"proxima-nova",sans-serif',
    color: '#4c4c4c',
  },
};

export default UIInputText;
