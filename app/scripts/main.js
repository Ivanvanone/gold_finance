$(".accounting").slideDown(0);

$(".problems__item").click(function () {
  var targetName = $(this).data("target");
  var targetElement = $("." + targetName);
  var activeItem = $(this);

  if (!$(".problems__about.active").length) {
    targetElement.slideDown();
    targetElement.addClass('active');
    activeItem.addClass("problems__item--active");

  } else if (targetElement.hasClass("active")) {
    return;
  } else {

    $(".problems__about.active").slideUp(400, function () {
      targetElement.slideDown();
      targetElement.addClass('active');
      activeItem.addClass("problems__item--active");
    }).removeClass('active');
    $(".problems__item--active").not(activeItem).removeClass("problems__item--active");
  }
});


$("#navbar a, .logo, .header__btn").click(function () {
  var link = $(this).attr("href");
  $('html, body').animate({
    scrollTop: $(link).offset().top
  }, 500);
});

$("#phone-input").mask("+7 (999)-999-9999");


$(document).ready(function () {


  function createSuccessMessage(message) {
    return '<br><div class="alert alert-success">' + message + '</div>'
  }

  function createErrorMessage(message) {
    return '<br><div class="alert alert-danger">' + message + '</div>'
  }

  var form = $('.try__form');

  var formGroup = form.find('.form-group');
  var msgBlock = $('.msg-block');

  form.submit(function (event) {

    formGroup.removeClass('has-error');
    msgBlock.html("");

    var formData = {
      'phone': $('input[name=phone]').val()
    };

    $.ajax({
      type: 'POST',
      url: 'http://numerd.ru/service/mail/goldfinance',
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "json"
    }).done(function (data) {

      if (data['result'] !== true && typeof data['message'] !== 'string') {
        return;
      }

      msgBlock.append(createSuccessMessage(data['message']));

    }).fail(function (jqXHR) {

      var response = JSON.parse(jqXHR.responseText);

      if (!response || !response['err']) {
        alert("Неполадки, попробуйте просто позвонить.")
      }

      var err = response['err'];

      formGroup.addClass('has-error');

      $.each(err, function (index, value) {
        msgBlock.append(createErrorMessage(value));
      });

    });

    event.preventDefault();
  });

});

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

var map;


ymaps.ready(function init() {

  map = new ymaps.Map('map', {

    center: [59.88855963, 30.42619439], // Москва
    zoom: 13,
    controls: ['zoomControl', 'fullscreenControl']
  });

  map.behaviors.disable("scrollZoom");

  if (isMobile.any()) {
    map.behaviors.disable(['drag', 'multiTouch']);
  }

  var goldFinance = new ymaps.Placemark([59.88756176, 30.43945850], {}, {
    preset: 'twirl#darkgreenIcon'
  });
  map.geoObjects.add(goldFinance);
});



