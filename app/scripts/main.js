$(".accounting").slideDown(0);

$( ".problems__item" ).click(function() {
	var targetName = $(this).data("target");
	var targetElement = $("." +  targetName);
	var activeItem = $(this);

	if (!$(".problems__about.active").length) {
		targetElement.slideDown();
		targetElement.addClass('active');
		activeItem.addClass("problems__item--active");

	} else if(targetElement.hasClass("active")) {
		return;
		// $(targetElement).slideUp();
		// targetElement.removeClass('active');
		// activeItem.removeClass("problems__item--active");
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

$("#phone-input").mask("+7 (999)-999-9999");


// Отправка формы
$(document).ready(function() {

	// process the form
	$('.try__form').submit(function(event) {

		$('.form-group').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = {
			'phone' 				: $('input[name=phone]').val(),
		};

		// process the form
		$.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: '/mail.php', // the url where we want to POST
			data 		: formData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
			encode 		: true
		})
			// using the done promise callback
			.done(function(data) {

				// log data to the console so we can see
				console.log(data); 

				// here we will handle errors and validation messages
				if ( ! data.success) {
					
					// handle errors for phone ---------------
					if (data.errors.phone) {
						$('.form-group').addClass('has-error'); // add the error class to show red input
						// $('.form-group').append('<div class="help-block">' + data.errors.phone + '</div>'); // add the actual error message under our input
						// $(".form-group").append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
					}
				} else {

					// ALL GOOD! just show the success message!
					$('.try__form').append('<br><div class="alert alert-success">' + data.message + '</div>');

					// usually after form submission, you'll want to redirect
					// window.location = '/thank-you'; // redirect a user to another page

				}
			})

			// using the fail promise callback
			.fail(function(data) {

				// show any errors
				// best to remove for production
				console.log(data);
			});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});

});





var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var map;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    map = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [59.88855963, 30.42619439], // Москва
        zoom: 13,
        controls: ['zoomControl', 'fullscreenControl']
    });

    if(isMobile.any()){
    	map.behaviors.disable(['drag', 'multiTouch']);
    };
    // var goldFinance = new ymaps.Placemark([59.88756176, 30.43945850]);
    var goldFinance = new ymaps.Placemark([59.88756176, 30.43945850], {}, {
    	preset: 'twirl#darkgreenIcon'
    });
    map.geoObjects.add(goldFinance);
});



