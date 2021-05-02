import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import LeftNav from '../../components/left-nav/index'
import HeaderInner from '../../components/header/index'
import routeConfig from '../../config/routeConfig'

const { Header, Content, Footer, Sider } = Layout
const generateRouteList = routeConfig => {
  return routeConfig.map(menuItem => (<Route {...menuItem}/>)) 
}

export default function Admin (){

  return (
      <Layout style={{ minHeight: '100vh' }} >
      <Sider style={{backgroundColor:'#fafafa'}} breakpoint='md' collapsedWidth="0">
        <LeftNav></LeftNav>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, backgroundColor:'#fafafa' }} >
          <HeaderInner></HeaderInner>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            {generateRouteList(routeConfig)}
            <Redirect to="/home"/>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>WeChat Signature Admin</Footer>
      </Layout>
    </Layout>
  )
} 