var Timer=function(){
        

	this.load=function(px,py,ten=6,one=0){
        this.d2_position={          //十位數位置
            x:Framework.Game.getCanvasWidth()-210,
            y:100
        };
        this.d1_position={          //個位數位置
            x:Framework.Game.getCanvasWidth()-100,
            y:100
        };
        this.OutScreen={
            x:Framework.Game.getCanvasWidth()+600,
            y:Framework.Game.getCanvasHeight()+600
        };
        
        this.counter=0;
        this.dd=ten;
        this.d1=one;



        this.digitPic1=[];
        this.digitPic2=[];

        for(i=0;i<10;i++){
            this.digitPic1[i] = new Framework.Sprite(define.imagePath + 'digit'+i+'.png');
            this.digitPic1[i].position=this.OutScreen;

            this.digitPic2[i] = new Framework.Sprite(define.imagePath + 'digit'+i+'.png');
            this.digitPic2[i].position=this.OutScreen;
        }
        this.digitPic1[0].position=this.d1_position;
        this.digitPic2[6].position=this.d2_position;
        
	};

    this.initialize=function(){
        this.counter=0;
        this.dd=6;
        this.d1=0;
        for(i=0;i<10;i++){
            this.digitPic1[i].position=this.OutScreen;
            this.digitPic2[i].position=this.OutScreen;
        }
        this.digitPic1[0].position=this.d1_position;
        this.digitPic2[6].position=this.d2_position;
    };

	this.update= function() {
        this.counter=this.counter+1;
        if(this.counter>119 ){

            this.digitPic1[this.d1].position=this.OutScreen;  //換個位數圖前先把舊圖移走
            this.digitPic2[this.dd].position=this.OutScreen;

            if(this.d1>0){
                this.d1=this.d1-1;
              }
            else if(this.d1<=0){
                this.d1=9;
                this.dd=this.dd-1;
            }            

            this.digitPic1[this.d1].position=this.d1_position;
            this.digitPic2[this.dd].position=this.d2_position;            

            this.counter=0;
        }

	};

    this.draw=function(ctx){
        
        

        



        //this.digitPic2[this.d2].draw(ctx);
    };  

    this.digit_roop=function(){
        if(this.d1>0){
            this.d1=this.d1-1;
        }
        else if(this.d1==0){
            this.d1=9;
        }

    }


};