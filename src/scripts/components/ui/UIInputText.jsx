import React, { PropTypes } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import _ from 'lodash';
let styles = null;

/** UIInputText Component
 *----------------------------------------------------------------------------*/
class UIInputText extends React.Component {

  static displayName = 'UIInputText';

  static propTypes = {
    type: PropTypes.string.isRequired,
    debounceTime: PropTypes.number,
    value: PropTypes.string,
    addKeys: PropTypes.array,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    debounceTime: -1,
    addKeys: [9, 13],
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  componentWillMount() {
    this._debounce = null;
    this.addDebounce(this.props.debounceTime);
  }

  componentWillReceiveProps({ value, debounceTime }) {
    if (typeof value !== 'undefined' && this.state.value !== value) {
      this.setState({ value });
    }
    if (debounceTime !== this.props.debounceTime) {
      this.addDebounce(debounceTime);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    if (this._debounce.cancel) this._debounce.cancel();
  }

  addDebounce() {
    const { debounceTime, onChange } = this.props;
    if (debounceTime < 0) {
      this._debounce = () => null;
    } else if (debounceTime === 0) {
      this._debounce = onChange;
    } else {
      this._debounce = _.debounce(onChange, debounceTime);
    }
  }

  forceDebounce(e) {
    if (this._debounce.cancel) this._debounce.cancel();
    if (this.props.onChange) this.props.onChange(e);
  }

  handleChange(e) {
    e.persist();
    this.setState({ value: e.target.value }, () => {
      this._debounce(e);
    });
  }

  handleKeyDown(e) {
    if (this.props.addKeys.indexOf(e.keyCode) !== -1) this.forceDebounce(e);
    if (this.props.onKeyDown) this.props.onKeyDown(e);
  }

  handleBlur(e) {
    this.forceDebounce(e);
    if (this.props.onBlur) this.props.onBlur(e);
  }

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
            value={this.state.value}
            style={styles.input}
            ref={(comp) => {this._input = comp;}}
            onChange={::this.handleChange}
            onKeyDown={::this.handleKeyDown}
            onBlur={::this.handleBlur}
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
