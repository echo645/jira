import { useEffect, useState } from "react";
export const isFalsy = (value) => value === 0 ? false : !value
export const cleanObject = (object) => {
    //Object.assign({}, object)
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        // if(!value){ //当值为0时会有问题
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}
export const useMount = (callback) => { //类似react中的componentDidMount,初始加载完后执行一次
    useEffect(() => {
        callback()
    }, []);
}

// const debounce = (func, delay) => {
//     let timeout;
//     return (...param) => {
//         if(timeout) {
//             clearTimeout(timeout);
//         }
//         timeout = setTimeout(function() {
//             func(...param);
//         }, delay);
//     }
// }
// const log = debounce(() => console.log('call'), 5000);
//log()
//log()
//log()

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        //每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        //每次在上一个useEffect处理完以后再运行   
        return () => clearTimeout(timeout); 
    }, [value, delay])
    return debounceValue;
}