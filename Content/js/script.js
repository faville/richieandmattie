/*
Theme: Flatfy Theme
Author: Andrea Galanti
Bootstrap Version 
Build: 1.0
http://www.andreagalanti.it
*/

$(window).load(function() { 
	//Preloader 
	$('#status').delay(300).fadeOut(); 
	$('#preloader').delay(300).fadeOut('slow');
	$('body').delay(550).css({'overflow':'visible'});
})

$(document).ready(function() {
		//animated logo
		$(".navbar-brand").hover(function () {
			$(this).toggleClass("animated shake");
		});
		
		//animated scroll_arrow
		$(".img_scroll").hover(function () {
			$(this).toggleClass("animated infinite bounce");
		});
		
    //Wow Animation DISABLE FOR ANIMATION MOBILE/TABLET
		if (typeof WOW === undefined)
		{
		    wow = new WOW(
            {
                mobile: false
            });
		    wow.init();
		}
		
		//MagnificPopup
		$('.image-link').magnificPopup({type:'image'});


		// OwlCarousel N1

		// OwlCarousel N2
		$("#owl-demo-1").owlCarousel({
		      autoPlay: 7000,
			  navigation : true, // Show next and prev buttons
			  slideSpeed : 1000,
			  paginationSpeed : 1000,
			  singleItem: true,
			  stopOnHover: true,
              lazyLoad: true
		});

		//SmothScroll
		$('a[href*=#]').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname) {
					var $target = $(this.hash);
					$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
					if ($target.length) {
							var targetOffset = $target.offset().top;
							$('html,body').animate({scrollTop: targetOffset}, 600);
							return false;
					}
			}
		});
		
		//Subscribe
		//new UIMorphingButton( document.querySelector( '.morph-button' ) );
		// for demo purposes only
		//[].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) { 
		//	bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
		//} );

		if($('html').hasClass('oldie'))
		{
		    $('#myModal').modal({'backdrop':'static'});
		}

		$("#myNav").affix({
		    offset: {
		        top: 500
		    }
		});
		$("#myNav").on('affixed.bs.affix', function () {
		    $(this).addClass('wow fadeInDown');
		    //$('#logo').addClass('navbar-brand').show();
		    $('.navbar-default .nav-justified>li>a').css('color', '#000');
		    //$('#logo').toggleClass('visible');
		});
		$('#myNav').on('affix-top.bs.affix', function () {
		    //$('#logo').removeClass('navbar-brand').hide();
		    $('.navbar-default .nav-justified>li>a').css('color', '#FFF');
		});

    // Countdown
		$('#countdown').countdown('2015/03/21 16:30:00', function (event) {	// your date here
		    $(this).html(event.strftime(''
                + '<div><div>%D</div><i>Days</i></div>'
                + '<div><div>%H</div><i>Hours</i></div>'
                + '<div><div>%M</div><i>Minutes</i></div>'
                + '<div><div>%S</div><i>Seconds</i></div>'
            ));
		}).on('finish.countdown',
        function () {
            $("#countdown").fadeOut();
            var feed = new Instafeed({
                get: 'tagged',
                tagName: 'promisefavilled',
                clientId: 'e80b7b08a42e4e169d8b500e5d410bb1',
                template: '<div><a href="{{link}}"><img class="img-responsive" src="{{image}}" /></a></div>',
                resolution: 'low_resolution',
                after: function () {
                    $("#instafeed").owlCarousel({
                        autoPlay: 3000, //Set AutoPlay to 3 seconds
                        items: 4,
                        itemsDesktop: [1199, 3],
                        itemsDesktopSmall: [979, 3]
                    });
                }
            });
            feed.run();//.html("<div>We're maaaaaarrrrieeed!!!!</div>").fadeIn();
            $("#countdown").prev().html("Check out the Instagram pics!");

        });

		$("#form").submit(function (e) {
		    e.preventDefault();

		    //$(this).prop("disabled", true);

		    //show loading
		    $(".loading").show();

		    $.post("/", $("#form").serialize(), function (data) {

		        $(".loading").hide();

		        if (data.success) {
		            $("#error-message").hide();
		            $("#success-message").show();
		            $("#form").hide();
		            return;
		        }

		        //$(this).prop("disabled", false);

		        $("#error-message").html("<p>An error has occurred: " + data.reason + "</p>");
		        $("#error-message").show();
		    }).fail(function (error) {
		        $(".loading").hide();
		        $("#error-message").html("<p>An error has occurred: " + $.parseJSON(error.responseText).reason + "</p>");
		        $("#error-message").show();
		    });;
		});
});

