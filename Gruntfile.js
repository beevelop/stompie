module.exports = function (grunt) {
	grunt.initConfig({
	  uglify: {
	    my_target: {
	      files: {
	        'stompie.min.js': ['stompie.js']
	      }
	    }
	  }
 	});

 	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
}