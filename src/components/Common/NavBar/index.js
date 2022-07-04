import './style.css'
import * as React from 'react';
import { useNavigate  } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const pages = ['statistics', 'histograms', 'boxplots'];
const pagesPortuguese = {'statistics': 'Estatísticas', 'histograms': 'Histogramas', 'boxplots': 'Boxplots'};

const ResponsiveAppBar = () => {

const navigate = useNavigate();

  const changePage = (page) => {
    navigate(`/${page}`)
  };

  return (
    <Header
      style={{
        zIndex: 1,
        width: '100%',
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['3']}
        items={pages.map((page) => ({
          key: page,
          label: pagesPortuguese[page],
          onClick:() => changePage(page)
        }))}
      />
    </Header>

  );
};
export default ResponsiveAppBar;