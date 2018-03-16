// By Raccoon
// include namespace
var Framework = (function (Framework) {
	'use strict'
	Framework.Config = function () {
		this.fps = 60;
		/*this.canvasWidth = 1350;
		this.canvasHeight = 700;*/
		this.canvasWidth =  1000;
		this.canvasHeight = 1000;
		this.isBackwardCompatiable =false;
		this.isOptimize = false;  // 2017.02.20, from V3.1.1
		this.isMouseMoveRecorded = false;
	};
	return Framework;
})(Framework || {});
