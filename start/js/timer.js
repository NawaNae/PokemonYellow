Load.css(define.cssPath + "timer.css");
class Timer extends DisplayInformation.Digit //Must load displayInformation.js first
{
    constructor(maxValue = 100, waitms = 1000, tickFunction, endFunction, minValue = 0)
    {
        super(0, "Time : ", " s","Timer");
        this._timeVariable;
        this.max = maxValue;
        this.min = minValue;

        this._waitTime = waitms;
        this.endFunc = endFunction || function end() { };
        this.tickFunc = tickFunction || function tick() {  };

        this.value = this.max;
    }
    reset()
    {
        this.pause();
        this.value = this.max;
    }
    start()
    {
        var thisTimer = this;
        this._timeVariable = setTimeout(function _callback() {
            thisTimer.value--;
            if (thisTimer.value <= thisTimer.min)//endCount
                thisTimer.endFunc();
            else {
                thisTimer._timeVariable = setTimeout(_callback, thisTimer._waitTime);
                thisTimer.tickFunc();
            }
        },this._waitTime);
    }
    pause()
    {
        clearTimeout(this._timeVariable);
    }
    continue()
    {
        this.start();
    }

}
/*timer by nawanawa*/
//example
 
//var timer = new Timer();
//timer.appendTo(document.body);
//timer.start();



