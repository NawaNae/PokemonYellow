/**
 * @class SignBoard
 * @description 告示牌的class
 */
GameSystem.Classes.SignBoard=
class SignBoard
{
    /**
     * @description 以option物件包覆,可選擇輸入參數，Position必填
     * @param { name:option.name - string 告示牌的名稱 }
     * @param { name:option.content - Polt 告示牌的內容(與劇情相同)}
     * @param { name:option.position - Position OR {x:Number,y:number} *告示牌的位置} 
     */
    constructor(option={name:"",content:"",position:undefined})
    {
        this.name=option.name;
        this.plot=option.content;
        if(!option.position)
            console.log( "請設定position來正常運作告示牌，預設為{x:0,y:0}")
        this.position=option.position||{x:0,y:0};
    }
    get content(){return this.plot;}
    set content(val){this.plot=val;}
}