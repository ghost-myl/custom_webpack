import React from 'react';
import LeftLayout from './leftLayout';
import TopLayout from './topLayout';

function Layout(props: any) {
  return (
    <div>
      <LeftLayout {...props} />
      <TopLayout {...props} />
    </div>
  );
}

export default Layout;
