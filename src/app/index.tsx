import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Layout from '../components/layout';
import Home from '@/Pages/home';
import Detail from '../Pages/detail';
import { MenuListType } from '../typeList';
import historyList from '../utils/historyList';
import Grid from '../Pages/Grid';
import Layouts from '../Pages/layout';
import Menu from '../Pages/menu';
import Form from '../Pages/form';
import Forms from '../Pages/forms';
import './index.css';

/**
 *
 * @theme 主题 drak or light
 * @historyList  导航列表
 * @MenuDirection 导航方向
                  TOP
                  LEFT
 */
interface AppType {
  historyList: Array<MenuListType>;
  theme: any;
  MenuDirection: string;
}

function App() {
  const props: AppType = {
    historyList: historyList(),
    theme: 'light',
    MenuDirection: 'TOP',
  };

  return (
    <HashRouter>
      <Layout {...props}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/grid" component={Grid} />
          <Route exact path="/layouts" component={Layouts} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/Form" component={Form} />
          <Route exact path="/Forms" component={Forms} />
        </Switch>
      </Layout>
    </HashRouter>
  );
}
export default App;
