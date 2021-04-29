import React, { useState, useEffect } from "react";

function Example(){
    // useState(initValue) 返回一对值，当前状态与修改他的函数
    // initValue只在组件第一次渲染时使用
    // 可以同时使用多个state
    
    const [ count, setCount ] = useState(0)
    // ComponentDidUpdata() ComponentDidMount() ComponentWillUnmount() 三个函数的组合
    useEffect(() => {
        // 使用浏览器的 API 更新页面标题
        document.title = `You clicked ${count} times`;
      });
    {/**
    class组件使用副作用的问题(订阅与取消、操作DOM、请求数据)
     * 1.订阅与取消这个整体的逻辑被分散到ComponentDidMount() ComponentWillUnmount()
     * 2.每次render后操作DOM同一个逻辑被分散到ComponentDidUpdata() ComponentDidMount()
     * 3.订阅与取消、DOM操作等无关逻辑被集中到某一声明周期函数中
     * 
     * 4.订阅与取消的功能如果处理不当，容易造成内存泄露
     * 使用useEffect的优势：
     * 1.不会产生上述内存泄漏的BUG，即使不主动处理 
     *  它会在调用一个新的 effect 之前对前一个 effect 进行清理(取消订阅，useEffect的返回值)
     *  同时，第二个参数可以优化effect执行过程，当指定参数发生变化时，才进行上次effect的清理
     *  和下次effect的执行
     * 2.可以使用多个useEffect()避免逻辑关系混乱
    */}
    return(
        <div>
            <p>you clicked { count } times</p>
            <button onClick={() => {setCount(count + 1)}}>
                clike me
            </button>
        </div>
    )
}

export { Example }