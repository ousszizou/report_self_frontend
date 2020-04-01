module.exports = {
  theme: {
    extend: {
      colors: {
        ui: {
          background: 'var(--color-ui-background)',
          sidebar: 'var(--color-ui-sidebar)',
          typo: 'var(--color-ui-typo)',
          primary: 'var(--color-ui-primary)',
          border: 'var(--color-ui-border)'
        },
        'alert-lighter': '#ff953c',
        'alert-darker' : '#e47c25',
        'btn-green': '#4caf50',
        'btn-red': '#f44336',
        'statscovidcolor': '#f44336 !important',
        'statshealtyhcolor': '#2196f3 !important'
      },
      spacing: {
        sm: '24rem'
      },
      screens: {
        xxl: '1400px'
      }
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  variants: {},
  plugins: [],
}
