import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import './App.less'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login }></Route>
          <Route path="/" component={ Admin }></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
