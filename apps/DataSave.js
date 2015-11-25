DataSave = function() {
	this.target = 'hiddenData';
	var o = this;
	
	this.loadData = function(callback) {
		this.callback = callback;
		var o = this;
		$.get( "loadData.php")
		.done(function(data, callback) {
			$('#' + o.target).val(data);
			o.callback();
		});
	}
	
	this.saveData = function(dataToSave) {
		$('#' + o.target).val(dataToSave);
		var  formData = "data=" + dataToSave;
		$.post("saveData.php", formData);
	}
}

var dataSave = new DataSave();