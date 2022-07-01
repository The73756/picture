const accordion = (triggersSelector) => {
	const btns = document.querySelectorAll(triggersSelector);

	btns.forEach(btn => {
		btn.addEventListener('click', function() {
			this.classList.toggle('active-style');
			this.nextElementSibling.classList.toggle('active-block');

			if(this.classList.contains('active-style')) {
				this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';

				btns.forEach(btn => {
					if(btn !== this) {
						btn.classList.remove('active-style');
						btn.nextElementSibling.classList.remove('active-block');
						btn.nextElementSibling.style.maxHeight = 0;
					}
				});
			} else {
				this.nextElementSibling.style.maxHeight = '0px';
			}
		});
	});
};

export default accordion;