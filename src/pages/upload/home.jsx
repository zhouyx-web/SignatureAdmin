import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Upload from './upload'
import DocEditor from './doc-editor'

/*
商品路由
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/uploadfile' component={Upload} exact/> {/*路径完全匹配*/}
        <Route path='/uploadfile/doc-editor' component={DocEditor}/>
        <Redirect to='/uploadfile'/>
      </Switch>
    )
  }
}