require('source-map-support').install()
{pick, treefy} = require('../lib/file-picker')

describe 'File Picking', ->
	it '.txt 파일에 대한 조회 값은 5 이어야 한다', ->
		pick __dirname + '/samples', ['.txt'], (files, lastModifiedTime) ->
			files.length.should.equal(5)
			lastModifiedTime.should.above(0)

	it '.jpg 파일에 대한 조회는 1 이어야 하고, name 은 img21 이어야 한다', ->
		pick __dirname + '/samples', ['.jpg'], (files, lastModifiedTime) ->
			files.length.should.equal(1)
			files[0].name.should.equal('img21')
			lastModifiedTime.should.above(0)
				
describe 'File List To Tree', ->
	it '.txt 파일에 대한 조회를 json 으로 바꿨을때 dir4.dir.file411 은 4 이어야 한다', ->
		pick __dirname + '/samples', ['.txt'], (files, lastModifiedTime) ->
			json = treefy(files)
			json.dir4.dir.file411.should.equal(4)
			lastModifiedTime.should.above(0)

describe 'Multiple File Picking', ->
	it '.txt 파일에 대한 조회 값은 4 이어야 한다', ->
		directories = []
		directories.push(__dirname + '/samples/dir1')
		directories.push(__dirname + '/samples/dir2')
		directories.push(__dirname + '/samples/dir3')
		directories.push(__dirname + '/samples/dir4')

		pick directories, ['.txt'], (files, lastModifiedTime) ->
			files.length.should.equal(4)
			lastModifiedTime.should.above(0)
