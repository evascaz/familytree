TreePassword = function() {

	this.frmId = 'frmPassword';
	this.btnSubmit = 'btnSubmitPassword';
	this.boxClass = 'boxPassword';
	this.boxId = 'treePassword';
	this.bgShadow = 'bgShadowPassword';
	this.boxErrorId = 'boxPasswordError';
	this.family_id='';
	this.obj='';
	this.th='';
	
	var o = this;
	
	this.checkTreePasswordStatus = function(family_id, obj, th) {
		o.family_id=family_id;
		o.obj=obj;
		o.th=th;
		var jqxhr = $.get("checkTreePasswordStatus.php?id_family=" + family_id)
		.done(function(data){
			if (data == '1') {
				o.closePasswordWindow();
				openTree(obj, th);
			//checkTreePasswordStatus=data;
			} else {
				o.openPasswordWindow(family_id);
			}
		});
	}

	this.openPasswordWindow = function(family_id) {
		$('#family_id').val(family_id);
		$('.' + o.boxClass).css('display', 'block');
	}

	this.closePasswordWindow = function() {
		$('.' + o.boxClass).css('display', 'none');
		$('#' + o.boxPasswordErrorId).css('display', 'none');
	}

	this.checkPassword = function() {
		var jqxhr = $.post("checkPassword.php", $('#' + o.frmId).serialize())
		.done(function(data){
	  		if (data=='0') {
	  			$('#' + o.boxErrorId).text('Wrong password! Please try again.').css('display', 'block');
	  		} else {
	  			if (data=='1') {
	  				o.checkTreePasswordStatus(o.family_id, o.obj, o.th);
	  			}
	  		}
		});
	}

	this.bindSubmit = function() {
		$('#' + o.btnSubmit).on('click', function() {
			o.checkPassword();
		});
	}

	this.bindClosePasswordWindow = function() {
		$('#' + o.bgShadow).bind('click', function() {
			o.closePasswordWindow();
		});
	}

	this.bindOpenPasswordWindow = function() {
		$('#' + o.btnLogin).bind('click', function() {
			if (o.logged) {
				window.open('admin/');
			} else {
				o.openLoginWindow();
			}
		});
	}

	this.init = function() {
		o.bindOpenPasswordWindow();
		o.bindClosePasswordWindow();
		o.bindSubmit();
	}
	
}

var treePassword = new TreePassword();
treePassword.init();