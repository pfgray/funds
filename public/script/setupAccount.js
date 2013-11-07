$(function(){
	$('a.account').click(function(event){
		event.preventDefault();
		var type = $(event.currentTarget).find('.text').html();
		$('#account_type').val(type);
		$('#accountForm').submit();
	});
});