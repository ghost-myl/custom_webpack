import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import style from './leftLayout.less';
import { MenuListType } from '../../typeList';

type MenuTheme = any;

interface PropsType {
  children: any;
  historyList: Array<MenuListType>;
  theme: MenuTheme | undefined;
}

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
function LeftLayout(props: PropsType) {
  const [selectedKeys, setselectedKeys] = useState<string[]>(['']);
  const [openKeys, setopenKeys] = useState<string[]>([]);
  const history = useHistory();
  const { children, historyList, theme = 'drak' } = props;
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

  const menuList = (historyList || []).map((item: MenuListType) => {
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ background: themeColor }}>
        <div className={style.plusginaqwwe} />
        <Menu
          theme={theme}
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
        <Header className="site-layout-background" style={{ padding: 0, background: themeColor }} />
        <Content style={{ margin: '0 16px', height: window.innerHeight - 142 }}>
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
