import React, { PropTypes } from 'react';
import Radium from 'radium';
import { MissionActions } from '../../actions';
import { connect } from 'react-redux';
import { paths } from '../../constants/Globals';
import _ from 'lodash';
const { remote, shell } = require('electron');
const Menu = remote.Menu;
const dialog = remote.dialog;
let styles = null;

/** Button Class for MissionsList Items
 *----------------------------------------------------------------------------*/
@Radium
class MissionItemButton extends React.Component {

  static displayName = 'MissionItemButton';

  static propTypes = {
    name: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { name, dispatch } = this.props;
    const { github, local: loc } = paths.missions;
    this.menu = Menu.buildFromTemplate([
      {
        label: 'View on GitHub',
        click: () => shell.openExternal(`${github}/${name}`),
      },
      {
        label: 'Open in Finder',
        click: () => dispatch(MissionActions.openInApp('finder', `${loc}/${name}`)),
      },
      {
        label: 'Open in Terminal',
        click: () => dispatch(MissionActions.openInApp('terminal', `${loc}/${name}`)),
      },
      {
        type: 'separator',
      },
      {
        label: 'Delete',
        click: () => {
          dialog.showMessageBox(null, {
            type: 'question',
            buttons: ['Delete', 'Cancel'],
            title: 'Delete Mission',
            message: `Are you sure you want to delete ${name} mission?`,
          }, (btnId) => {
            if (btnId === 1) return;
            this.deleteMission(name);
          });
        },
      },
    ]);
  }

  componentWillUnmount() {
    this._el.removeEventListener('contextmenu', ::this.openContextMenu);
  }

  onElementRender(el) {
    if (!this._el) {
      this._el = el;
      this._el.addEventListener('contextmenu', ::this.openContextMenu);
    }
  }

  openContextMenu(e) {
    e.preventDefault();
    this.menu.popup(remote.getCurrentWindow());
  }

  selectMission() {
    this.props.dispatch(MissionActions.fetchActiveMissionData(this.props.name));
  }

  deleteMission(name) {
    this.props.dispatch(MissionActions.setMission('delete', name));
  }

  render() {
    const { name, active: activated } = this.props;
    const { base, active } = styles.liStyle;
    const liStyles = [base, activated === true ? active : null];
    return (
      <li style={liStyles} onClick={::this.selectMission} ref={::this.onElementRender}>
        {_.startCase(name)}
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
