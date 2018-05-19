/**
 * @author Varun Kumar<varunon9@gmail.com>
 * https://github.com/varunon9
 */

'use-strict';

$(document).ready(function() {
   
    $('.ui.checkbox').checkbox();
    var params = {}; // parameters for signup

    $('#signupButton').on('click', function() {
        $('#errorMessage').empty();
        
    	params.email = $('#userEmail').val();
    	params.password = $('#userPassword').val();

    	var hasError = false;
    	var errorMessage = '';

    	// validation
    	if (params.email == '') {
    		hasError = true;
    		errorMessage += 'Please enter your email<br>';
    	} 

    	if (params.password == '') {
    		hasError = true;
    		errorMessage += 'Please choose a password';
    	}

    	if (hasError) {
    		$('#errorMessage').append(errorMessage);
    	} else {
            $('#signupButton').addClass('loading');
            globals.ajaxService.signupUser(params, function successCallback() {
                window.location.href = 'dashboard';
            }, function errorCallback(message) {
                $('#errorMessage').text(message);
                $('#signupButton').removeClass('loading');
            })
    	}
    });

});