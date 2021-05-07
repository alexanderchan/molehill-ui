const postcss = require('postcss')
const plugin = require('../')

async function run(input, opts = {}) {
  const result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  })
  return result
}

// a simple template literal to piggyback on css`` string formatting
function css(arr) {
  return arr[0]
}

describe('postcss-plugin', () => {
  it('adds theme values to :root', async () => {
    const result = await run(
      css`
        @import 'molehill-ui/variables';
        @import 'molehill-ui/base';
        a {
          background-color: blue-400;
          font-weight: bold;
          color: blue-500;
          padding: 4;
        }
      `,
      {}
    )

    expect(result.css).toMatchInlineSnapshot(`
      ":root {
      	--mh-color-transparent: transparent;
      	--mh-color-current: currentColor;
      	--mh-color-black: #000;
      	--mh-color-white: #fff;
      	--mh-color-gray-50: #f9fafb;
      	--mh-color-gray-100: #f3f4f6;
      	--mh-color-gray-200: #e5e7eb;
      	--mh-color-gray-300: #d1d5db;
      	--mh-color-gray-400: #9ca3af;
      	--mh-color-gray-500: #6b7280;
      	--mh-color-gray-600: #4b5563;
      	--mh-color-gray-700: #374151;
      	--mh-color-gray-800: #1f2937;
      	--mh-color-gray-900: #111827;
      	--mh-color-red-50: #fef2f2;
      	--mh-color-red-100: #fee2e2;
      	--mh-color-red-200: #fecaca;
      	--mh-color-red-300: #fca5a5;
      	--mh-color-red-400: #f87171;
      	--mh-color-red-500: #ef4444;
      	--mh-color-red-600: #dc2626;
      	--mh-color-red-700: #b91c1c;
      	--mh-color-red-800: #991b1b;
      	--mh-color-red-900: #7f1d1d;
      	--mh-color-yellow-50: #fffbeb;
      	--mh-color-yellow-100: #fef3c7;
      	--mh-color-yellow-200: #fde68a;
      	--mh-color-yellow-300: #fcd34d;
      	--mh-color-yellow-400: #fbbf24;
      	--mh-color-yellow-500: #f59e0b;
      	--mh-color-yellow-600: #d97706;
      	--mh-color-yellow-700: #b45309;
      	--mh-color-yellow-800: #92400e;
      	--mh-color-yellow-900: #78350f;
      	--mh-color-green-50: #ecfdf5;
      	--mh-color-green-100: #d1fae5;
      	--mh-color-green-200: #a7f3d0;
      	--mh-color-green-300: #6ee7b7;
      	--mh-color-green-400: #34d399;
      	--mh-color-green-500: #10b981;
      	--mh-color-green-600: #059669;
      	--mh-color-green-700: #047857;
      	--mh-color-green-800: #065f46;
      	--mh-color-green-900: #064e3b;
      	--mh-color-blue-50: #eff6ff;
      	--mh-color-blue-100: #dbeafe;
      	--mh-color-blue-200: #bfdbfe;
      	--mh-color-blue-300: #93c5fd;
      	--mh-color-blue-400: #60a5fa;
      	--mh-color-blue-500: #3b82f6;
      	--mh-color-blue-600: #2563eb;
      	--mh-color-blue-700: #1d4ed8;
      	--mh-color-blue-800: #1e40af;
      	--mh-color-blue-900: #1e3a8a;
      	--mh-color-indigo-50: #eef2ff;
      	--mh-color-indigo-100: #e0e7ff;
      	--mh-color-indigo-200: #c7d2fe;
      	--mh-color-indigo-300: #a5b4fc;
      	--mh-color-indigo-400: #818cf8;
      	--mh-color-indigo-500: #6366f1;
      	--mh-color-indigo-600: #4f46e5;
      	--mh-color-indigo-700: #4338ca;
      	--mh-color-indigo-800: #3730a3;
      	--mh-color-indigo-900: #312e81;
      	--mh-color-purple-50: #f5f3ff;
      	--mh-color-purple-100: #ede9fe;
      	--mh-color-purple-200: #ddd6fe;
      	--mh-color-purple-300: #c4b5fd;
      	--mh-color-purple-400: #a78bfa;
      	--mh-color-purple-500: #8b5cf6;
      	--mh-color-purple-600: #7c3aed;
      	--mh-color-purple-700: #6d28d9;
      	--mh-color-purple-800: #5b21b6;
      	--mh-color-purple-900: #4c1d95;
      	--mh-color-pink-50: #fdf2f8;
      	--mh-color-pink-100: #fce7f3;
      	--mh-color-pink-200: #fbcfe8;
      	--mh-color-pink-300: #f9a8d4;
      	--mh-color-pink-400: #f472b6;
      	--mh-color-pink-500: #ec4899;
      	--mh-color-pink-600: #db2777;
      	--mh-color-pink-700: #be185d;
      	--mh-color-pink-800: #9d174d;
      	--mh-color-pink-900: #831843;
      	--mh-space-0: 0px;
      	--mh-space-1: 0.25rem;
      	--mh-space-2: 0.5rem;
      	--mh-space-3: 0.75rem;
      	--mh-space-4: 1rem;
      	--mh-space-5: 1.25rem;
      	--mh-space-6: 1.5rem;
      	--mh-space-7: 1.75rem;
      	--mh-space-8: 2rem;
      	--mh-space-9: 2.25rem;
      	--mh-space-10: 2.5rem;
      	--mh-space-11: 2.75rem;
      	--mh-space-12: 3rem;
      	--mh-space-14: 3.5rem;
      	--mh-space-16: 4rem;
      	--mh-space-20: 5rem;
      	--mh-space-24: 6rem;
      	--mh-space-28: 7rem;
      	--mh-space-32: 8rem;
      	--mh-space-36: 9rem;
      	--mh-space-40: 10rem;
      	--mh-space-44: 11rem;
      	--mh-space-48: 12rem;
      	--mh-space-52: 13rem;
      	--mh-space-56: 14rem;
      	--mh-space-60: 15rem;
      	--mh-space-64: 16rem;
      	--mh-space-72: 18rem;
      	--mh-space-80: 20rem;
      	--mh-space-96: 24rem;
      	--mh-space-px: 1px;
      	--mh-space-0-5: 0.125rem;
      	--mh-space-1-5: 0.375rem;
      	--mh-space-2-5: 0.625rem;
      	--mh-space-3-5: 0.875rem;
      	--mh-space--0: -0px;
      	--mh-space--1: -0.25rem;
      	--mh-space--2: -0.5rem;
      	--mh-space--3: -0.75rem;
      	--mh-space--4: -1rem;
      	--mh-space--5: -1.25rem;
      	--mh-space--6: -1.5rem;
      	--mh-space--7: -1.75rem;
      	--mh-space--8: -2rem;
      	--mh-space--9: -2.25rem;
      	--mh-space--10: -2.5rem;
      	--mh-space--11: -2.75rem;
      	--mh-space--12: -3rem;
      	--mh-space--14: -3.5rem;
      	--mh-space--16: -4rem;
      	--mh-space--20: -5rem;
      	--mh-space--24: -6rem;
      	--mh-space--28: -7rem;
      	--mh-space--32: -8rem;
      	--mh-space--36: -9rem;
      	--mh-space--40: -10rem;
      	--mh-space--44: -11rem;
      	--mh-space--48: -12rem;
      	--mh-space--52: -13rem;
      	--mh-space--56: -14rem;
      	--mh-space--60: -15rem;
      	--mh-space--64: -16rem;
      	--mh-space--72: -18rem;
      	--mh-space--80: -20rem;
      	--mh-space--96: -24rem;
      	--mh-space--px: -1px;
      	--mh-space--0-5: -0.125rem;
      	--mh-space--1-5: -0.375rem;
      	--mh-space--2-5: -0.625rem;
      	--mh-space--3-5: -0.875rem;
      	--mh-font-size-xs: 0.75rem;
      	--mh-font-size-sm: 0.875rem;
      	--mh-font-size-base: 1rem;
      	--mh-font-size-lg: 1.125rem;
      	--mh-font-size-xl: 1.25rem;
      	--mh-font-size-2xl: 1.5rem;
      	--mh-font-size-3xl: 1.875rem;
      	--mh-font-size-4xl: 2.25rem;
      	--mh-font-size-5xl: 3rem;
      	--mh-font-size-6xl: 3.75rem;
      	--mh-font-size-7xl: 4.5rem;
      	--mh-font-size-8xl: 6rem;
      	--mh-font-size-9xl: 8rem;
      	--mh-line-height-3: .75rem;
      	--mh-line-height-4: 1rem;
      	--mh-line-height-5: 1.25rem;
      	--mh-line-height-6: 1.5rem;
      	--mh-line-height-7: 1.75rem;
      	--mh-line-height-8: 2rem;
      	--mh-line-height-9: 2.25rem;
      	--mh-line-height-10: 2.5rem;
      	--mh-line-height-none: 1;
      	--mh-line-height-tight: 1.25;
      	--mh-line-height-snug: 1.375;
      	--mh-line-height-normal: 1.5;
      	--mh-line-height-relaxed: 1.625;
      	--mh-line-height-loose: 2;
      	--mh-line-height-xs: 1rem;
      	--mh-line-height-sm: 1.25rem;
      	--mh-line-height-base: 1.5rem;
      	--mh-line-height-lg: 1.75rem;
      	--mh-line-height-xl: 1.75rem;
      	--mh-line-height-2xl: 2rem;
      	--mh-line-height-3xl: 2.25rem;
      	--mh-line-height-4xl: 2.5rem;
      	--mh-line-height-5xl: 1;
      	--mh-line-height-6xl: 1;
      	--mh-line-height-7xl: 1;
      	--mh-line-height-8xl: 1;
      	--mh-line-height-9xl: 1;
      	--mh-font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji\\";
      	--mh-font-serif: ui-serif, Georgia, Cambria, \\"Times New Roman\\", Times, serif;
      	--mh-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", \\"Courier New\\", monospace;
      	--mh-font-weight-thin: 100;
      	--mh-font-weight-extralight: 200;
      	--mh-font-weight-light: 300;
      	--mh-font-weight-normal: 400;
      	--mh-font-weight-medium: 500;
      	--mh-font-weight-semibold: 600;
      	--mh-font-weight-bold: 700;
      	--mh-font-weight-extrabold: 800;
      	--mh-font-weight-black: 900;
      	--mh-border-width-0: 0px;
      	--mh-border-width-2: 2px;
      	--mh-border-width-4: 4px;
      	--mh-border-width-8: 8px;
      	--mh-border-width: 1px;
      	--mh-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      	--mh-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      	--mh-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      	--mh-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      	--mh-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      	--mh-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      	--mh-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
      	--mh-shadow-none: none;
      	--mh-opacity-0: 0;
      	--mh-opacity-5: 0.05;
      	--mh-opacity-10: 0.1;
      	--mh-opacity-20: 0.2;
      	--mh-opacity-25: 0.25;
      	--mh-opacity-30: 0.3;
      	--mh-opacity-40: 0.4;
      	--mh-opacity-50: 0.5;
      	--mh-opacity-60: 0.6;
      	--mh-opacity-70: 0.7;
      	--mh-opacity-75: 0.75;
      	--mh-opacity-80: 0.8;
      	--mh-opacity-90: 0.9;
      	--mh-opacity-95: 0.95;
      	--mh-opacity-100: 1;
      	--mh-z-index-0: 0;
      	--mh-z-index-10: 10;
      	--mh-z-index-20: 20;
      	--mh-z-index-30: 30;
      	--mh-z-index-40: 40;
      	--mh-z-index-50: 50;
      	--mh-z-index-auto: auto;
      	--mh-radius-none: 0px;
      	--mh-radius-sm: 0.125rem;
      	--mh-radius: 0.25rem;
      	--mh-radius-md: 0.375rem;
      	--mh-radius-lg: 0.5rem;
      	--mh-radius-xl: 0.75rem;
      	--mh-radius-2xl: 1rem;
      	--mh-radius-3xl: 1.5rem;
      	--mh-radius-full: 9999px;
      	--mh-letter-spacing-tighter: -0.05em;
      	--mh-letter-spacing-tight: -0.025em;
      	--mh-letter-spacing-normal: 0em;
      	--mh-letter-spacing-wide: 0.025em;
      	--mh-letter-spacing-wider: 0.05em;
      	--mh-letter-spacing-widest: 0.1em;
      	--mh-space-w-full: 100%;
      	--mh-space-h-full: 100%;
      	--mh-space-full: 100%;
      	--mh-space-w-screen: 100vw;
      	--mh-space-h-screen: 100vh;
      	--mh-space-min: min-content;
      	--mh-space-max: max-content;
      }
              /*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */
              /*
      Document
      ========
      */
              /**
      Use a better box model (opinionated).
      */
              *,
      ::before,
      ::after {
      	box-sizing: border-box;
      }
              /**
      Use a more readable tab size (opinionated).
      */
              html {
      	-moz-tab-size: 4;
      	tab-size: 4;
      }
              /**
      1. Correct the line height in all browsers.
      2. Prevent adjustments of font size after orientation changes in iOS.
      */
              html {
      	line-height: 1.15; /* 1 */
      	-webkit-text-size-adjust: 100%; /* 2 */
      }
              /*
      Sections
      ========
      */
              /**
      Remove the margin in all browsers.
      */
              body {
      	margin: var(--mh-space-0);
      }
              /**
      Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
      */
              body {
      	font-family:
      		system-ui,
      		-apple-system, /* Firefox supports this but not yet \`system-ui\` */
      		'Segoe UI',
      		Roboto,
      		Helvetica,
      		Arial,
      		sans-serif,
      		'Apple Color Emoji',
      		'Segoe UI Emoji';
      }
              /*
      Grouping content
      ================
      */
              /**
      1. Add the correct height in Firefox.
      2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
      */
              hr {
      	height: 0; /* 1 */
      	color: inherit; /* 2 */
      }
              /*
      Text-level semantics
      ====================
      */
              /**
      Add the correct text decoration in Chrome, Edge, and Safari.
      */
              abbr[title] {
      	text-decoration: underline dotted;
      }
              /**
      Add the correct font weight in Edge and Safari.
      */
              b,
      strong {
      	font-weight: bolder;
      }
              /**
      1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
      2. Correct the odd 'em' font sizing in all browsers.
      */
              code,
      kbd,
      samp,
      pre {
      	font-family:
      		ui-monospace,
      		SFMono-Regular,
      		Consolas,
      		'Liberation Mono',
      		Menlo,
      		monospace; /* 1 */
      	font-size: 1em; /* 2 */
      }
              /**
      Add the correct font size in all browsers.
      */
              small {
      	font-size: 80%;
      }
              /**
      Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
      */
              sub,
      sup {
      	font-size: 75%;
      	line-height: 0;
      	position: relative;
      	vertical-align: baseline;
      }
              sub {
      	bottom: -0.25em;
      }
              sup {
      	top: -0.5em;
      }
              /*
      Tabular data
      ============
      */
              /**
      1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
      2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
      */
              table {
      	text-indent: 0; /* 1 */
      	border-color: inherit; /* 2 */
      }
              /*
      Forms
      =====
      */
              /**
      1. Change the font styles in all browsers.
      2. Remove the margin in Firefox and Safari.
      */
              button,
      input,
      optgroup,
      select,
      textarea {
      	font-family: inherit; /* 1 */
      	font-size: 100%; /* 1 */
      	line-height: 1.15; /* 1 */
      	margin: var(--mh-space-0); /* 2 */
      }
              /**
      Remove the inheritance of text transform in Edge and Firefox.
      1. Remove the inheritance of text transform in Firefox.
      */
              button,
      select { /* 1 */
      	text-transform: none;
      }
              /**
      Correct the inability to style clickable types in iOS and Safari.
      */
              button,
      [type='button'],
      [type='reset'],
      [type='submit'] {
      	-webkit-appearance: button;
      }
              /**
      Remove the inner border and padding in Firefox.
      */
              ::-moz-focus-inner {
      	border-style: none;
      	padding: var(--mh-space-0);
      }
              /**
      Restore the focus styles unset by the previous rule.
      */
              :-moz-focusring {
      	outline: 1px dotted ButtonText;
      }
              /**
      Remove the additional ':invalid' styles in Firefox.
      See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
      */
              :-moz-ui-invalid {
      	box-shadow: var(--mh-shadow-none);
      }
              /**
      Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
      */
              legend {
      	padding: var(--mh-space-0);
      }
              /**
      Add the correct vertical alignment in Chrome and Firefox.
      */
              progress {
      	vertical-align: baseline;
      }
              /**
      Correct the cursor style of increment and decrement buttons in Safari.
      */
              ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
      	height: auto;
      }
              /**
      1. Correct the odd appearance in Chrome and Safari.
      2. Correct the outline style in Safari.
      */
              [type='search'] {
      	-webkit-appearance: textfield; /* 1 */
      	outline-offset: -2px; /* 2 */
      }
              /**
      Remove the inner padding in Chrome and Safari on macOS.
      */
              ::-webkit-search-decoration {
      	-webkit-appearance: none;
      }
              /**
      1. Correct the inability to style clickable types in iOS and Safari.
      2. Change font properties to 'inherit' in Safari.
      */
              ::-webkit-file-upload-button {
      	-webkit-appearance: button; /* 1 */
      	font: inherit; /* 2 */
      }
              /*
      Interactive
      ===========
      */
              /*
      Add the correct display in Chrome and Safari.
      */
              summary {
      	display: list-item;
      }
              /**
       * Manually forked from SUIT CSS Base: https://github.com/suitcss/base
       * A thin layer on top of normalize.css that provides a starting point more
       * suitable for web applications.
       */
              /**
       * Removes the default spacing and border for appropriate elements.
       */
              blockquote,
      dl,
      dd,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      figure,
      p,
      pre {
        margin: var(--mh-space-0);
      }
              button {
        background-color: var(--mh-color-transparent);
        background-image: none;
      }
              /**
        * Work around a Firefox/IE bug where the transparent \`button\` background
        * results in a loss of the default \`button\` focus styles.
        */
              button:focus {
        outline: 1px dotted;
        outline: 5px auto -webkit-focus-ring-color;
      }
              fieldset {
        margin: var(--mh-space-0);
        padding: var(--mh-space-0);
      }
              ol,
      ul {
        list-style: none;
        margin: var(--mh-space-0);
        padding: var(--mh-space-0);
      }
              /**
        * Tailwind custom reset styles
        */
              /**
        * 1. Use the user's configured \`sans\` font-family 
        * 2. Use Tailwind's default \\"normal\\" line-height so the user isn't forced
        *    to override it to ensure consistency even when using the default theme.
        */
              html {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; /* 1 */
        line-height: 1.5; /* 2 */
      }
              /**
        * Inherit font-family and line-height from \`html\` so users can set them as
        * a class directly on the \`html\` element.
        */
              body {
        font-family: inherit;
        line-height: inherit;
      }
              /**
        * 1. Prevent padding and border from affecting element width.
        *
        *    We used to set this in the html element and inherit from
        *    the parent element for everything else. This caused issues
        *    in shadow-dom-enhanced elements like <details> where the content
        *    is wrapped by a div with box-sizing set to \`content-box\`.
        *
        *    https://github.com/mozdevs/cssremedy/issues/4
        *
        *
        * 2. Allow adding a border to an element by just adding a border-width.
        *
        *    By default, the way the browser specifies that an element should have no
        *    border is by setting it's border-style to \`none\` in the user-agent
        *    stylesheet.
        *
        *    In order to easily add borders to elements by just setting the \`border-width\`
        *    property, we change the default border-style for all elements to \`solid\`, and
        *    use border-width to hide them instead. This way our \`border\` utilities only
        *    need to set the \`border-width\` property instead of the entire \`border\`
        *    shorthand, making our border utilities much more straightforward to compose.
        *
        *    https://github.com/tailwindcss/tailwindcss/pull/116
        */
              *,
      ::before,
      ::after {
        box-sizing: border-box; /* 1 */
        border-width: var(--mh-border-width-0); /* 2 */
        border-style: solid; /* 2 */
        border-color: currentColor; /* 2 */
      }
              /*
        * Ensure horizontal rules are visible by default
        */
              hr {
        border-top-width: 1px;
      }
              /**
        * Undo the \`border-style: none\` reset that Normalize applies to images so that
        * our \`border-{width}\` utilities have the expected effect.
        *
        * The Normalize reset is unnecessary for us since we default the border-width
        * to 0 on all elements.
        *
        * https://github.com/tailwindcss/tailwindcss/issues/362
        */
              img {
        border-style: solid;
      }
              textarea {
        resize: vertical;
      }
              input::placeholder,
      textarea::placeholder {
        opacity: 1;
        color: #a1a1aa;
      }
              button,
      [role='button'] {
        cursor: pointer;
      }
              table {
        border-collapse: collapse;
      }
              h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: inherit;
        font-weight: inherit;
      }
              /**
        * Reset links to optimize for opt-in styling instead of
        * opt-out.
        */
              a {
        color: inherit;
        text-decoration: inherit;
      }
              /**
        * Reset form element properties that are easy to forget to
        * style explicitly so you don't inadvertently introduce
        * styles that deviate from your design system. These styles
        * supplement a partial reset that is already applied by
        * normalize.css.
        */
              button,
      input,
      optgroup,
      select,
      textarea {
        padding: var(--mh-space-0);
        line-height: inherit;
        color: inherit;
      }
              /**
        * Use the configured 'mono' font family for elements that
        * are expected to be rendered with a monospace font, falling
        * back to the system monospace stack if there is no configured
        * 'mono' font family.
        */
              pre,
      code,
      kbd,
      samp {
        font-family: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
          'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
          'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
      }
              /**
        * Make replaced elements \`display: block\` by default as that's
        * the behavior you want almost all of the time. Inspired by
        * CSS Remedy, with \`svg\` added as well.
        *
        * https://github.com/mozdevs/cssremedy/issues/14
        */
              img,
      svg,
      video,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block;
        vertical-align: middle;
      }
              /**
        * Constrain images and videos to the parent width and preserve
        * their intrinsic aspect ratio.
        *
        * https://github.com/mozdevs/cssremedy/issues/14
        */
              img,
      video {
        max-width: 100%;
        height: auto;
      }
              a {
                background-color: var(--mh-color-blue-400);
                font-weight: var(--mh-font-weight-bold);
                color: var(--mh-color-blue-500);
                padding: var(--mh-space-4);
              }
            "
    `)

    expect(result.warnings()).toHaveLength(0)
  })
})
