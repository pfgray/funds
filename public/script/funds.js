$(document).ready(function(){

	$(".signSpan").click(function(){
		var button = $("#sign");
		if(button.hasClass('alert')){
			button.removeClass('alert');
			button.addClass('success');
			//switch icons:
			button.find('i').removeClass('fa-minus');
			button.find('i').addClass('fa-plus');

			$("#sign_check").prop('checked', false);
		}else{
			button.removeClass('success');
			button.addClass('alert');
			//switch icons:
			button.find('i').removeClass('fa-plus');
			button.find('i').addClass('fa-minus');
			$("#sign_check").prop('checked', true);
		}
	});
    
    $(".tag").click(function(tag){
		$("#filter").html("filter: <div class='tag'>"+$(tag.currentTarget).html()+"</div>");
    });


});


window.deleteTransaction  = function(accountId, transactionId, rev){
	$.ajax({
    	url: '/accounts/' + accountId + '/transactions/' + transactionId + '/rev/' + rev,
    	type: 'DELETE',
    	success: function(result) {
			location.reload();
    	}
	});
}
