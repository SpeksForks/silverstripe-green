(function($) {
	$.entwine('ss', function($) {
		$('select[name=DesignModule]').entwine({
			onchange: function(e) {
				console.log('submitty');
				this.closest('body .cms-container').submitForm(
					this.closest('form'),
					this.closest('form').find('[name=action_save]')[0]
				);
			}
		})
	});
})(jQuery);