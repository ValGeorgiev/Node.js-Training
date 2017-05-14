var Player = function() {

};

Player.prototype.events = function() {
	var that = this;

	$('#add-player').on('click', function(event) {
		event.preventDefault();
		that.addPlayer();
	});

	$('.delete-player').on('click', function(event) {
		let id = $(this).data('id');
		that.deletePlayer(id);
	});
};

Player.prototype.deletePlayer = function(id) {

	$.ajax({
		method: 'DELETE',
		data: {
			id: id
		},
		url: '/player/delete'
	}).done(function(data){
		$('#' + id).remove();
	})
}

Player.prototype.addPlayer = function() {
	var playerData = {
		name: $('.player-name').val(),
		email: $('.player-email').val(),
		password: $('.player-password').val()
	}

	$.ajax({
		method: "POST",
		data: playerData,
		url: '/player/add'
	}).done(function(data) {
		console.log(data);

		if (!!data.success) {
			window.location = '/players'
		}
	});

};

Player.prototype.init = function() {
	this.events();

}

$(document).ready(function() {
	new Player().init();
});