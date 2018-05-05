(function(window){	
	var define ={}, mainPath = 'start/',frameWorkPath='src/';
    Object.defineProperties(define, {
        'frameworkPath':
        {
            value: frameWorkPath,
            writable: false
        },
        'cssPath':
        {
            value: mainPath + 'css/',
            writable: false
        },
		'mainPath': {
			value: mainPath,
			writable: false
		},
		'jsPath': {
			value: mainPath + 'js/',
			writable: false
		},
		'musicPath': {
			value: mainPath + 'music/',
			writable: false
		},
		'imagePath': {
			value: mainPath + 'image/',
			writable: false
		},
		'characterImagePath': {
			value: mainPath + 'image/characters/',
			writable: false
		}

	});

	window.define = define;
})(window)

