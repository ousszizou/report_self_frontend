module.exports = {
  theme: {
    extend: {
      colors: {
        ui: {
          background: "var(--color-ui-background)",
          typo: "var(--color-ui-typo)",
          primary: "var(--color-ui-primary)",
          border: "var(--color-ui-border)"
        },
        "alert-lighter": "#ff953c",
        "alert-darker": "#e47c25",
        "btn-green": "#4caf50",
        "btn-red": "#f44336",
        "btn-blue": "#00bcd4",
        statscovidcolor: "#f44336 !important",
        statshealtyhcolor: "#2196f3 !important"
      },
      spacing: {
        sm: "24rem"
      },
      screens: {
        xxl: "1400px"
      },
      zIndex: {
        1: 1
      }
    },
    container: {
      center: true,
      padding: "1rem"
    }
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "disabled"],
    cursor: ["responsive", "hover", "focus", "disabled"]
  },
  plugins: []
}
