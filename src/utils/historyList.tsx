import React from 'react';
import { PicRightOutlined } from '@ant-design/icons';

function HistoryList() {
  return [
    {
      path: '/',
      exact: true,
      icon: <PicRightOutlined />,
      name: '1',
    },
    {
      path: '/one',
      exact: true,
      icon: <PicRightOutlined />,
      name: '2',
      children: [
        {
          name: '21',
          path: '/one/one',
          exact: true,
          icon: <PicRightOutlined />,
          children: [
            {
              name: '211',
              path: '/one/one/one',
              exact: true,
              icon: <PicRightOutlined />,
              children: [
                {
                  name: '2111',
                  path: '/one/one/one/one',
                  exact: true,
                  icon: <PicRightOutlined />,
                  children: [
                    {
                      name: '21111',
                      path: '/one/one/one/one/one',
                      exact: true,
                      icon: <PicRightOutlined />,
                      children: [
                        {
                          name: '211111',
                          path: '/one/one/one/one/one/one',
                          exact: true,
                          icon: <PicRightOutlined />,
                          children: [
                            {
                              name: '2111111',
                              path: '/one/one/one/one/one/one/one/one',
                              exact: true,
                              icon: <PicRightOutlined />,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/two',
      exact: true,
      icon: <PicRightOutlined />,
      name: '3',
    },
    {
      path: '/three',
      exact: true,
      icon: <PicRightOutlined />,
      name: '4',
      children: [
        {
          name: '41',
          path: '/three/three',
          exact: true,
          icon: <PicRightOutlined />,
        },
      ],
    },
  ];
}

export default HistoryList;
