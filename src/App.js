import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/checkout' component={props => <Checkout {...props} />} />
          <Route path='/orders' component={props => <Orders {...props}/>} />
          <Route path='/auth' component={props => <Auth {...props}/>} />
          <Route path='/' exact component={props => <BurgerBuilder {...props}/>} />
        </Layout>
      </div>
    );
  }
}

export default App;
