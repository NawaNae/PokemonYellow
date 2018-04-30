/**
 * @class Plot
 * @classdesc 劇情，在玩家與NPC或物件對話時所會用到的內容安排。
 * 
 * @prop {string} name 劇情的名稱。
 * @prop {Paragraph[]} content 劇情的內容安排。
 */
GameSystem.Classes.Plot =
class Plot {
    /**
     * @param {string} name 劇情的名稱。
     * @param {Paragraph[]?} content 劇情的內容安排。
     */
    constructor(name, content = []) {
        this._name = name;
        this._content = content;
        this.index=0;
    }

    set name(newName) { this._name = newName; }
    get name() { return this._name; }

    set content(newContent) { this._content = newContent; }
    get content() { return this._content; }
}

GameSystem.Resource.PlotExample = 
    new GameSystem.Classes.Plot("Test", [
        new GameSystem.Classes.Paragraph("Paragraph A"),
        new GameSystem.Classes.Paragraph("Paragraph B"),
        new GameSystem.Classes.Paragraph("Paragraph C"),
        new GameSystem.Classes.Paragraph("Long paragraph Test\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida nunc vitae diam vehicula feugiat. Praesent tempor iaculis blandit. Etiam euismod orci et dui condimentum blandit. Sed sit amet mattis dui, sed suscipit quam. Donec a fringilla mauris, sit amet tempus ante. Vivamus sodales molestie tristique. Maecenas sit amet pulvinar tortor. Maecenas porta sit amet lorem at scelerisque. Nunc tempus faucibus nisi quis semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam bibendum efficitur velit, sit amet finibus mi egestas in. Pellentesque a augue vitae nibh congue mattis sed sit amet orci.\nPraesent eget mattis sapien. Morbi ullamcorper ante et imperdiet porta. Cras cursus, est id cursus vestibulum, mauris diam dictum felis, sed molestie metus nulla vitae nibh. Praesent porttitor pharetra ex, id eleifend quam porttitor in. Nulla maximus, eros a elementum mattis, metus nisi suscipit metus, quis facilisis urna leo eu nunc. Maecenas velit magna, sodales eu sem vel, aliquet finibus velit. Sed lobortis rhoncus leo, sit amet dapibus metus posuere ac. Mauris accumsan mi faucibus, egestas turpis at, tincidunt dolor. Morbi eu ipsum molestie, gravida est et, ultrices metus. Mauris et tincidunt ipsum. Nullam gravida ultrices justo. Pellentesque id lorem a purus auctor rutrum at vel sapien. Etiam gravida augue sit amet vehicula rutrum. Vestibulum lacus augue, porta eu neque pharetra, sagittis commodo mi. Curabitur turpis orci, convallis nec diam in, auctor eleifend odio.\nCurabitur sit amet condimentum urna. Maecenas euismod sem convallis, tempor risus a, pulvinar leo. Nam volutpat lacus tellus, non ultricies augue tempus at. Integer malesuada laoreet ante, ut egestas diam pulvinar at. Aliquam erat volutpat. Sed id venenatis tortor. Phasellus condimentum nibh in viverra accumsan. Nullam eu mauris elementum, consequat urna in, viverra justo. In ut libero tincidunt, faucibus turpis ac, elementum mi. Fusce a nisi a lectus imperdiet pellentesque id id felis. Praesent mattis lectus quis justo accumsan tempor. In imperdiet tristique felis ut maximus. Etiam iaculis, sapien id ornare bibendum, lorem urna euismod quam, id dictum leo quam non nibh. Vestibulum pellentesque metus arcu, interdum eleifend dui dignissim ut. Ut venenatis id diam eu malesuada. Nunc eget felis in metus auctor consectetur.\nMorbi ac ultrices urna. Curabitur et finibus nunc. Cras accumsan erat eget nunc placerat sodales. Aliquam euismod, metus ac egestas laoreet, lorem mi egestas felis, at pellentesque tortor libero id magna. Phasellus tempus massa at eros maximus lacinia. Phasellus rutrum est tellus, sed cursus massa aliquam vulputate. Proin non turpis dictum, rutrum lectus at, condimentum ligula.\nOrci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec semper id diam id faucibus. Suspendisse vel arcu aliquet, condimentum diam eget, dapibus orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris aliquet quam eu convallis suscipit. Aliquam quis metus lobortis, vulputate arcu ut, ullamcorper orci. Vivamus sed dolor pellentesque, dapibus quam eu, dictum risus. Duis mi felis, feugiat quis sem ac, fermentum pharetra velit. Sed vitae ligula quis metus congue hendrerit ut vestibulum tortor. Maecenas facilisis faucibus libero, at tincidunt enim aliquet sed. Mauris tempor ac sem in ullamcorper.")
    ]);

