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
        this._maxHP = maxHP;
        this._HP = HP;
        this.divHPBar = document.createElement('div');
        this.divHP = document.createElement('div');
        divHPBar.classList.add('hp-bar-container');
        divHP.classList.add('hp-bar');
        divHPBar.appendChild(divHP);
        
        this.updateHP(HP);
    }

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
        if (newHP > this._maxHP) this._HP = this._maxHP;
        if (newHP < 0) this._HP = 0;
        let percent = Math.ceil(this._HP / this.maxHP) * 100;
        this.divHP.style = 'width: ' + percent + '%; '
        if (percent > 50)
            this.divHP.style += 'background: lime;';
        else if (25 < percent && percent <= 50)
            this.divHP.style += 'background: yellow;';
        else
            this.divHP.style += 'background: red;';
    }

    /**
     * 取得HTML元素。
     */
    getHTMLElement() {
        return this.divHPBar;
    }
}