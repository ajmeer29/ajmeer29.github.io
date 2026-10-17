(function () {
	"use strict";

	var storageKey = "indhan-theme";
	var root = document.documentElement;

	function getSavedTheme() {
		try {
			return window.localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
		} catch (error) {
			console.warn("Theme preference could not be loaded.", error);
			return "light";
		}
	}

	function setTheme(theme, savePreference) {
		root.setAttribute("data-theme", theme);

		document.querySelectorAll(".theme-toggle").forEach(function (button) {
			var isDark = theme === "dark";
			button.setAttribute("aria-pressed", isDark ? "true" : "false");
			button.setAttribute("aria-label", "Toggle dark mode");

			var label = button.querySelector(".theme-toggle-label");
			if (label) {
				label.textContent = isDark ? "Light mode" : "Dark mode";
			}
		});

		var themeColor = document.querySelector('meta[name="theme-color"]');
		if (themeColor) {
			themeColor.setAttribute("content", theme === "dark" ? "#071b2f" : "#f4f7fb");
		}

		if (savePreference) {
			try {
				window.localStorage.setItem(storageKey, theme);
			} catch (error) {
				console.warn("Theme preference could not be saved.", error);
			}
		}
	}

	setTheme(getSavedTheme(), false);

	function initializeThemeToggle() {
		document.querySelectorAll(".theme-toggle").forEach(function (button) {
			button.addEventListener("click", function () {
				var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
				setTheme(nextTheme, true);
			});
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initializeThemeToggle);
	} else {
		initializeThemeToggle();
	}
}());
