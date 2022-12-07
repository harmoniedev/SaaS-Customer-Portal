const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const selectorParser = require('postcss-selector-parser');

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './layout/**/*.{js,ts,jsx,tsx}',
      './scenes/**/*.{js,ts,jsx,tsx}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      grab: 'grab',
      grabbing: 'grabbing',
    },
    extend: {
      lineHeight: {
        mini: '1.15',
      },
      transitionTimingFunction: {
        'in-cubic': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        'out-cubic': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
      },
      width: {
        '85vw': '85vw',
        xxs: '375px',
        xxxl: '1600px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.indigo.500'),
            h1: {
              fontWeight: theme('fontWeight.bold'),
            },
            'strong, h1, h2, h3, h4, h5, h6': {
              color: 'currentColor',
            },
            'a[class]': {
              textDecoration: 'none',
              color: 'initial',
            },
            'a[class]:hover': {
              textDecoration: 'none',
              color: 'initial',
            },
            'a:not([class])': {
              color: '#496fff',
              fontWeight: theme('fontWeight.normal'),
              textDecoration: 'none',
              transition: 'color 0.15s',
            },
            'a:not([class]):hover': {
              textDecoration: 'underline',
              color: '#334eb3',
            },
            'a[class]:hover strong': {
              textDecoration: 'none',
              color: 'initial',
            },
            'a:not([class]) strong': {
              color: '#496fff',
              fontWeight: theme('fontWeight.bold'),
              textDecoration: 'none',
              transition: 'color 0.15s',
            },
            'a:not([class]):hover strong': {
              textDecoration: 'underline',
              color: '#334eb3',
            },
            ul: {
              textAlign: 'left',
            },
            ol: {
              textAlign: 'left',
            },
            '.list-style-check li': {
              position: 'relative',
              marginBottom: '0.75em',
            },
            '.list-style-check li::before': {
              content: '""',
              backgroundImage:
                'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23496fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 13 4 4L19 7"/></svg>\')',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px',
              borderRadius: 0,
              backgroundColor: 'transparent',
              width: '16px',
              height: '16px',
              position: 'absolute',
              display: 'block',
              top: '0.35em',
              left: '0',
              opacity: '0.75',
            },
          },
        },
      }),
    },
    minHeight: {
      0: '0',
      '1/2': '50vw',
      full: '100%',
    },
    maxHeight: {
      0: '0',
      half: '50%',
      full: '100%',
      screen: '100vh',
      '50vh': '50vh',
      '75vh': '75vh',
      '90vh': '90vh',
    },
    minWidth: {
      0: '0',
      full: '100%',
    },
    maxWidth: {
      xxs: '375px',
      xs: '500px',
      screen: '100vw',
      full: '100%',
      '40vw': '40vw',
      '50vw': '50vw',
      '60vw': '60vw',
      '75vw': '75vw',
      '90vw': '90vw',
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontSize: {
      ...defaultTheme.fontSize,
      0: '0',
    },
    screens: {
      xs: '420px',
      ...defaultTheme.screens,
    },
    fill: (theme) => ({
      white: 'white',
      black: 'black',
      current: 'currentColor',
    }),
    transitionProperty: {
      'shadow-transform': 'box-shadow, transform',
      ...defaultTheme.transitionProperty,
    },
    colors: {
      lightblue: '#f7fafc',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      blue: {
        50: '#edf1ff',
        100: '#c8d4ff',
        200: '#a4b7ff',
        300: '#809aff',
        400: '#5b7dff',
        500: '#496fff',
        600: '#4264e6',
        700: '#334eb3',
        800: '#253880',
        900: '#16214c',
      },
      indigo: {
        50: '#E6ECEE',
        100: '#b3c5cc',
        200: '#809fab',
        300: '#4d7889',
        400: '#1a5167',
        500: '#003e56',
        600: '#00384d',
        700: '#002b3c',
        800: '#001f2b',
        900: '#00131a',
      },
      red: {
        50: '#feedec',
        100: '#fcc8c5',
        200: '#faa39f',
        300: '#f77e79',
        400: '#f55952',
        500: '#f4473f',
        600: '#dc4039',
        700: '#ab322c',
        800: '#7a2420',
        900: '#491513',
      },
      green: {
        50: '#f5faea',
        100: '#e0f1c0',
        200: '#cce796',
        300: '#b8dd6c',
        400: '#a3d442',
        500: '#99cf2d',
        600: '#8aba29',
        700: '#6b911f',
        800: '#4d6817',
        900: '#2e3e0d',
      },
      yellow: {
        50: '#fffaeb',
        100: '#ffefc2',
        200: '#ffe499',
        300: '#ffd970',
        400: '#ffce47',
        500: '#ffc933',
        600: '#e6b52e',
        700: '#b38d24',
        800: '#80651a',
        900: '#4c3c0f',
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-focus-within', 'group-hover'],
      opacity: ['group-focus-within', 'group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),

    // group-focus-within variant
    plugin(function ({ addVariant, config }) {
      const prefixClass = function (className) {
        const prefix = config('prefix');
        const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;
        return `${getPrefix(`.${className}`)}${className}`;
      };

      const groupPseudoClassVariant = function (pseudoClass) {
        return ({ modifySelectors, separator }) => {
          return modifySelectors(({ selector }) => {
            return selectorParser((selectors) => {
              selectors.walkClasses((classNode) => {
                classNode.value = `group-${pseudoClass}${separator}${classNode.value}`;
                classNode.parent.insertBefore(
                  classNode,
                  selectorParser().astSync(
                    `.${prefixClass('group')}:${pseudoClass} `,
                  ),
                );
              });
            }).processSync(selector);
          });
        };
      };
      addVariant('group-focus-within', groupPseudoClassVariant('focus-within'));
    }),
  ],
};
