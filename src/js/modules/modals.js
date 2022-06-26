const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

		trigger.forEach(el => {
			el.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				windows.forEach (el => {
					el.style.display = 'none';
				});

				modal.style.display = 'block';
				document.body.classList.add('disable-scroll');
			});
		});

		close.addEventListener('click', () => {
			modal.style.display = 'none';
			document.body.classList.remove('disable-scroll');

			windows.forEach (el => {
				el.style.display = 'none';
			});
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				modal.style.display = 'none';
				document.body.classList.remove('disable-scroll');

				windows.forEach (el => {
					el.style.display = 'none';
				});
			}
		});
	}

	function showModalByTime(selector, time) {  
		setTimeout(() => {
			let display;

			document.querySelectorAll('[data-modal]').forEach(el => {
				if (getComputedStyle(el).display !== 'none') {
					display = 'block';
				}
			});

			if (!display) {
				document.querySelector(selector).style.display = 'block';
				document.body.classList.add('disable-scroll');
			}

		}, time);
	}

	function calcScrollWidth() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);

		document.documentElement.style.setProperty('--scrollWidth', `${scrollWidth}px`);
	}

	calcScrollWidth();
	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	
	showModalByTime('.popup-consultation', 5000);
};
export default modals;