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

    // Wrap the data in userData object
    var playerData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    // find player with email
    Player.findOne({
        email: playerData.email
    }, function(err, player) {
        // Always check for error
        if (!!err) {
            res.send(err);
            return;
        }

        // If player doesn't exist
        if (!player) {
            var player = new Player(playerData);
            // Save it to the DB
            player.save(function(err){
                // Check for error, if there is an error - return it to the FE
                if (!!err) {
                    res.send(err);
                    return;
                }
                // Everything is OK, send welcome message to the FE 
                res.status(200).send({
                    message: "Welcome to our game!",
                    success: true
                });
                return;
            });
            return;
        }

        // This player exist, return correct message to the FE
        res.send('Sorry, this player exist');
        return;
    });
}

/*
 * Edit a player
 * @module api/player - player/editPlayer
 * @param {Object} req - represent the node.js request object
 * @param {Object} res - represent the node.js response object
 * @return {void}
 */
function editPlayer(req, res) {

    var playerData = {
        name: req.body.name,
        email: req.body.email
    };

    console.log(req.body.name);

    // find player with email
    Player.findOne({
        _id: req.params.id
    }, function(err, player) {
        // Always check for error
        if (!!err) {
            res.send(err);
            return;
        }

        // If player doesn't exist
        if (!player) {
            res.send("Sorry, this player doesn't exist");
        }

        // Update player with new data
        player.name = playerData.name || player.name;
        player.email = playerData.email || player.email;

        // Save it to the DB
        player.save(function(err){
            // Check for error, if there is an error - return it to the FE
            if (!!err) {
                res.send(err);
                return;
            }
            // Everything is OK, send welcome message to the FE 
            res.send({
                message: "Details are changed successfully!",
                success: true
            });
            return;
        });

    });
}

/*
 * Delete a player
 * @module api/player - player/deletePlayer
 * @param {Object} req - represent the node.js request object
 * @param {Object} res - represent the node.js response object
 * @return {void}
 */
function deletePlayer(req, res) {


    // find player with id and remove it
    Player.findByIdAndRemove(req.body.id, function(err, player) {
        // Always check for error
        if (!!err) {
            res.send(err);
            return;
        }

        res.send({
            message: "Player is deleted !"
        });
        return;
    });
}



/*
 * Update player points
 * @module api/player - player/updatePoints
 * @param {Object} req - represent the node.js request object
 * @param {Object} res - represent the node.js response object
 * @return {void}
 */
function updatePoints(req, res) {

    var playerData = {
        points: parseInt(req.params.points),
        id: req.params.id
    };

    // find player with email
    Player.findOne({
        _id: playerData.id
    }, function(err, player) {
        // Always check for error
        if (!!err) {
            res.send(err);
            return;
        }

        // If player doesn't exist
        if (!player) {
            res.send("Sorry, this player doesn't exist");
        }

        // Update player with new data
        player.points += playerData.points;
        // Save it to the DB
        player.save(function(err, player){
            // Check for error, if there is an error - return it to the FE
            if (!!err) {
                res.send(err);
                return;
            }
            // Everything is OK, send welcome message to the FE 
            res.send({
                message: "Points are updated!",
                success: true,
                points: player.points
            });
            return;
        });

    });
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

    // Edit player
    playerRouter.post('/edit/:id', function(req, res) {
        editPlayer(req, res);
    });

    // Delete player
    playerRouter.delete('/delete', function(req, res) {
        deletePlayer(req, res);
    });

    // Update player points
    playerRouter.put('/update/points/:id/:points', function(req, res) {
        updatePoints(req, res);
    });

    // return the router
    return playerRouter;
};

// expose functionality
module.exports = player;