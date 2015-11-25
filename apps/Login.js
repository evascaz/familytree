Login = function() {

	this.frmId = 'frmLogin';
	this.frmReminder = 'frmReminder';
	this.btnLogin = 'btnLogin';
	this.btnLogOut = 'btnLogOut';
	this.btnCreatelink = 'btnCreatelink';
	this.btnAdminister = 'btnAdminister';
	this.btnSubmitLogin = 'btnSubmitLogin';
	this.boxLoginClass = 'boxLogin';
	this.boxLoginId = 'box-login';
	this.bgShadowLogin = 'bgShadowLogin';
	this.boxReminderId = 'boxReminder';
	this.boxReminderClass = 'boxReminder';
	this.boxReminderErrorId = 'boxReminderError';
	this.boxReminderOk = 'boxReminderOk';
	this.btnReminder = 'btnReminder';
	this.btnSubmitReminder = 'btnSubmitReminder';
	this.boxLoginErrorId = 'boxLoginError';
	this.logged = false;
	this.loggedControlsClass = 'logged-controls';
	
	var o = this;
	
	this.checkLoginStatus = function(r) {
		var jqxhr = $.get("checkLoginStatus.php")
		.done(function(data){
			if (data=='1') {
				if (r=='siRefresh') {
					document.location.reload();
				} else {					
					o.setUserLogged();
				}
			} else {
				
				o.setUserNotLogged();
			}
		});
	}
	
	this.setUserLogged = function() {		
		$('#' +o.btnLogOut).removeClass('hidden');
		$('#' +o.btnAdminister).removeClass('hidden');
		$('#' +o.btnCreatelink).removeClass('hidden');
		$('#' +o.btnLogin).addClass('hidden');		
		$('.married').removeClass('locked');
		$('.married').find('.icon-lock').removeClass('icon-lock').addClass('icon-arrow-rounded-down');
		o.closeLoginWindow();
		o.logged = true;
		$('.' + o.loggedControlsClass).css('display', 'block');
	}
	
	this.setUserNotLogged = function() {		
		$('#' +o.btnAdminister).addClass('hidden');
		$('#' +o.btnLogOut).addClass('hidden');
		$('#' +o.btnCreatelink).addClass('hidden');
		$('#' +o.btnLogin).removeClass('hidden');
		o.logged = false;
		$('.' + o.loggedControlsClass).css('display', 'none');
	}

	this.openLoginWindow = function() {
		if (!o.logged) {
			$('.' + o.boxLoginClass).css('display', 'block');
		}
	}

	this.closeLoginWindow = function() {
		$('.' + o.boxLoginClass).css('display', 'none');
		$('.' + o.boxReminderClass).css('display', 'none');
		$('#' + o.boxLoginErrorId).css('display', 'none');
	}

	this.checkLogin = function() {
		var jqxhr = $.post("checkLogin.php", $('#' + o.frmId).serialize())
		.done(function(data){
	  		if (data=='0') {
	  			$('#' + o.boxLoginErrorId).text('Please check email and password!').css('display', 'block');
	  		} else {
	  			if (data=='1') {
	  				o.checkLoginStatus('siRefresh');
	  			}
	  		}
		});
	}
	
	this.openReminderWindow = function() {
		$('#' + o.boxLoginId).css('display', 'none');
		$('#' + o.boxReminderId).css('display', 'block');
	}
	
	this.checkEmail = function() {
		var jqxhr = $.post("checkEmail.php", $('#' + o.frmReminder).serialize())
		.done(function(data){
	  		if (data=='0') {
	  			$('#' + o.boxReminderErrorId).text('Email not found! Please retry.').css('display', 'block');
	  		} else {
	  			if (data=='1') {
	  				o.reminderOk();
	  			}
	  		}
		});
	}
	
	this.reminderOk = function() {
		$('#' + o.boxReminderId).css('display', 'none');
		$('#' + o.boxReminderOk).css('display', 'block');
	}
		

	this.bindSubmit = function() {
		$('#' + o.btnSubmitLogin).on('click', function() {
			o.checkLogin(o.frmId);
		});
	}
	
	this.bindReminder = function() {
		$('#' + o.btnSubmitReminder).on('click', function() {
			o.checkEmail(o.frmReminder);
		});
	}

	this.bindOpenReminderWindow = function() {
		$('#' + o.btnReminder).bind('click', function() {
			o.openReminderWindow();
		});
	}

	this.bindCloseLoginWindow = function() {
		$('#' + o.bgShadowLogin).bind('click', function() {
			o.closeLoginWindow();
		});
	}

	this.bindOpenLoginWindow = function() {
		$('#' + o.btnLogin).bind('click', function() {
			o.openLoginWindow();
		});
	}
	
	this.bindLogOut = function() {
		$('#' + o.btnLogOut).on('click', function() {			
			var jqxhr = $.get("logOut.php")
			.done(function() {				
				o.checkLoginStatus();
			});
		});
	}
	
	this.bindOpenAdmin = function() {
		$('#' + o.btnAdminister).bind('click', function() {
			$.cookie("data", oTreeState);
			console.log(oTreeState);
			window.location = 'admin/';
		});
	}

	this.init = function() {
		o.checkLoginStatus('noRefresh');
		o.bindOpenLoginWindow();
		o.bindCloseLoginWindow();
		o.bindOpenReminderWindow();
		o.bindSubmit();
		o.bindLogOut();
		o.bindOpenAdmin();
		o.bindReminder();
	}
	
}

var login = new Login();
login.init();