$(document).ready(function(){
    $('#admin_sidebar-btn').click(function(){
       $('#admin_sidebar').toggleClass('visible');
    });
    $('li.user').click(function(){
       $('ul.user.level-2').toggleClass('visible');
    });
});
