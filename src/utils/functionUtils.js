/**
 * 函数节流 每隔delay时间执行一次函数
 * @param {*} callback 需要节流的函数
 * @param {*} delay 延迟
 * @returns function
 */
function throttle(callback, delay){
    let start = 0
    return function(){
        const current = Date.now()
        if(current - start > delay){
            callback.apply(this, arguments)
            start = current
        }
    }
}
/**
 * 函数防抖 delay时间内，没有触发事件，则执行回调函数
 * @param {*} callback 
 * @param {*} delay 
 * @returns function
 */
function debounce(callback, delay){
    let timeoutId
    return function(e){
        console.log('防抖函数执行...')
        // 防抖函数执行时，将未执行完毕的定时器取消掉
        clearInterval(timeoutId)
        timeoutId = setTimeout(() => {
            callback.apply(this, arguments)
            console.log(this, arguments)
        }, delay)
    }
}

export {throttle, debounce}