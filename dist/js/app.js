$( document ).ready(function() {
  
  $(window).scroll(function () {
    return $('.nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });


  $('.open-menu').click(function(){
    $('#menu').slideToggle(200)
  })

  $('.faq-item .title').click(function(){
    $(this).toggleClass('active');
    $(this).parent().find('.content').slideToggle(200);
  })


  /* form valid*/
  let alertImage = '<svg class="error-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="currentColor"/></svg>';
  let error;
  $('.submit').click(function (e) {
    e.preventDefault();
    let ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      let thisFiled = $(this);

      if ($(this).val().trim() === '') {
          thisFiled.addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
          return false;
      } else {
        if (thisFiled.attr("type") === 'email') {
          let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!pattern.test(thisFiled.val())) {
            $("input[name=email]").val('');
            thisFiled.addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }else{
            error = 0;
            thisFiled.removeClass('error').parent('.label').find('.allert').remove();
          }
        } else if (thisFiled.attr("type") === 'tel') {
          let patterntel = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          if (!patterntel.test(thisFiled.val())) {
            $("input[name=phone]").val('');
            thisFiled.addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }else{
            error = 0;
            thisFiled.removeClass('error').parent('.label').find('.allert').remove();
          }

        }  else {
          error = 0;
          thisFiled.removeClass('error').parent('.label').find('.allert').remove();
        }
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    $form.find('.submit').addClass('inactive');
    $form.find('.submit').prop('disabled', true);


     $.ajax({
        type: 'POST',
        url: 'php/telegram.php',
        dataType: 'json',
        data: $form.serialize(),
        success: function (response) {}
      });


    setTimeout(function () {
      $form.find('.submit').removeClass('inactive');
      $form.find('.submit').prop('disabled', false);
      $form[0].reset();
      $.fancybox.close();

    }, 1000);

  });

  $('input[name="phone"]').inputmask("+9{1,15}");

  // Language
  const selectedLanguage = document.querySelector('.selected-language');
  const languageList = document.querySelector('.language-list');
  const currentFlag = document.getElementById('current-flag');
  const currentLanguage = document.getElementById('current-language');
  const arrowIcon = document.querySelector('.selected-language i');

  selectedLanguage.addEventListener('click', function() {
    languageList.classList.toggle('show');
    arrowIcon.classList.toggle('fa-chevron-up');
  });

  languageList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      const selectedFlag = event.target.querySelector('img').getAttribute('src');
      const selectedLang = event.target.getAttribute('data-lang');

      currentFlag.setAttribute('src', selectedFlag);
      currentLanguage.textContent = '';

      languageList.classList.remove('show');
      arrowIcon.classList.remove('fa-chevron-up');

      // if(selectedLang !== 'en') {
      //   window.location.href = `${location.href}${selectedLang}`;
      // }else{
      //   window.location.href = '/';
      // }
    }
  });

  document.addEventListener('click', function(event) {
    const targetElement = event.target;
    if (!targetElement.closest('.selected-language')) {
      languageList.classList.remove('show');
      arrowIcon.classList.remove('fa-chevron-up');
    }
  });


  // Burger menu

  $('.dropbtn').click(function() {
    let dropdown = document.getElementById("myDropdown");
    let container = document.querySelector(".blok");
    dropdown.classList.toggle("show");
    container.classList.toggle("change");
  })

  window.addEventListener("click", function(event) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var containers = document.getElementsByClassName("blok");
    
    if (!event.target.matches('.dropbtn') && !event.target.matches('.bar1') && !event.target.matches('.bar2') && !event.target.matches('.bar3') && !event.target.matches('.blok')) {
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        var container = containers[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          container.classList.remove('change');
        }
      }
    }
  });

  // Slider
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      arrows: true,
      dots: false,
      swipe: true,
      autoplay: true,
      autoplaySpeed: 5000,
      // centerMode: 1,
      // centerPadding: '50px',
      focusOnSelect: true
    });

  // Scroll
  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 90
    }, 500);

  });

  function setOrderPrice() {
    let summPrice = 18000, orderTitle = '';
     $('#order-info').text('')

    $('.change-configurator').each(function () {
      if ($(this).attr('type') === 'checkbox' && $(this).prop('checked')) {
        summPrice = summPrice + Number($(this).val());
        orderTitle = orderTitle + '; '+ $(this).parent().find('label').text();

        $('#order-info').append('<div class="selected-product-item col-6">'+$(this).parent().find('label').html()+'</div>');
      }

      if ($(this).hasClass('select2') && $(this).val() !== 0 && $(this).val() === $(this).children("option:selected").val()) {
        summPrice = summPrice + Number($(this).children("option:selected").data('value'));
        orderTitle = orderTitle + '; '+ $(this).children("option:selected").text();

        $('#order-info').append('<div class="selected-product-item col-6">'+$(this).children("option:selected").text()+'</div>')
      }
    })

    $('#change-configurator-price').text(`$${summPrice}`)
    $('input[name="order_summ"]').val(summPrice)
    $('input[name="order_value"]').val(orderTitle)

  }

  setOrderPrice();

  $('.change-configurator').change(function () {
    setOrderPrice();
  })


  $('.select-custom').each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select '+$this.data('class')+'"></div>');
    
    if($this.attr('required')) {
      $this.after('<div class="select-styled required-select"></div>');
    }else{
      $this.after('<div class="select-styled"></div>');
    }

    var $styledSelect = $this.next('div.select-styled');
    if ($this.children('option[selected]')) {
      $styledSelect.text($this.children('option[selected]').text());

      if ($styledSelect.text() != '') {
        $styledSelect.addClass('select-item');
      }

    }



    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
     let liItem =  $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val(),
        color: $this.children('option').eq(i).data('color')
      }).appendTo($list);

      $('<i style="background: '+$this.children('option').eq(i).data('color')+'" />').prependTo(liItem);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function () {
        $(this).removeClass('active').next('ul.select-options').slideUp();
      });
      $(this).toggleClass('active').next('ul.select-options').slideToggle();
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active error').addClass('select-item');
      $styledSelect.prepend('<i style="background: '+$(this).attr('color')+'" />');
      $this.val($(this).attr('rel'));
      $list.slideUp();
      setOrderPrice();
      //console.log($this.val());
    });

    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.slideUp();
    });
  });
  
    $('.select-options li').each(function(){
    if($(this).text() == '' || $(this).text() == ' ') {
      $(this).hide();
    }
  })


}); 
