// Generated on 2013-07-31 using generator-angular 0.3.1
'use strict';

// no more needed, see grunt-express doc
//var LIVERELOAD_PORT = 35729;
//var lrSnippet = require('express-livereload')({ port: LIVERELOAD_PORT });
//var mountFolder = function (express, dir) {
//  return express.static(require('path').resolve(dir));
//};

var path = require('path');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

	try {
		yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
	} catch (e) {}

	grunt.initConfig({
		yeoman: yeomanConfig,
		less: {
			development: {
				options: {
					paths: ["<%= yeoman.app %>/styles"]
				},
				files: {
					"<%= yeoman.app %>/styles/main.css": "<%= yeoman.app %>/styles/*.less"
				}
			}
		},
		watch: {
			less: {
				files: ['<%= yeoman.app %>/styles/*.less'],
				tasks: ['less'],
			}
		},
		express: {
			options: {
				port: 3000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost'
			},
			livereload: {
				options: {
					server: path.resolve('./app.js'),
					livereload: true,
					serverreload: false,
					bases: [path.resolve('./.tmp'), path.resolve(__dirname, yeomanConfig.app)]
				}
			},
			test: {
				options: {
					server: path.resolve('./app.js'),
					bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test')]
				}
			},
			dist: {
				options: {
					server: path.resolve('./app.js'),
					bases: path.resolve(__dirname, yeomanConfig.dist)
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= express.options.port %>'
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			]
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			// By default, your `index.html` <!-- Usemin Block --> will take care of
			// minification. This option is pre-configured if you do not wish to use
			// Usemin blocks.
			dist: {
			  files: {
			    '<%= yeoman.dist %>/styles/main.css': [
			      '.tmp/styles/{,*/}*.css',
			      '<%= yeoman.app %>/styles/{,*/}*.css'
			    ]
			  }
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: ['*.html', 'views/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'*.html', 'views/*.html',
						'.htaccess',
						'bower_components/**/*',
						'images/{,*/}*.{gif,webp}',
						'styles/fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: [
						'generated/*'
					]
				}]
			}
		},
		concurrent: {
			dist: [
				'imagemin',
				'svgmin'
				//'htmlmin'
			]
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>/scripts',
					src: '*.js',
					dest: '<%= yeoman.dist %>/scripts'
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'<%= yeoman.dist %>/scripts/scripts.js': [
						'<%= yeoman.dist %>/scripts/scripts.js'
					]
				}
			}
		},
		bower: {
			options:{
				targetDir: '<%= yeoman.dist %>/bower_components' // this is './lib' by default
			},
			install: {
				options: {
				cleanTargetDir: true,
				cleanBowerDir: false,
				install: false,
				copy: false
			}
		}
	}
	});

	grunt.registerTask('heroku:production', ['build'])

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'express:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'express:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'express:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'less',
		'concurrent:dist',
		'concat',
		'bower',
		'copy',
		'cdnify',
		'ngmin',
		'cssmin',
		'uglify',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);
};