/**
 * @author Varun Kumar<varunon9@gmail.com>
 * https://github.com/varunon9
 */

'use-strict';

$(document).ready(function() {
    
    $('.ui.checkbox').checkbox();

    var errorMessageDom = $('#errorMessage');

    $('#loginButton').on('click', function() {
    	errorMessageDom.empty();

    	var params = {};
    	params.email = $('#userEmail').val();
    	params.password = $('#userPassword').val();
        params.keepMeLoggedIn = $('#keepMeLoggedInCheckbox').is(':checked');

    	var hasError = false;
    	var errorMessage = '';

    	// validation
    	if (params.email == '') {
    		hasError = true;
    		errorMessage += 'Please enter your email<br>';
    	} 

    	if (params.password == '') {
    		hasError = true;
    		errorMessage += 'Please enter your password';
    	}

    	if (hasError) {
    		errorMessageDom.append(errorMessage);
    	} else {
			$('#loginButton').addClass('loading');
            globals.ajaxService.loginUser(params, function successCallback() {
                window.location.href = 'dashboard';
            }, function errorCallback(message) {
				errorMessageDom.text(message);
				$('#loginButton').removeClass('loading');
            });
    	}
    });

});