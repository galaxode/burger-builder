import React, { Fragment, Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    sideDrawerOpen: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  sideDrawerOpenHandler = () => {
    this.setState({sideDrawerOpen: true});
  }

  render() {
    return (
      <Fragment>
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
        <SideDrawer
          show={this.state.sideDrawerOpen}
          closeSideDrawer={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;
