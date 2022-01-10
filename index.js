
//----------------------------------------------------------------------------//
// Runtime                                                                    //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////
/// Remove the HTML no-js classname

document.documentElement.className =
document.documentElement.className.replace (/no-js/g, 'js');

////////////////////////////////////////////////////////////////////////////////
/// Enable hover effects on touch for mobile devices that need it (i.e. iOS)

document.addEventListener ('touchstart', ( ) => { }, true);



//----------------------------------------------------------------------------//
// Generic                                                                    //
//----------------------------------------------------------------------------//

window.addEventListener ('load', event =>
{
	////////////////////////////////////////////////////////////////////////////////
	/// Enables lazy loading for all images which enable it

	{
		// Create an observer to track the scroll progress
		const scroller = new IntersectionObserver (entries =>
		{
			for (const e of entries)
			{
				// Wait until loading is needed
				if (!e.isIntersecting) continue;

				// Cache the target node
				const $target = e.target;

				// Perform single observation
				scroller.unobserve ($target);

				// Check if 2x source available
				if ($target.dataset['src-2x'])
				{
					$target.srcset =
						`${$target.dataset['src'   ]} 1x,` +
						`${$target.dataset['src-2x']} 2x`;
				}

				// Start loading and add a class for enabling transition animation
				$target.onload = () => $target.classList.add ('lazy-image-loaded');
				$target.src = $target.dataset.src;
			}
		});

		// Attach intersection observer to images
		document.querySelectorAll ('img.lazy-image')
			.forEach (i => scroller.observe (i));
	}
});



//----------------------------------------------------------------------------//
// Greeting                                                                   //
//----------------------------------------------------------------------------//

console.info ("%c Hey There! Welcome to My Site! 👋",              "font-size: 18px");
console.info ("%c https://github.com/dkrutsko/feliks.krutsko.net", "font-size: 13px");
