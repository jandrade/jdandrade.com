module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: "app",
		public: "public",
		//	validate JS
		jshint: {
			all: [
				"Gruntfile.js", "<%= app %>/js/<%= pkg.name %>/**/*.js"
			]
		},
		//	concat
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				stripBanners: true
			},
			dist: {
				src: [
					'<%= app %>/js/<%= pkg.name %>/namespace.js',
					'<%= app %>/js/<%= pkg.name %>/utils.js',
					'<%= app %>/js/<%= pkg.name %>/components/carousel.js',
					'<%= app %>/js/<%= pkg.name %>/components/grid.js',
					'<%= app %>/js/<%= pkg.name %>/sections/home.js',
					'<%= app %>/js/<%= pkg.name %>/sections/contact.js',
					'<%= app %>/js/<%= pkg.name %>/sections/projects.js',
					'<%= app %>/js/<%= pkg.name %>/sections/navigation.js',
					'<%= app %>/js/<%= pkg.name %>/router.js',
					'<%= app %>/js/<%= pkg.name %>/app.js',
					'<%= app %>/js/main.js'
					],
				dest: '<%= public %>/js/<%= pkg.name %>.js'
			},
			css: {
				src: ["<%= app %>/css/<%= pkg.name %>/*/*.css"],
				dest: "<%= public %>/css/<%= pkg.name %>.css"
			}
		},
		//	minify
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: '<%= public %>/js/<%= pkg.name %>.js',
				dest: '<%= public %>/js/<%= pkg.name %>.min.js'
			}
		},
		//	copy assets
		copy: {
			main: {
				files: [
					// media
					{
						expand: true,
						cwd: '<%= app %>/',
						src: ['fonts/**', 'css/vendor/**', 'data/**'],
						dest: '<%= public %>/'
					},
					// js
					{
						expand: true,
						cwd: '<%= app %>/',
						src: ['js/vendor/*'],
						dest: '<%= public %>/',
						filter: 'isFile'
					}
				]
			}
		},
		//	image optimization
		imagemin: { // Task
			dynamic: {
				options: { // Target options
					optimizationLevel: 4,
					progressive: false
				},
				files: [{
					expand: true,
						cwd: '<%= app %>/',
						src: ['img/**/*{png,jpg,gif}'],
						dest: '<%= public %>/'
				}]
			}
		},
		//	replace html tags
		targethtml: {
			dist: {
				options: {
					curlyTags: {
						rlsdate: '<%= grunt.template.today("yyyymmdd") %>'
					}
				},
				files: [{
					expand: true, // Enable dynamic expansion.
					cwd: '<%= app %>/', // Src matches are relative to this path.
					src: ['**/*.html'], // Actual pattern(s) to match.
					dest: '<%= public %>/', // Destination path prefix.
					ext: '.html', // Dest filepaths will have this extension.
				}]
			}
		},
		// css minification
		cssmin: {
			add_banner: {
				options: {
					banner: '/* <%= pkg.name %> minified css file */',
					report: 'min'
				},
				files: {
					'<%= public %>/css/<%= pkg.name %>.min.css': ["<%= app %>/css/<%= pkg.name %>/*/*.css"]
				}
			}
		},
		// replace
		replace: {
			example: {
				src: ['<%= public %>/css/<%= pkg.name %>.css'],
				overwrite: true, // overwrite matched source files
				replacements: [{
					from: '../../../',
					to: "../"
				}]
			}
		}
	});

	// Load project tasks
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.loadNpmTasks('grunt-text-replace');

	// Default task(s).
	grunt.registerTask('build', ['jshint', 'copy:main', 'concat', 'cssmin', 'imagemin', 'replace', 'uglify', 'targethtml']);
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	

};