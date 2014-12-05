$( ".problems__item" ).click(function() {
	var targetName = $(this).data("target");
	var targetElement = $("." +  targetName);
	var activeItem = $(this);

	if (!$(".problems__about.active").length) {
		targetElement.slideDown();
		targetElement.addClass('active');
		activeItem.addClass("problems__item--active");

	} else if(targetElement.hasClass("active")) {
		$(targetElement).slideUp();
		targetElement.removeClass('active');
		activeItem.removeClass("problems__item--active");
	} else {

		$(".problems__about.active").slideUp(400, function() {
			targetElement.slideDown();
			targetElement.addClass('active');
			activeItem.addClass("problems__item--active");
		}).removeClass('active');
		
		$(".problems__item--active").not(activeItem).removeClass("problems__item--active");
	}

	
});



$("#navbar a, .logo, .header__btn").click(function() {
	var link = $(this).attr( "href");
	$('html, body').animate({
		scrollTop: $(link).offset().top
	}, 500);
});