import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Layout from '../components/layout';
import Home from '../Pages/home';
import Detail from '../Pages/detail';
import './index.css';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
        </Switch>
      </Layout>
    </HashRouter>
  );
}
export default App;
