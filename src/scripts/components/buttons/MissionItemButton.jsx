import React, { PropTypes } from 'react';
import Radium from 'radium';
import { MissionActions } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
const remote = require('electron').remote;
const Menu = remote.Menu;
let styles = null;

/** Button Class for MissionsList Items
 *----------------------------------------------------------------------------*/
@Radium
class MissionItemButton extends React.Component {

  static displayName = 'MissionItemButton';

  static propTypes = {
    name: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    template: PropTypes.array.isRequired,
  };

  static defaultProps = {
    template: [
      {
        label: 'View on GitHub',
        click: () => (console.log('View on GitHub...')),
      },
      {
        label: 'Open in Finder',
        click: () => (console.log('Open in Finder...')),
      },
      {
        label: 'Open in Terminal',
        click: () => (console.log('Open in Terminal...')),
      },
      {
        type: 'separator',
      },
      {
        label: 'Delete',
        click: () => (console.log('Delete Mission...')),
      },
    ],
  };

  componentWillMount() {
    this.menu = Menu.buildFromTemplate(this.props.template);
  }

  componentWillUnmount() {
    this._el.removeEventListener('contextmenu', ::this.openContextMenu);
  }

  onElementRender(el) {
    if (el) {
      this._el = el;
      this._el.addEventListener('contextmenu', ::this.openContextMenu);
    }
  }

  openContextMenu(e) {
    e.preventDefault();
    this.menu.popup(remote.getCurrentWindow(e.pageX, e.pageY));
  }

  selectMission() {
    this.props.dispatch(MissionActions.fetchActiveMissionData(this.props.name));
  }

  deleteMission() {
    this.props.dispatch(MissionActions.deleteMission(this.props.name));
  }

  render() {
    const { base } = styles.liStyle;
    const liStyles = [base];
    return (
      <li style={liStyles} onClick={::this.selectMission} ref={::this.onElementRender}>
        {_.startCase(this.props.name)}
      </li>
    );
  }

}

/** Button Styles for MissionsList Items
 *----------------------------------------------------------------------------*/
styles = {
  liStyle: {
    base: {
      color: '#666666',
      fontSize: '1.2rem',
      padding: '.4rem 2rem',
    },
    active: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 0 0 rgba(0,0,0,.06)',
    },
  },
};

export default connect()(MissionItemButton);
