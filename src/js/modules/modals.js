const modals = () => {
	let btnPressed = false;

	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

		trigger.forEach(el => {
			el.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				btnPressed = true;

				if (destroy) {
					el.remove();
				}

				windows.forEach (el => {
					el.style.display = 'none';
					el.classList.add('animated', 'fadeIn');
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

	function openByScroll(selector) {
		window.addEventListener('scroll', () => {
			if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
				document.querySelector(selector).click();
			}
		});
	}

	calcScrollWidth();
	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true, true);
	
	openByScroll('.fixed-gift');
	// showModalByTime('.popup-consultation', 60000);
};
export default modals;