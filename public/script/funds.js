$(document).ready(function(){

	$(".signSpan").click(function(){
		/*
		var img = $(".signSpan").find("img");

		if(img.attr("alt") == '-'){
			img.attr("src", "/images/plus.svg");
			img.attr("alt", "+");
		}else{
			img.attr("src", "/images/minus.svg");
			img.attr("alt", "-");
		}
		*/
		var button = $("#sign");
		if(button.hasClass('alert')){
			button.removeClass('alert');
			button.addClass('success');
			button.html('+');
			$("#sign_check").prop('checked', false);
		}else{
			button.removeClass('success');
			button.addClass('alert');
			button.html('-');
			$("#sign_check").prop('checked', true);
		}
	});
    
    $(".tag").click(function(tag){
		$("#filter").html("filter: <div class='tag'>"+$(tag.currentTarget).html()+"</div>");
    });

/*
	$('body').live('swipeleft swiperight',function(event){
        if (event.type == "swiperight") {
           alert("swipped right side");       
        }
        if (event.type == "swipeleft") {
            alert("swipped left side");
        }
        event.preventDefault();
    });
*/

});
