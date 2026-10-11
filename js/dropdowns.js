// Animates the <details> dropdowns. Native <details> opens and closes
// instantly, so the click is intercepted: opening sets `open` and then
// grows the panel; closing shrinks the panel first and only clears `open`
// once the animation has finished.
(() => {
	const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
	const DURATION = 280;
	const EASING = 'cubic-bezier(0.2, 0, 0, 1)';
	const STAGGER = 35;

	document.querySelectorAll('details.link-group').forEach((details) => {
		const summary = details.querySelector('summary');
		const panel = details.querySelector('.sub-links-wrap');
		const items = panel.querySelectorAll('.sub-link');
		let anim = null;
		let expanding = details.open;

		const finish = () => {
			anim = null;
			panel.style.overflow = '';
			if (!expanding) details.open = false;
			details.classList.remove('is-closing');
		};

		summary.addEventListener('click', (e) => {
			if (reduceMotion.matches) return;
			e.preventDefault();

			// Start from wherever an interrupted animation left off
			const from = details.open ? panel.getBoundingClientRect().height : 0;
			if (anim) anim.cancel();

			expanding = !expanding;
			details.open = true;
			details.classList.toggle('is-closing', !expanding);
			panel.style.overflow = 'hidden';

			const to = expanding ? panel.scrollHeight : 0;
			anim = panel.animate(
				[
					{ height: `${from}px`, opacity: expanding ? 0.4 : 1 },
					{ height: `${to}px`, opacity: expanding ? 1 : 0 },
				],
				{ duration: DURATION, easing: EASING }
			);
			anim.onfinish = finish;

			if (expanding) {
				items.forEach((item, i) => {
					item.animate(
						[
							{ opacity: 0, transform: 'translateY(-6px)' },
							{ opacity: 1, transform: 'none' },
						],
						{
							duration: DURATION,
							delay: i * STAGGER,
							easing: EASING,
							fill: 'backwards',
						}
					);
				});
			}
		});
	});
})();