GameSystem.Resource.Drama = {};

/** 定義所有的劇本 */
(() => {
    let Drama = GameSystem.Resource.Drama;
    let Plot = GameSystem.Classes.Plot;
    let Paragraph = GameSystem.Classes.Paragraph;

    Drama["PalletTown"] = {
        "WelcomeSign": new Plot("WelcomeSign",[
            new Paragraph("歡迎來到「真新鎮」。"),
            new Paragraph("這裡是一個新鮮又平靜的鎮，小小又漂亮的地方。")
        ]),
        "OakNormal": new Plot("OakNormal", [
            new Paragraph("要不是因為我年老了，否則我仍會想要到外頭去尋找寶可夢呢。"),
            new Paragraph("記得，帶上你的PokèDex、寶可夢與熱忱的心！"),
            new Paragraph("去外頭捕捉新的寶可夢吧！")
        ]),
        "Mother": new Plot("Mother", [
            new Paragraph("外出探索新的寶可夢時，記得要拍照回憶、注意安全啊！")
        ]),
        "Gary_First": new Plot("Gary_First", [
            new Paragraph("嘿! 我正在等大木伯伯過來這裡，我要領我的寶可夢球了！")
        ]),
        "Common": new Plot("Common", [
            new Paragraph("真新鎮雖然一座人口很少的小鎮，不過卻是一個新鮮又平靜的鎮，小小又漂亮的地方。")
        ]),
        "Tip": new Plot("Tip", [
            new Paragraph("注意喔！在真新鎮周圍有很多的野草。"),
            new Paragraph("這表示了我們有可能走在草叢中會遇到野生的寶可夢。"),
            new Paragraph("記得！帶上你自己的寶可夢，讓牠來保護你！")
        ])
    };

    /** 「一號道路」的 */
    Drama["Route 1"] = {
        'WelcomeSign': new Plot('WelcomeSign', [
            new Paragraph("歡迎來到「１號道路」。")
        ]),
        'Common1': new Plot("Common1", [
            new Paragraph("若你想要訓練你的寶可夢，那就多多來草叢這裡走走"),
            new Paragraph("試著遇遇看野生的寶可夢，透過戰鬥來提升能力吧！")
        ]),
        'Common2': new Plot("Common2", [
            new Paragraph("這裡是１號道路"),
            new Paragraph("是一個充滿綠色和粗糙路徑的鄉間小路！")
        ]),
        'Tip1': new Plot("Tip1", [
            new Paragraph("在幾次戰鬥完後，寶可夢可能會因為受到攻擊的關係使得HP下降"),
            new Paragraph("你可以到寶可夢中心去將HP值恢復！")
        ]),
        'Tip2': new Plot("Tip2", [
            new Paragraph("記得確認你的寶可夢的HP是否是足夠的！")
        ])
    };

    Drama["Viridian City"] = {
        'WelcomeSign': new Plot("WelcomeSign", [
            new Paragraph("歡迎來到「常磐市」！"),
            new Paragraph("這裡是個長年茂綠環境的美麗城鎮！")
        ]),
        'Common1': new Plot("Common1", [
            new Paragraph("歡迎你來到「常磐市」！"),
            new Paragraph("在這個市中有寶可夢中心、寶可夢商店以及道館"),
            new Paragraph("都可以到處去看一看喔！")
        ])
    };

})();