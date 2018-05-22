var GameSystem=GameSystem||{};GameSystem.Classes=GameSystem.Classes||{};
GameSystem.Classes.InputManager=
class InputManager
{
    constructor()
    {
        this.level;
        GameSystem.Manager.Key.keyInput=(e)=>{this.keyInput(e);}
    }
    get currentLevel()
    {
        if(Framework&&Framework.Game&&Framework.Game._currentLevel)
            return Framework.Game._currentLevel;
        console.log("無法取得現在的Level");
        return undefined;
    }
    set currentLevel(val)
    {console.log("currentLevel在InputManger為readOnly");}
    updateLevel(level)
    {this.level=level||this.currentLevel;}
    keyInput(e)
    {
        
    }
}
