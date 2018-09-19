const slides = document.querySelectorAll('.slider__slide'),
			buttons = document.querySelectorAll('.slider__button');

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function() {
		check(i);
	});
}

function check(value) {
	for (let i = 0; i < slides.length; i++) {
		slides[i].classList.remove('slider__slide_active');
	}
	slides[value].classList.add('slider__slide_active');
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove('slider__button_active');
	}
	buttons[value].classList.add('slider__button_active');
}