$(function() {

   //$('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
         if (width < 768) {
             console.log("I am here in true");
             $('div.navbar-collapse').addClass('collapse');
             topOffset = 100; // 2-row-menu
         }
         else {
             console.log("I am here in false");
             $('div.navbar-collapse').removeClass('collapse');
         }


        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }

    });

     var url = window.location;
     var element = $('ul.nav a').filter(function() {
         return this.href == url || url.href.indexOf(this.href) == 0;
     }).addClass('active').parent().parent().addClass('in').parent();
     if (element.is('li')) {
         element.addClass('active');
     }
});

//
//$(document).on('click','.navbar-collapse.in',function(e) {
//    if( $(e.target).is('a') ) {
//        $(this).collapse('hide');
//    }
//});

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

$(document).ready(function() {
    $('div.navbar-collapse').addClass('collapse');
    console.log( "ready!" );
});
//
//$(document).ready(function () {
//    $(".navbar-nav li a").click(function(event) {
//        $(".navbar-collapse").collapse('hide');
//    });
//});
