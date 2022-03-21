import React from 'react';
import LeftLayout from './leftLayout';
import TopLayout from './topLayout';
import { MenuListType } from '../../typeList';

interface LayouType {
  theme: any;
  MenuDirection: string;
  historyList: Array<MenuListType>;
  children: any;
}

function Layout(props: LayouType) {
  const { MenuDirection, ...other } = props;
  return (
    <div>
      {MenuDirection === 'TOP' && <TopLayout {...other} />}
      {MenuDirection === 'LEFT' && <LeftLayout {...other} />}
    </div>
  );
}

export default Layout;
