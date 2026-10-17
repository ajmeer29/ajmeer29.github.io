(function () {
	"use strict";

	var searchInput = document.getElementById("event-search-input");
	var searchStatus = document.querySelector(".event-search-status");
	var eventCards = Array.prototype.slice.call(document.querySelectorAll(".events .event"));

	if (searchInput && searchStatus) {
		function filterEvents() {
			var query = searchInput.value.trim().toLocaleLowerCase();
			var visibleCount = 0;

			eventCards.forEach(function (card) {
				var matches = card.textContent.toLocaleLowerCase().indexOf(query) !== -1;
				card.hidden = !matches;
				if (matches) {
					visibleCount += 1;
				}
			});

			searchStatus.textContent = query
				? visibleCount + (visibleCount === 1 ? " event found" : " events found")
				: "Showing all " + visibleCount + " events";
		}

		searchInput.addEventListener("input", filterEvents);
	}

	var navigation = document.querySelector(".stretchy-nav");
	var menuTrigger = document.querySelector(".nav-trigger");

	if (navigation && menuTrigger && window.MutationObserver) {
		var navigationObserver = new MutationObserver(function () {
			menuTrigger.setAttribute("aria-expanded", navigation.classList.contains("nav-is-visible") ? "true" : "false");
		});

		navigationObserver.observe(navigation, { attributes: true, attributeFilter: ["class"] });
	}

	var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if ("IntersectionObserver" in window && !reduceMotion) {
		var revealTargets = document.querySelectorAll(
			".events .event, .team .at-column, .sponsorsContainer > div:not([style*='clear'])"
		);

		if (revealTargets.length) {
			var revealObserver = new IntersectionObserver(function (entries, observer) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-in-view");
						observer.unobserve(entry.target);
					}
				});
			}, {
				rootMargin: "0px 0px -40px 0px",
				threshold: 0.12
			});

			document.documentElement.classList.add("has-scroll-reveal");
			revealTargets.forEach(function (target) {
				target.classList.add("reveal-on-scroll");
				revealObserver.observe(target);
			});
		}
	}
}());
