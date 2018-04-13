function gameSystemLoaded()
{
    var GS=GameSystem;
    var CS=GS.Classes;
    GS.protagonist=new CS.Protagonist(
        "小智障", //name
        new CS.Position(4,4), //position
        new CS.Image( //picture
            define.imagePath+"Protagonist.png",
            {
                cutStartPosition:{x:0,y:0},
                cutSize:{x:16,y:16}
            }
        )
    );
    let protagonist=GS.protagonist;
 //   console.log(protagonist);
    let Item=CS.AnimationItem;
    let Position=CS.Position;
    protagonist.image.addToAllLevels();
    protagonist.animationLists.Up.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Up",
            cutStartPosition:new Position(1,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Up.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Up",
            cutStartPosition:new Position(6,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Up.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Up",
            cutStartPosition:new Position(7,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Down.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Down",
            cutStartPosition:new Position(0,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Down.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Down",
            cutStartPosition:new Position(4,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Down.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Down",
            cutStartPosition:new Position(5,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Left.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Left",
            cutStartPosition:new Position(2,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Left.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Left",
            cutStartPosition:new Position(8,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Right.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Right",
            cutStartPosition:new Position(3,0),
            cutSize:new Position(1,1)
        }
    ));
    protagonist.animationLists.Right.push(new Item(
        define.imagePath+"Protagonist.png",
        {
            group:"Right",
            cutStartPosition:new Position(9,0),
            cutSize:new Position(1,1)
        }
    ));
}
gameSystemLoaded();