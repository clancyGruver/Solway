module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      gridTemplateRows: {
        layout: '100px minmax(0, 1fr)',
      }
    },
  },
  plugins: [],
  files: {
    exclude: [
      "**/.git/**",
      "**/node_modules/**",
    ]
  },
}
