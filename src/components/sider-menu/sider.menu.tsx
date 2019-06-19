import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { SiderProps } from 'antd/lib/layout'
const { Sider } = Layout
type BaseMenuProps = {
  collapsed: boolean
}
/**
 * @todo menu菜单生成
 * context获取 collapsed
 */
export type IProps = SiderProps & BaseMenuProps
export default function SiderMenu(props: IProps) {
  const { collapsed } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <span>
            <Icon type="user" />
            <Link to={'test'}>testPage</Link>
          </span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span>nav 3</span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
