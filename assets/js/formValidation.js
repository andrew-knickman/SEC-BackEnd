$(document).ready(function(){
    $('.form-create').validate({
        rules: {
            username: {
                required: true
            },
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                minlength: 6,
                required: true
            },
            confirm_password: {
                minlength: 6,
                required: true,
                equalTo: "#password"
            }
        },
        success: function(element) {
            element.addClass('valid')
        }
    });
});