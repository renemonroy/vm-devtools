import React from 'react';
import Radium from 'radium';

/** UIInputTag Class
 *----------------------------------------------------------------------------*/
@Radium
class UIInputTag extends React.Component {

  static displayName = 'UIInputTag';

  static propTypes = {
    tags: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    addKeys: React.PropTypes.array,
    removeKeys: React.PropTypes.array,
    onChange: React.PropTypes.func,
    color: React.PropTypes.oneOf(['lilac', 'salmon', 'green'])
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
    this.state = { tagName : '' };
  }

  addTag() {
    let { tagName } = this.state, newTags = null;
    if ( tagName !== '' || tagName !== ' ' ) {
      newTags = this.props.tags.concat([tagName]);
      this.props.onChange(newTags);
      this.setState({ tagName : '' });
    }
  }

  removeTag(i) {
    let newTags = this.props.tags.concat([]);
    if ( i > -1 && i < newTags.length ) {
      newTags.splice(i, 1);
      this.props.onChange(newTags);
    }
  }

  handleKeyDown(e) {
    const tagsSize = this.props.tags.length;
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
    const { tagName } = this.state,
      { tags, placeholder, color } = this.props,
      { wrapperStyle, inputStyle, tagStyle, tagNameStyle, iconStyle } = styles,
      tagStyles = [tagStyle.base, tagStyle[color]],
      iconStyles = [iconStyle.base, iconStyle[color]];
    return (
      <div style={wrapperStyle} onClick={(e) => this._input.focus()}>
        <div>
          {tags.map((tag, i) =>
            <span key={'tag-' + i} style={tagStyles}>
              <span style={tagNameStyle}>{tag}</span>
              <i
                style={iconStyles}
                className="icon-close"
                onClick={this.removeTag.bind(this,i)}>
              </i>
            </span>
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
    borderBottom : '1px solid #e7e7e7',
    overflow : 'hidden'
  },
  inputStyle : {
    border : '0 none',
    lineHeight : '2.2rem',
    height : '2.2rem',
    display : 'inline-block',
    fontSize : '1.3rem',
    padding : '.2rem',
    fontWeight : 100,
    marginBottom : '.5rem'
  },
  tagStyle : {
    base : {
      padding : '0 .6rem',
      display : 'inline-block',
      marginBottom : '.5rem',
      marginRight : '.5rem',
      fontWeight : '600',
      color : '#4c4c4c',
      overflow : 'hidden',
      float : 'left'
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
  },
  tagNameStyle : {
    display : 'inline-block',
    fontWeight : 600,
    float : 'left',
    marginTop : '.3rem',
    marginRight : '.4rem'
  },
  iconStyle : {
    base : {
      fontFamily : 'VMDevTools',
      speak : 'none',
      fontStyle : 'normal',
      fontWeight : 'normal',
      fontVariant : 'normal',
      textTransform : 'none',
      lineHeight : 1,
      WebkitFontSmoothing : 'antialiased',
      fontSize : '1.4rem',
      display : 'inline-block',
      height : '1.4rem',
      widht : '1.4rem',
      marginTop : '.4rem',
      marginBottom : '.4rem',
      borderRadius : '.7rem'
    },
    lilac : {
      color : '#b083b2',
      backgroundColor : '#e9d7ea'
    },
    salmon : {
      color : '#c79393',
      backgroundColor : '#f1d8d8'
    },
    green : {
      color : '#83b28e',
      backgroundColor : '#d6eadc'
    }
  }
};

export default UIInputTag;