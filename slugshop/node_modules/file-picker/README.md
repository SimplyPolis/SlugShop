# install

	npm install file-picker

# api

- `pick(string target_directory, [array pick_types], function callback)`
	- `array pick_types` is array of file extension formats (ex . `['.py', '.js']`)
	- `function callback = (files, lastModifedTime)` is return array of files infomation
		- `array files { string path, string relative_path, string base, string relative_base, name, extension }`
		- `int lastModifedTime`
- `object treefy(array files)` picked files information to tree structure 

# pick files at a directory

	{pick} = require('file-picker')
	
	pick '~/some_directory', ['.as'], (files, lastModifedTime) ->
		console.log(files)
		console.log(lastModifedTime)
		
print on console

	[ { path: '/Users/ssen/Data/workspace/SrcViewer/src/SrcViewer.mxml',
	    relative_path: 'src/SrcViewer.mxml',
	    base: '/Users/ssen/Data/workspace/SrcViewer/src',
	    relative_base: 'src',
	    name: 'SrcViewer',
	    extension: '.mxml',
	    atime: 1365596627000,
		mtime: 1364912058000,
		ctime: 1364912058000 },
	  { path: '/Users/ssen/Data/workspace/SrcViewer/src/ssen/airkit/update/AIRUpdate.as',
	    relative_path: 'src/ssen/airkit/update/AIRUpdate.as',
	    base: '/Users/ssen/Data/workspace/SrcViewer/src/ssen/airkit/update',
	    relative_base: 'src/ssen/airkit/update',
	    name: 'AIRUpdate',
	    extension: '.as',
	    atime: 1365596627000,
		mtime: 1364912058000,
		ctime: 1364912058000 },
	  { path: '/Users/ssen/Data/workspace/SrcViewer/src/ssen/airkit/update/AIRUpdateError.as',
	    relative_path: 'src/ssen/airkit/update/AIRUpdateError.as',
	    base: '/Users/ssen/Data/workspace/SrcViewer/src/ssen/airkit/update',
	    relative_base: 'src/ssen/airkit/update',
	    name: 'AIRUpdateError',
	    extension: '.as',
	    atime: 1365596627000,
		mtime: 1364912058000,
		ctime: 1364912058000 },
	  ....
	1364912058000
	  
# files to tree object

	util = require('util')
	{pick, treefy} = require('file-picker')
	
	pick '~/some_directory', ['.as'], (files, lastModifedTime) ->
		console.log(util.inspect(treefy(files)))
		
print

	{ssen : {
		airkit : {
			update : {
				AIRUpdate : 1, // index of files array 
				AIRUpdateError : 2
	...
