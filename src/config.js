// By Raccoon
// include namespace
var Framework = (function (Framework) {
	'use strict'
	Framework.Config = function () {
		this.fps = 60;
		this.isBackwardCompatiable =false;
		this.isOptimize = false;  // 2017.02.20, from V3.1.1
		this.isMouseMoveRecorded = false;

		/*Fixed By NawaNawa */
		/*遊戲寬與高 在resizeCanvasAsRation=false才有用 */
		this.canvasWidth =  1000;
		this.canvasHeight = 1000;

		/*遊戲寬高比 在resizeCanvasAsRation=true有用 */
		this.canvasWidthRation = 1;
		this.canvasHeightRation = 1;

		/*在視窗變化大小時自動resize */
		this.resizeCanvasAsRation = true;



	};
	return Framework;
})(Framework || {});
