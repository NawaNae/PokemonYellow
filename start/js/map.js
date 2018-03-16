var Map = Map ||{};
Map.BLOCK_WIDTH = 64;
Map.enum = { Start: 0, End: 1, Road: 2, Wall: 3, Outside: 4 };//將Map視為namespace擴增enum
Map.MapNode = class MapNode {
    constructor(type, arrx, arry, left, up, right, down) {
        this.endDistance=-1;
        this.type = type;
        this._arrx = arrx;
        this._arry = arry;
        this._left = left;
        this._right = right;
        this._up = up;
        this._down = down;
        this._blockWidth = Map.BLOCK_WIDTH;
        this.center = this.calculateCenter();
    }
    get left()
    {
        return this._left || new Map.MapNode(Map.enum.Outside);
    }
    set left(mapNode)
    {
        this._left = mapNode;
    }
    get right()
    {
        return this._right || new Map.MapNode(Map.enum.Outside);
    }
    set right(mapNode)
    {
        this._right = mapNode;
    }
    get up()
    {
        return this._up || new Map.MapNode(Map.enum.Outside);
    }
    set up(mapNode)
    {
        this._up = mapNode;
    }
    get down()
    {
        return this._down || new Map.MapNode(Map.enum.Outside);
    }
    set down(mapNode)
    {
        this._down = mapNode;
    }
    get isWalkable()//去括號用
    {
        return this.isRoad || this.isStart || this.isEnd;
    }
    set isWalkable(para) { }//do nothing
    get isBuildable() {
        return this.isWall;
    }
    set isBuildable(para) { }
    get isEnd() {
        return this.type == Map.enum.End;
    }
    set isEnd(para) { }
    get isStart() {
        return this.type == Map.enum.Start;
    }
    set isEnd(para) { }
    get isWall() {
        return this.type == Map.enum.Wall;
    }
    set isWall(para) { }
    get isRoad() {
        return this.type == Map.enum.Road;
    }
    set isRoad(para) { }
    set arrx(x) {
        this._arrx = x;
        this.calculateCenter();
    }
    get arrx() {
        return this._arrx;
    }
    set arry(y) {
        this._arry = y;
        this.calculateCenter();
    }
    get arry() {
        return this._arry;
    }
    set blockWidth(width) {
        this._blockWidth = width;
        this.calculateCenter();
    }
    get blockWidth() {
        return this._blockWidth;
    }
    calculateCenter() {
        return this.center = { x: this._blockWidth / 2 + this._blockWidth * this._arrx, y: this._blockWidth / 2 + this._blockWidth * this._arry };
    }
}
Map.Map=class map
{
    constructor(mapArray)//需要用mapArray來解析並產生Map物件
    {
        this.start;//開始節點
        this.end;//結束節點
        this._digitMap = mapArray;//原始地圖
        this._blockWidth = Map.BLOCK_WIDTH;//每隔寬度
        this.map = new Array(mapArray.length);//物件化地圖
        for (var i = 0; i < this.map.length;i++)
            this.map[i] = new Array();
        for (var x = 0; x < this._digitMap[0].length; x++)//初始化地圖
            for (var y = 0; y < this._digitMap.length; y++)
            {
                var thisNode = new Map.MapNode(this._digitMap[y][x], x, y);
                
                this.map[y].push(thisNode);
                if (thisNode.isStart)
                    this.start = thisNode;
                if (thisNode.isEnd)
                    this.end = thisNode;
            }

        for (var x = 0; x < this._digitMap[0].length; x++)
            for (var y = 0; y < this._digitMap.length; y++)
            {
                if (y != 0)
                    this.map[y][x].up = this.map[y - 1][x];
                if (y != this._digitMap.length - 1)
                    this.map[y][x].down = this.map[y + 1][x];
                if (x != 0)
                    this.map[y][x].left = this.map[y][x-1];
                if (x != this._digitMap[0].length - 1)
                    this.map[y][x].right = this.map[y][x+1]
            }
        this.route=this.analyzeRoute();
    }
    analyzeRoute()
    {
        var thisMap = this;
        (function markDistanceBFS() {//用BFS標註每個節點離End距離
            var node = thisMap.end;
            var step = 0;
            for (var queue = new Array(); !node.isStart; step++)
            {//push=enqueue          shift=dequeue
                node.endDistance = step;
                if (node.left.isWalkable && node.left.endDistance == -1)//要確定沒走過(-1為初始值) 不然遠的路會把近的蓋掉
                    queue.push(node.left);
                else if (node.right.isWalkable && node.right.endDistance == -1)
                    queue.push(node.right);
                else if (node.up.isWalkable && node.up.endDistance == -1)
                    queue.push(node.up);
                else if (node.down.isWalkable && node.down.endDistance == -1)
                    queue.push(node.down);
                node = queue.shift();
            }
            thisMap.start.endDistance = step;
        })();
        return (function getRouteArray() {
            var node = thisMap.start;
            var route = new Array();
            for (; !node.isEnd;)
            {
                route.push(node);
                if (node.left.endDistance == node.endDistance - 1)
                    node = node.left;
                else if (node.right.endDistance == node.endDistance - 1)
                    node = node.right;
                else if (node.up.endDistance == node.endDistance - 1)
                    node = node.up;
                else if (node.down.endDistance == node.endDistance - 1)
                    node = node.down;
            }
            route.push(node);
            return route;
        })();
    }
    draw(context)
    {
        for (var x = 0; x < this.map[0].length; x++)
            for (var y = 0; y < this.map.length; y++) {
                switch (this.map[y][x].type) {
                    case Map.enum.Start:
                        context.fillStyle = 'green';
                        break;
                    case Map.enum.End:
                        context.fillStyle = 'red';
                        break;
                    case Map.enum.Road:
                        context.fillStyle = 'gray';
                        break;
                    case Map.enum.Wall:
                        context.fillStyle = 'black';
                        break;
                }
                context.fillRect(x * 64, y * 64, 64, 64);
            }
    }
}




