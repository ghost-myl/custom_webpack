import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import historyList from '../../utils/historyList';
import { MenuListType } from '../../typeList';
import stules from './topLayout.less';

type MenuTheme = any;
interface PropsType {
  children: any;
  theme: MenuTheme | undefined;
  historyList: Array<MenuListType>;
}

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

function TopLayout(props: PropsType) {
  const [selectedKeys, setselectedKeys] = useState<string[]>(['']);
  const [openKeys, setopenKeys] = useState<string[]>([]);
  const pathList = historyList();
  const history = useHistory();
  const { children, theme } = props;

  const openKeysList = () => {
    const openList: string[] = [];
    const hashs = window.location.hash.replaceAll('#/', '').split('/');
    const hashLength: string[] = hashs;
    for (let index = 1; index <= hashLength.length; index += 1) {
      const demo1 = `/${_.chunk(hashLength, index)[0].join('/')}`;
      openList.push(demo1);
    }
    return openList;
  };

  const onMenuClick = (args: any) => {
    history.push(args.key);
    setselectedKeys([(args?.key || '').replaceAll('#', '')]);
    setopenKeys(openKeysList());
  };

  useEffect(() => {
    setselectedKeys([(window.location.hash || '').replaceAll('#', '')]);
    setopenKeys(openKeysList());
  }, []);

  const subMenuList = (items: MenuListType) => (
    <SubMenu key={items.path} icon={items.icon} title={items.name}>
      {(items?.children || []).map((itemChildren: MenuListType) =>
        (itemChildren?.children || []).length > 0 ? (
          subMenuList(itemChildren)
        ) : (
          <Menu.Item key={itemChildren.path} icon={itemChildren.icon}>
            {itemChildren.name}
          </Menu.Item>
        ),
      )}
    </SubMenu>
  );

  const menuList = (pathList || []).map((item: MenuListType) => {
    if ((item?.children || []).length > 0) {
      return subMenuList(item);
    }
    return (
      <Menu.Item key={item.path} icon={item.icon}>
        {item.name}
      </Menu.Item>
    );
  });
  const change = (item: string[]) => {
    setopenKeys(_.compact(item));
  };
  const themeColor = theme === 'drak' ? '#001529' : '#fff';
  return (
    <Layout className="layout">
      <Header style={{ background: themeColor }}>
        <Menu
          onClick={onMenuClick}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={change}
          theme={theme}
          mode="horizontal"
        >
          {menuList}
        </Menu>
        <div className={stules.plusginaqwwe} />
      </Header>
      <Content style={{ padding: '0 50px', height: window.innerHeight - 142 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content"> {children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}
export default TopLayout;
