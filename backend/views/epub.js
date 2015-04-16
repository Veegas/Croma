var Epub = require('epub'),
	fs = require('fs'),
	flow = require('../config/flow-node.js')('../frontend/books/bookEpub'),
	Book = require('../models/book.js'),
	fileBase = '../frontend/',
	imageDirectory = '../frontend/books/bookCovers/',
	imageDirectoryStatic = 'books/bookCovers/',
	linkDirectory = '../frontend/books/bookLinks/';

module.exports = function(router) {
	router.route('/admin/addBook').post(saveEpubData);
}

var saveEpubData = function (req, res, next) {

	console.log('REQUEST IS', req.body);

	flow.post(req, function(status, filename, original_filename, identifier) {      
		console.log('Chunck number', req.body.flowChunkNumber, ', status' , status);
		if (status == 'done' && req.body.flowTotalChunks == req.body.flowChunkNumber) {
			
			var stream = fs.createWriteStream('../frontend/books/bookEpub/' + filename);
			flow.write(identifier, stream, {onDone: function () {
				
				flow.clean(identifier);

				var epubTitle = filename;
				var epubPath = 'books/bookEpub/' + epubTitle;
				var imagePath = '';
				var imagePathStatic = '';
				
			 
				var epub = new Epub(fileBase + epubPath,
				 											imageDirectory, linkDirectory);
				
				epub.on('end', function() {
					console.log('EPUB METADATA' , epub.metadata);
					
					if (epub.metadata.cover) {
						imagePath = imageDirectory + identifier + '.jpg';
						epub.getImage(epub.metadata.cover, function (err, img, mimetype) {
							if (err) {
								return next(err);
							}
								fs.writeFile(imagePath, img, function (err) {
									if (err)
									{
								  	return next(err);
									}
									console.log(mimetype);
									console.log(identifier + '.jpg' + ' Saved');
								});
						})
						imagePathStatic = imageDirectoryStatic + identifier + '.jpg';
					}
					else {
						imagePathStatic = imageDirectoryStatic + 'default_cover.jpg';
					}

					var book = new Book({
						name: epub.metadata.title,
						author: epub.metadata.creator,
						coverLocation: imagePathStatic,
						text: epubPath
					})
					book.save(function saveBook(err, newBook) {
						if (err) {
							return next(err);
						}
						res.json(newBook).status(201);
					})
				});
					

					epub.parse();
		}});

		} else if (status == 'partly_done') {
			res.json({}).status(200);
		}

      });

}