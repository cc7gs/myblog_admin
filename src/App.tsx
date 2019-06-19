import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MenuRoutes } from './pages/menu.routes'
import { PageLoading } from './components'
import Test from './pages/test.page'
import SiderMenu from './components/sider-menu/sider.menu'
import './App.css';
const { Header, Content, Footer, } = Layout

//@todo Menu、content
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  }
  console.log(collapsed, 'app');
  return (
    <div className="App">
      <header className="App-header">
        {layout(collapsed, handleCollapsed)}
      </header>
    </div>
  );
}
const layout = (collapsed: boolean, triggerColse: () => void) => (
  <Router>
    <Layout>
      <SiderMenu collapsed={collapsed} />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={triggerColse}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <React.Suspense fallback={<PageLoading />}>
            <MenuRoutes />
          </React.Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>cc blog admin system </Footer>
      </Layout>
    </Layout>
  </Router>
)
export default App;
