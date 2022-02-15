import React, { ReactElement, useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import historyList from '../../utils/historyList';
import style from './leftLayout.less';

interface PropsType {
  children: any;
}

interface MenuListType {
  path: string;
  icon: ReactElement;
  name: string;
  children?: Array<MenuListType>;
}

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
function LeftLayout(props: PropsType) {
  const [selectedKeys, setselectedKeys] = useState<string[]>(['']);
  const [openKeys, setopenKeys] = useState<string[]>([]);
  const pathList = historyList();
  const history = useHistory();
  const { children } = props;
  const [collapsed, setcollapsed] = useState(false);
  const onCollapse = (item: boolean) => {
    setcollapsed(item);
  };

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
      {(items?.children || []).map((itemChildren: MenuListType) => ((itemChildren?.children || []).length > 0 ? (
        subMenuList(itemChildren)
      ) : (
        <Menu.Item key={itemChildren.path} icon={itemChildren.icon}>
          {itemChildren.name}
        </Menu.Item>
      )))}
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
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={style.plusginaqwwe} />
        <Menu
          theme="dark"
          onOpenChange={change}
          onClick={onMenuClick}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
        >
          {menuList}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
export default LeftLayout;
