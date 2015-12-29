module.exports = function(grunt) {
	// Do grunt-related things in here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'closure-compiler': {
			frontend: {
				js:'src/js/jquery.slidemenu.js',
				jsOutputFile:'dist/js/jquery.slidemenu.min.js',
				maxBuffer:500,
				options: {
					compilation_level:'SIMPLE_OPTIMIZATIONS',
					language_in:'ECMASCRIPT5_STRICT'	
				}
			}
		},
		'less' : {
			development: {
				options: {
					paths:["src/less"]
				},
				files: {
					"dist/css/slidemenu.css":"src/less/slidemenu.less"
				}
			},
			production: {
				options: {
					paths:["src/less"],
					cleancss:true
				},
				files: {
					"dist/css/slidemenu.min.css":"src/less/slidemenu.less"
				}
			}
		},
		copy: {
			development: {
				files: [{
					cwd: 'src/js/',
					src: 'jquery.slidemenu.js',
					dest: 'dist/js/',
					expand: true
				}]
			},
			examples: {
				files: [{
					cwd: 'src/js/',
					src: 'jquery.slidemenu.js',
					dest: 'examples/',
					expand: true
				},{
					cwd: 'dist/css/',
					src: 'slidemenu.css',
					dest: 'examples/',
					expand: true
				}]
			}
		},
		'jsbeautifier': {
			files : ["src/js/*.js","sec/less/*.less","examples/*.html","examples/*.css","examples/*.js"],
			options: {
				js: {
					indentWithTabs:true	
				},
				css: {
					fileTypes: [".less"],
					indentWithTabs:true	
				}
			}
		},
		'jshint': {
			all: ['src/js/*.js']	
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('compile',['jshint','jsbeautifier','closure-compiler','less','copy']);
};