var User = require('../models/user.js');

/**
* A module to export Signing up routes
*   @module User
*/
module.exports = function(router) {                        
	
	/**
	*	@function getUsers - Called on GET "/api/users"	
	*	@params {Object} req - Http request
	* @params {Object} res - Http response
	*	@params {Object} next - Next middleware
	*	@returns {JSON} All users in Database as JSON
 	*/
	router.route('/users')
		.get(function getUsers(req,res,next) {
			User.find({}, function  getUsersDb(err, users) {
				if (err) {
						next(err);
				} else {
						res.status(201);
						res.json(users);
				}
			});
		})
	/**
	*	@function PostUsers - Creates a user on Post "/api/users"	
	*	@params {Object} req - Http request
	* @params {Object} res - Http response
	*	@params {Object} next - Next middleware
	*	@returns {JSON} Created user as JSON
 	*/
		.post(function PostUser(req, res, next) {
			var user = User.create({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					age: req.body.age,
					address: req.body.address,
					gender: req.body.gender,
					profilePhoto: req.body.profilePhoto,
					admin: req.body.admin
					},  function createUser(err, user) {
								if (err) {
									console.log(err);
									res.status(400).json(err);
								} 
								else {
									res.status(201).json(user);
								}
							});
		});

	
	router.route('/users/:id/addToBeRead')
	/**
	* @function addToBeRead -  called on Post "/users/:id/addToBeRead"	
	* adds a book from user's tobe read list
	* @params {Object} req - Http request
	* @params {Object} res - Http response
	* @params {Object} next - Next middleware
	* @returns {JSON} string "Added the book successfully" as JSON
 	*/
	.post(function addToBeRead(req, res, next) {
        var userId = req.params.id;
        var bookId = req.body.bookId;
        User.findById(userId, function (err, user) {
          if (err) {
            res.status(404).json(err);
            return next(err);
          }
          if (user.toBeRead.indexOf(bookId) > -1) { //Already has the book in his Currently Reading List
            return res.json("Already has the book");
          }
          else {
            user.toBeRead.push(bookId);
          }
          user.save();
          res.json("Added the book successfully");
        });
    	})
	/**
	* @function removeToBeRead -  called on Delete "/users/:id/removeToBeRead/:bookId"	
	* removes a book from user's tobe read list
	* @params {Object} req - Http request
	* @params {Object} res - Http response
	* @params {Object} next - Next middleware
	* @returns {JSON} string "Removed the book successfully" as JSON
 	*/
	router.route('/users/:id/removeToBeRead/:bookId').delete(function removeToBeRead(req, res, next) {
	        var userId = req.params.id;
	        var bookId = req.params.bookId;
	        User.findById(userId, function (err, user) {
	            if (err) {
	                res.status(404).json(err);
	                return next(err);
	            }
	            var index = user.toBeRead.indexOf(bookId);
	            if (index > -1) {
	                user.toBeRead.splice(index, 1);
	            }
	            user.save();
	            res.json("Removed the book successfully");
	        });
	    });


};
