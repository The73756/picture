const drop = () => {
	const fileInputs = document.querySelectorAll('[name="upload"]');

	['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, preventDefaults, false);
		});
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function hightLight(item) {
		item.closest('.file_upload').style.outline = 'green 2px dashed';
	}

	function unHightLight(item) {
		item.closest('.file_upload').style.outline = '';
	}

	['dragenter', 'dragover'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => hightLight(input), false);
		});
	});

	['dragleave', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => unHightLight(input), false);
		});
	});

	fileInputs.forEach(input => {
		input.addEventListener('drop', (e) => {
			input.files = e.dataTransfer.files;

			let dots;
			const arr = input.files[0].name.split('.');

			arr[0].length > 12 ? dots = '...' : dots = '.';
			const name = arr[0].substring(0, 13) + dots + arr[1];
			input.previousElementSibling.textContent = name;
		});
	});

};

export default drop;