import {postData} from '../services/requests';

const forms = () => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php',
	};

	const clearInputs = () => {
		inputs.forEach(input => {
			input.value = '';
		});

		upload.forEach(el => {
			el.previousElementSibling.textContent = 'Файл не выбран';
		});
	};

	upload.forEach(el => {
		el.addEventListener('input', () => {
			console.log(el.files[0]);

			let dots;
			const arr = el.files[0].name.split('.');

			arr[0].length > 12 ? dots = '...' : dots = '.';
			const name = arr[0].substring(0, 13) + dots + arr[1];
			el.previousElementSibling.textContent = name;
		});
	});

	form.forEach(el => {
		el.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			el.parentNode.appendChild(statusMessage);

			el.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				el.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			const formData = new FormData(el);
			let api;
			el.closest('.popup-design') || el.classList.contains('calc-form') ? api = path.designer : api = path.question;
			console.log(api);

			postData(api, formData)
				.then(res => {
					console.log(res);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				.catch(res => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failure;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						el.style.display = 'block';
						el.classList.remove('fadeOutUp');
						el.classList.add('fadeInDown');
					}, 5000);
				});
		});
	});
};

export default forms;