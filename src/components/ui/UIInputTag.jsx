import React from 'react';
import Radium from 'radium';

/** UIInputTag Class
 *----------------------------------------------------------------------------*/
@Radium
class UIInputTag extends React.Component {

  static displayName = 'UIInputTag';

  static propTypes = {
    placeholder : React.PropTypes.string,
    addKeys : React.PropTypes.array,
    removeKeys : React.PropTypes.array,
    onChange : React.PropTypes.func,
    color : React.PropTypes.oneOf(['lilac', 'salmon', 'green'])
  };

  static defaultProps = {
    placeholder : 'Add a tag',
    addKeys : [9, 13],
    removeKeys : [8],
    onChange : (e) => {},
    color : 'lilac'
  };

  constructor(props) {
    super(props);
    this.state = { tags : [], tagName : '' };
  }

  addTag() {
    let { tagName, tags } = this.state,
      newTags = null;
    if ( tagName !== '' || tagName !== ' ' ) {
      newTags = tags.concat([tagName]);
      this.updateTags({ tags : newTags, tagName : '' });
    }
  }

  removeTag(i) {
    let newTags = this.state.tags.concat([]);
    if ( i > -1 && i < newTags.length ) {
      newTags.splice(i, 1);
      this.updateTags({ tags : newTags });
    }
  }

  updateTags(e) {
    const { onChange } = this.props;
    this.setState(e);
    onChange(e.tags);
  }

  handleKeyDown(e) {
    const tagsSize = this.state.tags.length;
    if ( this.props.addKeys.indexOf(e.keyCode) !== -1 ) {
      e.preventDefault();
      this.addTag();
    }
    if ( (this.props.removeKeys.indexOf(e.keyCode) !== -1)
      && (tagsSize > 0)
      && (this.state.tagName === '')) {
      e.preventDefault();
      this.removeTag(tagsSize - 1);
    }
  }

  render() {
    const { tagName, tags } = this.state,
      { placeholder, color } = this.props,
      { wrapperStyle, inputStyle, tagStyle } = styles,
      tagStyles = [tagStyle.base, tagStyle[color]];
    return (
      <div style={wrapperStyle} onClick={(e) => this._input.focus()}>
        <div>
          {tags.map((tag, i) =>
            <span key={'tag-' + i} style={tagStyles}>{tag}</span>
          )}
          <input
            value={tagName}
            placeholder={placeholder}
            style={inputStyle}
            type="text"
            ref={(comp) => this._input = comp}
            onChange={(e) => {this.setState({ tagName : e.target.value })}}
            onKeyDown={::this.handleKeyDown}/>
        </div>
      </div>
    );
  }

};

/** UIInputTag Styles
 *----------------------------------------------------------------------------*/
const styles = {
  wrapperStyle : {
    borderBottom : '1px solid #e7e7e7'
  },
  inputStyle : {
    border : '0 none',
    lineHeight : '2.2rem',
    height : '2.2rem',
    display : 'inline-block',
    fontSize : '1.3rem',
    padding : '.2rem',
    fontWeight : 100,
    marginBottom : '.1rem'
  },
  tagStyle : {
    base : {
      lineHeight : '2.2rem',
      padding : '0 .6rem',
      display : 'inline-block',
      marginBottom : '.5rem',
      marginRight : '.5rem',
      fontWeight : '600',
      color : '#4c4c4c'
    },
    lilac : {
      backgroundColor : '#e1cbe2'
    },
    salmon : {
      backgroundColor : '#eccfcf'
    },
    green : {
      backgroundColor : '#cbe2d1'
    }
  }
};

export default UIInputTag;