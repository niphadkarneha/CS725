(function () {

    document.addEventListener("deviceready", function () {
        FastClick.attach(document.body);
        StatusBar.overlaysWebView(false);
    }, false);


    // Show/hide menu toggle
    $('#btn-menu').click(function () {
        if ($('#container').hasClass('offset')) {
            $('#container').removeClass('offset');
        } else {
            $('#container').addClass('offset');
        }
        return false;
    });

    // Basic view routing
    $(window).on('hashchange', route);

    function route() {
        dashboard3.render();      
    }

    dashboard3.render();

}());