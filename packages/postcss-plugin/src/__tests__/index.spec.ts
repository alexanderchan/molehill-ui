const postcss = require('postcss')
const plugin = require('../')

async function run(input, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
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
        @import 'molehill/theme';
        a {
          color: blue;
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
      }
              a {
                color: blue;
              }
            "
    `)

    expect(result.warnings()).toHaveLength(0)
  })
})
