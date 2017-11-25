module.exports = function(grunt){
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'*/\n'
			},
			build: {
				files: {
					'js/easy-loading.min.js': ['js/easy-loading.js']
				}
			}
		},

		cssmin: {
		  options: {
		    mergeIntoShorthands: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'css/easy-loading.min.css': ['css/easy-loading.css']
		    }
		  }
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('default', ['uglify', 'cssmin']);
};