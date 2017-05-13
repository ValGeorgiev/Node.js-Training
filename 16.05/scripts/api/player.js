/*  Require Static API  */

var Player = require('../models/player');



/*
 * Add a new player
 * @module api/player - player/addPlayer
 * @param {Object} req - represent the node.js request object
 * @param {Object} res - represent the node.js response object
 * @return {void}
 */
function addPlayer(req, res) {

    // // Wrap the data in userData object
    // var userData = {
    //     names: req.body.names,
    //     email: req.body.email,
    //     password: req.body.password,
    //     type: 'user'
    // };

    // // check if user exist
    // libUser.findUsedEmail(userData.email).then(function() {
    //     // check if data is correct
    //     validation.validateUser(userData).then(function() {
    //         // Create a new user 
    //         var user = new User(userData);
    //         // Save it to the DB
    //         user.save(function(err){
    //             // Check for error, if there is an error - return it to the FE
    //             if (!!err) {
    //                 res.send(err);
    //                 return;
    //             }
    //             // Everything is OK, send welcome message to the FE 
    //             res.send({
    //                 message: "Welcome to our application"
    //             });
    //         });
    //         // Catch data validation error
    //     }).catch(function(err) {
    //         res.send(err);
    //     });
    //     // Catch if user exist error
    // }).catch(function(err) {
    //     res.send(err);
    // });
}


/*
 * Main public function. Contains all routes about signup/login functionality
 * @module api/sign - sign/sign
 * @param {Object} app - represent the application object
 * @param {Object} express - represent the express library
 * @return {void}
 */
function player(app, express) {
    // Create an express router
    var playerRouter = express.Router();

    // Player
    // Add new player
    playerRouter.post('/add', function(req, res) {
        addPlayer(req, res);
    });

    // return the router
    return playerRouter;
};

// expose functionality
module.exports = player;