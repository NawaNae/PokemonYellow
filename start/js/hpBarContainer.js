/**
 * @class HPBarContainer
 * @classdesc 自訂的HTML元件集合。
 * 
 * @prop {HTMLDivElement} divHPBar 生命容器的HTML元素。
 * @prop {HTMLDivElement} divHP 生命條的HTML元素。
 * @prop {number} maxHP 最大生命值。
 * @prop {number} HP 當前生命值。
 */
GameSystem.Classes.HPBarContainer =
class HPBarContainer {
    /**
     * @param {number} maxHP 最大生命值。為非負數整數。
     * @param {number} HP 當前生命值。為非負數整數。
     */
    constructor(maxHP, HP) {
        this._maxHP = maxHP;                                // 儲存最大生命值
        this._HP = HP;                                      // 儲存當前生命值
        this.divHPBar = document.createElement('div');      // 建立HP容器
        this.divHPBar.classList.add('hp-bar-container');    // 加入 class : hp-bar-container
        this.divHP = document.createElement('div');         // 建立HP條
        this.divHP.classList.add('hp-bar');                 // 加入 class : hp-bar
        this.divHPBar.appendChild(this.divHP);              // 將 divHP 加入至 divHPBar 中
        
        this.updateHP(HP);
    }

    get HP() { return this._HP; }
    get MaxHP() { return this._maxHP; }

    /**
     * 設定血量。
     * @prop {number} newHP 新的當前生命值。
     * @prop {number?} newMaxHP 新的最大生命值。
     */
    updateHP(newHP, newMaxHP) {
        // 設定maxHP
        if (newMaxHP != undefined) {
            this._maxHP = newMaxHP;
        }

        // 設定HP
        if (newHP > this._maxHP) 
            this._HP = this._maxHP;
        else if (newHP < 0)
            this._HP = 0;
        else
            this._HP = newHP;

        // 更新顯示
        let percent = Math.ceil((this._HP / this._maxHP) * 100);
        console.log(percent);
        if (percent > 50)
            this.divHP.style = 'width: ' + percent + '%; ' + 'background: lime;';
        else if (25 < percent && percent <= 50)
            this.divHP.style = 'width: ' + percent + '%; ' + 'background: yellow;';
        else
            this.divHP.style = 'width: ' + percent + '%; ' + 'background: red;';
    }

    /**
     * 取得HTML元素。
     */
    getHTMLElement() {
        return this.divHPBar;
    }
}