const validateTextInputs = (selector) => {
	const txtInputs = document.querySelectorAll(selector);

	txtInputs.forEach(input => {
		input.addEventListener('keypress', function (e) {  
			if (e.key.match(/[^а-яё0-9]/ig)) {
				e.preventDefault(); 
			}
		});

		input.addEventListener('input', function (e) {
			if (input.value.match(/[^а-яё0-9]/ig)) {
				input.value = '';
			}
		});
	});
};

export default validateTextInputs;