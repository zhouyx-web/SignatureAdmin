import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Complete from './complete'
import Detail from './detail'

/*
商品路由
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/complete' component={Complete} exact/> {/*路径完全匹配*/}
        <Route path='/complete/detail' component={Detail}/>
        <Redirect to='/complete'/>
      </Switch>
    )
  }
}