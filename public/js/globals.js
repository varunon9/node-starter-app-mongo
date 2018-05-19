/**
 * @author Varun Kumar<varunon9@gmail.com>
 * https://github.com/varunon9
 * Date: 10 May, 2018
 */

'use strict';

function  makeAjaxPostRequest(url, params, successCallback, failureCallback) {
    $.ajax({
        url: url,
        method: 'post',
        data: params,
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                successCallback(response.result);
            } else {
                failureCallback(response.message);
            }
        },
        error: globals.ajaxErrorHandler
    });
}

var globals = {}; // application wide global variable

globals.constants = {
}

globals.showToastMessage = function(heading, message, icon) {
    $.toast({
        heading: heading,
        text: message,
        showHideTransition: 'slide',
        icon: icon  // info, error, warning, success
    });
};

/**
 * A utility function to convert date to suitable format needed to update input[type="date"]
 */
globals.formatDate = function(date) {
    if (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    } else {
        return '';
    }
}


globals.ajaxErrorHandler = function(jqXHR, exception) {
    if (jqXHR.status === 0) {
        globals.showToastMessage('Error', 'Not connect.\n Verify Network.', 'error');
    } else if (jqXHR.status == 404) {
        globals.showToastMessage('Error', 'Requested page not found. [404]', 'error');
    } else if (jqXHR.status == 500) {
        globals.showToastMessage('Error', 'Internal Server Error [500].', 'error');
    } else if (exception === 'parsererror') {
        globals.showToastMessage('Error', 'Requested JSON parse failed.', 'error');
    } else if (exception === 'timeout') {
        globals.showToastMessage('Error', 'Time out error.', 'error');
    } else if (exception === 'abort') {
        globals.showToastMessage('Error', 'Ajax request aborted.', 'error');
    } else {
        globals.showToastMessage('Error', 'Uncaught Error.\n' + jqXHR.responseText, 'error');
    }
};

globals.ajaxService = {
    loginUser: function(params, successCallback, failureCallback) {
        var url = 'login';
        makeAjaxPostRequest(url, params, successCallback, failureCallback);
    },

    signupUser: function(params, successCallback, failureCallback) {
        var url = 'signup';
        makeAjaxPostRequest(url, params, successCallback, failureCallback);
    },

    updateUserProfile: function(params, successCallback, failureCallback) {
        var url = 'dashboard/update/user';
        makeAjaxPostRequest(url, params, successCallback, failureCallback);
    },

    getUserProfile: function(params, successCallback, failureCallback) {
        var url = 'dashboard/get/user/profile';
        makeAjaxPostRequest(url, params, successCallback, failureCallback);
    }
};

