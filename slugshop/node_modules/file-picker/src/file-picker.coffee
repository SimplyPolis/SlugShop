fs = require('fs')
path = require('path')
unorm = require('unorm')
util = require('util')

class FilePicker
	directory: null
	pick_types: null

	constructor: (@useUnicodeNormalize = false) ->

	extract: (callback) =>
		if not callback?
			throw new Error('require need callback')

		if @pick_types?
			types = []
			for type in @pick_types
				types.push(type.toLowerCase())
			@pick_types = types

		@top = @directory
		@files = []
		@lastModifiedTime = 0
		@readDirectory(@directory)

		callback?(@files, @lastModifiedTime)

	readDirectory: (directory) =>
		list = fs.readdirSync(directory)

		for itemname in list
			item = path.resolve(directory, itemname)
			stat = fs.statSync(item)

			if stat.isDirectory()
				@readDirectory(item)
			else if stat.isFile()
				@readFile(item, stat)

	readFile: (file, stat) =>
		extension = path.extname(file).toLowerCase()
		un = @useUnicodeNormalize

		nfc = (str) -> if un then unorm.nfc(str) else str

		if not @pick_types? || @pick_types.indexOf(extension) > -1
			mtime = stat.mtime.getTime()
			obj =
				realpath: file
				path: nfc(file).replace(/\\/g, '/')
				relative_path: nfc(path.relative(@top, file)).replace(/\\/g, '/')
				base: nfc(path.dirname(file)).replace(/\\/g, '/')
				relative_base: nfc(path.relative(@top, path.dirname(file))).replace(/\\/g, '/')
				name: nfc(path.basename(file, extension))
				extension: extension
				atime: stat.atime.getTime()
				mtime: stat.mtime.getTime()
				ctime: stat.ctime.getTime()

			@files.push(obj)

			if mtime > @lastModifiedTime
				@lastModifiedTime = mtime


class MultipleFilePicker
	directories: null
	pick_types: null

	constructor: (@useUnicodeNormalize = false) ->
		@picker = new FilePicker(@useUnicodeNormalize)

	extract: (@callback) =>
		@currentDirectory = -1
		@maxDirectory = @directories.length

		@files = []
		@lastModifiedTime = 0

		@extractDirectory()

	extractDirectory: =>
		if ++@currentDirectory < @maxDirectory
			@picker.directory = @directories[@currentDirectory]
			@picker.pick_types = @pick_types
			@picker.extract (files, lastModifiedTime) =>
				@files = @files.concat(files)
				@lastModifiedTime = lastModifiedTime if lastModifiedTime > @lastModifiedTime
				@extractDirectory()
		else
			@callback(@files, @lastModifiedTime)


exports.pick = (args...) ->
	directory = args[0]
	if args.length is 3
		pick_types = args[1]
		callback = args[2]
	else
		callback = args[1]

	if util.isArray(directory)
		picker = new MultipleFilePicker
		picker.directories = directory
		picker.pick_types = pick_types
		picker.extract(callback)
	else
		picker = new FilePicker
		picker.directory = directory
		picker.pick_types = pick_types
		picker.extract(callback)

exports.treefy = (files, json) ->
	json ?= {}

	for f in [0..files.length - 1]
		file = files[f]
		dirs = file.relative_base.split('/')
		current = json

		if file.relative_base isnt ''
			for dir in dirs
				if not current[dir]? then current[dir] = {}
				current = current[dir]

		current[file.name] = f

	json

exports.FilePicker = FilePicker
exports.MultipleFilePicker = MultipleFilePicker
