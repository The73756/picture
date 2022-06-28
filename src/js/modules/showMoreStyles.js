import {getData} from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
	const btn = document.querySelector(trigger);

	btn.addEventListener('click', function() {
		getData('assets/db.json')
			.then(res => createCards(res.styles)) 
			.catch(err => console.log(err));
		
		this.remove();
	});

	function createCards(response) {
		response.forEach(({src, title, link}) => {
			let card = document.createElement('div');
			card.classList.add('animated', 'fadeIn', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
			card.innerHTML = `
				<div class=styles-block>
					<img src="${src}" alt="стиль">
					<h4>${title}</h4>
					<a href="${link}">Подробнее</a>
				</div>
			`;
	
			document.querySelector(wrapper).appendChild(card);
		});
	}	
};

export default showMoreStyles;