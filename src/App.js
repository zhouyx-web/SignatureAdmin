import AntdTest from './components/antd-test/index'
import {Button} from 'antd'

import './App.less';

function App() {
  return (
    <div className="App">
      <AntdTest />
      <Button type="ghost">测试</Button>
    </div>
  );
}

export default App;
