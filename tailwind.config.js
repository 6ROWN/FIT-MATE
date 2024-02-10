/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#ffd500", // Primary
				secondary: "#262624", // Dark
				accent: "#f8f8f8", // Neutral
				lightGray: "#939392", // Secondary
				dark: "#070705", // Accent
			},
		},
	},
	plugins: [],
};
