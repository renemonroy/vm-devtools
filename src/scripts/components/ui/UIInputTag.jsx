import React, { PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
let styles = null;

/** UIInputTag Class
 *----------------------------------------------------------------------------*/
@Radium
class UIInputTag extends React.Component {

  static displayName = 'UIInputTag';

  static propTypes = {
    tags: PropTypes.array,
    placeholder: PropTypes.string,
    addKeys: PropTypes.array,
    removeKeys: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.oneOf(['lilac', 'salmon', 'green']),
    stringCase: PropTypes.string,
    argChar: PropTypes.strong,
  };

  static defaultProps = {
    placeholder: 'Add a tag',
    addKeys: [9, 13],
    removeKeys: [8],
    color: 'lilac',
    stringCase: 'none',
    argChar: ' @',
    onAdd: () => {},
    onRemove: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { tagName: '' };
  }

  buildTag(tagName) {
    const { argChar } = this.props;
    let val = '';
    let arg = '';
    let realName = tagName;
    if (tagName.indexOf(argChar) !== -1) {
      const tagArr = _.split(tagName, argChar, 2);
      realName = tagArr[0];
      arg = _.lowerCase(tagArr[1]).replace(/\s/g, '');
    }
    val = this.handleStringCase(realName);
    return { name: val, type: arg };
  }

  addTag() {
    const { tagName } = this.state;
    if (tagName !== '' || tagName !== ' ') {
      const tag = this.buildTag(tagName);
      const newTags = this.props.tags.concat([tag]);
      this.props.onChange(newTags, tag);
      this.setState({ tagName: '' });
    }
  }

  removeTag(i) {
    const newTags = this.props.tags.concat([]);
    if (i > -1 && i < newTags.length) {
      const removedTag = this.props.tags[i];
      newTags.splice(i, 1);
      this.props.onChange(newTags, removedTag);
    }
  }

  handleKeyDown(e) {
    const tagsSize = this.props.tags.length;
    if (this.props.addKeys.indexOf(e.keyCode) !== -1) {
      e.preventDefault();
      this.addTag();
    }
    if ((this.props.removeKeys.indexOf(e.keyCode) !== -1)
      && (tagsSize > 0)
      && (this.state.tagName === '')) {
      e.preventDefault();
      this.removeTag(tagsSize - 1);
    }
  }

  handleStringCase(str) {
    switch (this.props.stringCase) {
      case 'class':
        return _.startCase(str).replace(/\s/g, '');
      default :
        return str;
    }
  }

  render() {
    const { tagName } = this.state;
    const { tags, placeholder, color } = this.props;
    const { wrapperStyle, inputStyle, tagStyle, tagNameStyle, iconStyle } = styles;
    const tagStyles = [tagStyle.base, tagStyle[color]];
    const icStyl = [iconStyle.base, iconStyle[color]];
    return (
      <div style={wrapperStyle} onClick={() => this._input.focus()}>
        <div>
          {_.map(tags, (tag, i) =>
            <span key={`tag-${tag.name}`} style={tagStyles}>
              <span style={tagNameStyle}>{tag.name}</span>
              {tag.type ? <em>{tag.type}</em> : null}
              <i style={icStyl} className="icon-close" onClick={this.removeTag.bind(this, i)} />
            </span>
          )}
          <input
            value={tagName}
            placeholder={placeholder}
            style={inputStyle}
            type="text"
            ref={(comp) => {this._input = comp;}}
            onChange={(e) => {this.setState({ tagName: e.target.value });}}
            onKeyDown={::this.handleKeyDown}
          />
        </div>
      </div>
    );
  }

}

/** UIInputTag Styles
 *----------------------------------------------------------------------------*/
styles = {
  wrapperStyle: {
    borderBottom: '1px solid #e7e7e7',
    overflow: 'hidden',
  },
  inputStyle: {
    border: '0 none',
    lineHeight: '2.2rem',
    height: '2.2rem',
    display: 'inline-block',
    fontSize: '1.4rem',
    padding: '.2rem',
    fontWeight: 600,
    marginBottom: '.5rem',
    fontFamily: '"proxima-nova",sans-serif',
    color: '#4c4c4c',
  },
  tagStyle: {
    base: {
      padding: '0 .6rem',
      display: 'inline-block',
      marginBottom: '.5rem',
      marginRight: '.5rem',
      fontWeight: '600',
      color: '#4c4c4c',
      overflow: 'hidden',
      float: 'left',
    },
    lilac: {
      backgroundColor: '#e1cbe2',
    },
    salmon: {
      backgroundColor: '#eccfcf',
    },
    green: {
      backgroundColor: '#cbe2d1',
    },
  },
  tagNameStyle: {
    display: 'inline-block',
    fontWeight: 600,
    float: 'left',
    marginTop: '.3rem',
    marginRight: '.4rem',
  },
  iconStyle: {
    base: {
      fontFamily: 'VMDevTools',
      speak: 'none',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textTransform: 'none',
      lineHeight: 1,
      WebkitFontSmoothing: 'antialiased',
      fontSize: '1.4rem',
      display: 'inline-block',
      height: '1.4rem',
      widht: '1.4rem',
      marginTop: '.4rem',
      marginBottom: '.4rem',
      borderRadius: '.7rem',
    },
    lilac: {
      color: '#b083b2',
      backgroundColor: '#e9d7ea',
    },
    salmon: {
      color: '#c79393',
      backgroundColor: '#f1d8d8',
    },
    green: {
      color: '#83b28e',
      backgroundColor: '#d6eadc',
    },
  },
};

export default UIInputTag;
