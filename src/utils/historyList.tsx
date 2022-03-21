import React from 'react';
import { PicRightOutlined, StepForwardOutlined } from '@ant-design/icons';

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
      path: '/detail',
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
    {
      path: '/grid',
      exact: true,
      icon: <StepForwardOutlined />,
      name: '5',
    },
    {
      path: '/layouts',
      exact: true,
      icon: <PicRightOutlined />,
      name: '6',
    },
    {
      path: '/menu',
      exact: true,
      icon: <PicRightOutlined />,
      name: '7',
    },
    {
      path: '/Form',
      exact: true,
      icon: <PicRightOutlined />,
      name: '8',
    },
    {
      path: '/Forms',
      exact: true,
      icon: <PicRightOutlined />,
      name: '9',
    },
    {
      path: '/apply',
      exact: true,
      icon: <PicRightOutlined />,
      name: '10',
    },
    {
      path: '/grid1',
      exact: true,
      icon: <StepForwardOutlined />,
      name: '11',
    },
    {
      path: '/layouts1',
      exact: true,
      icon: <PicRightOutlined />,
      name: '12',
    },
    {
      path: '/menu1',
      exact: true,
      icon: <PicRightOutlined />,
      name: '13',
    },
    {
      path: '/Form1',
      exact: true,
      icon: <PicRightOutlined />,
      name: '14',
    },
    {
      path: '/Forms1',
      exact: true,
      icon: <PicRightOutlined />,
      name: '15',
    },
    {
      path: '/apply1',
      exact: true,
      icon: <PicRightOutlined />,
      name: '16',
    },

    {
      path: '/grid2',
      exact: true,
      icon: <StepForwardOutlined />,
      name: '17',
    },
    {
      path: '/layouts2',
      exact: true,
      icon: <PicRightOutlined />,
      name: '18',
    },
    {
      path: '/menu2',
      exact: true,
      icon: <PicRightOutlined />,
      name: '19',
    },
    {
      path: '/Form2',
      exact: true,
      icon: <PicRightOutlined />,
      name: '20',
    },
    {
      path: '/Forms2',
      exact: true,
      icon: <PicRightOutlined />,
      name: '21',
    },
    {
      path: '/apply2',
      exact: true,
      icon: <PicRightOutlined />,
      name: '22',
    },
  ];
}

export default HistoryList;
