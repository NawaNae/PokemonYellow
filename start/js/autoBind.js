/**
 * 自動綁定this為此物件
 * @param {*} obj 
 */
function autoBind(obj) {
    for (let o = obj; o; o = Object.getPrototypeOf(o)){
        for (let name of Object.getOwnPropertyNames(o)){
            if (typeof obj[name] === 'function'){
                obj[name] = obj[name].bind(obj);
            }
        }
    }
}