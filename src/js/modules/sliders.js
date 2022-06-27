const sliders = (slides, dir, prev, next) => {
	let slideIndex = 1,
		paused = false;
	const items = document.querySelectorAll(slides);

	function showSlides(n) {  
		if (n > items.length) {
			slideIndex = 1;
		}
		
		if (n < 1) {
			slideIndex = items.length;
		}

		items.forEach(el => {
			el.classList.add('animated');
			el.style.display = 'none';
		});

		items[slideIndex - 1].style.display = 'block';
	}

	showSlides(slideIndex);

	function plusSlides(n) {  
		showSlides(slideIndex += n);
	}

	try {
		const	prevBtn = document.querySelector(prev),
			nextBtn = document.querySelector(next);
		
		prevBtn.addEventListener('click', () => {
			plusSlides(-1);
			items[slideIndex -1].classList.add('fadeIn');
		});	

		nextBtn.addEventListener('click', () => {
			plusSlides(1);
			items[slideIndex -1].classList.add('fadeIn');
		});	

	} catch(e) {}

	function activateAnimation() {  
		if (dir === 'vertical') {
			paused = setInterval(function() {
				plusSlides(1);
				items[slideIndex -1].classList.add('slideInDown');
			}, 5000);
		} else {
			paused = setInterval(function() {
				plusSlides(1);
				items[slideIndex -1].classList.add('fadeIn');
			}, 5000);
		}
	}

	activateAnimation();

	items[0].parentNode.addEventListener('mouseenter', () => {
		clearInterval(paused);
	});

	items[0].parentNode.addEventListener('mouseleave', () => {
		activateAnimation();
	});
};

export default sliders;