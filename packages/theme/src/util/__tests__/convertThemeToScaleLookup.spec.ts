import { convertThemeToScaleLookup } from '../convertThemeToScaleLookup'
import { convertTwToTheme } from '../convertTwToTheme'

it('should generate a lookup  from a theme', () => {
  const theme = convertTwToTheme()
  const cssVars = convertThemeToScaleLookup({ theme })
  expect(cssVars).toMatchInlineSnapshot(`
    Object {
      "borderWidths": Object {
        "0": "0px",
        "2": "2px",
        "4": "4px",
        "8": "8px",
        "borderWidth": "1px",
      },
      "colors": Object {
        "black": "#000",
        "blue-100": "#dbeafe",
        "blue-200": "#bfdbfe",
        "blue-300": "#93c5fd",
        "blue-400": "#60a5fa",
        "blue-50": "#eff6ff",
        "blue-500": "#3b82f6",
        "blue-600": "#2563eb",
        "blue-700": "#1d4ed8",
        "blue-800": "#1e40af",
        "blue-900": "#1e3a8a",
        "current": "currentColor",
        "gray-100": "#f3f4f6",
        "gray-200": "#e5e7eb",
        "gray-300": "#d1d5db",
        "gray-400": "#9ca3af",
        "gray-50": "#f9fafb",
        "gray-500": "#6b7280",
        "gray-600": "#4b5563",
        "gray-700": "#374151",
        "gray-800": "#1f2937",
        "gray-900": "#111827",
        "green-100": "#d1fae5",
        "green-200": "#a7f3d0",
        "green-300": "#6ee7b7",
        "green-400": "#34d399",
        "green-50": "#ecfdf5",
        "green-500": "#10b981",
        "green-600": "#059669",
        "green-700": "#047857",
        "green-800": "#065f46",
        "green-900": "#064e3b",
        "indigo-100": "#e0e7ff",
        "indigo-200": "#c7d2fe",
        "indigo-300": "#a5b4fc",
        "indigo-400": "#818cf8",
        "indigo-50": "#eef2ff",
        "indigo-500": "#6366f1",
        "indigo-600": "#4f46e5",
        "indigo-700": "#4338ca",
        "indigo-800": "#3730a3",
        "indigo-900": "#312e81",
        "pink-100": "#fce7f3",
        "pink-200": "#fbcfe8",
        "pink-300": "#f9a8d4",
        "pink-400": "#f472b6",
        "pink-50": "#fdf2f8",
        "pink-500": "#ec4899",
        "pink-600": "#db2777",
        "pink-700": "#be185d",
        "pink-800": "#9d174d",
        "pink-900": "#831843",
        "purple-100": "#ede9fe",
        "purple-200": "#ddd6fe",
        "purple-300": "#c4b5fd",
        "purple-400": "#a78bfa",
        "purple-50": "#f5f3ff",
        "purple-500": "#8b5cf6",
        "purple-600": "#7c3aed",
        "purple-700": "#6d28d9",
        "purple-800": "#5b21b6",
        "purple-900": "#4c1d95",
        "red-100": "#fee2e2",
        "red-200": "#fecaca",
        "red-300": "#fca5a5",
        "red-400": "#f87171",
        "red-50": "#fef2f2",
        "red-500": "#ef4444",
        "red-600": "#dc2626",
        "red-700": "#b91c1c",
        "red-800": "#991b1b",
        "red-900": "#7f1d1d",
        "transparent": "transparent",
        "white": "#fff",
        "yellow-100": "#fef3c7",
        "yellow-200": "#fde68a",
        "yellow-300": "#fcd34d",
        "yellow-400": "#fbbf24",
        "yellow-50": "#fffbeb",
        "yellow-500": "#f59e0b",
        "yellow-600": "#d97706",
        "yellow-700": "#b45309",
        "yellow-800": "#92400e",
        "yellow-900": "#78350f",
      },
      "fontSizes": Object {
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem",
        "base": "1rem",
        "lg": "1.125rem",
        "sm": "0.875rem",
        "xl": "1.25rem",
        "xs": "0.75rem",
      },
      "fontWeights": Object {
        "black": "900",
        "bold": "700",
        "extrabold": "800",
        "extralight": "200",
        "light": "300",
        "medium": "500",
        "normal": "400",
        "semibold": "600",
        "thin": "100",
      },
      "fonts": Object {
        "mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", \\"Courier New\\", monospace",
        "sans": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji\\"",
        "serif": "ui-serif, Georgia, Cambria, \\"Times New Roman\\", Times, serif",
      },
      "letterSpacings": Object {
        "normal": "0em",
        "tight": "-0.025em",
        "tighter": "-0.05em",
        "wide": "0.025em",
        "wider": "0.05em",
        "widest": "0.1em",
      },
      "lineHeights": Object {
        "10": "2.5rem",
        "2xl": "2rem",
        "3": ".75rem",
        "3xl": "2.25rem",
        "4": "1rem",
        "4xl": "2.5rem",
        "5": "1.25rem",
        "5xl": "1",
        "6": "1.5rem",
        "6xl": "1",
        "7": "1.75rem",
        "7xl": "1",
        "8": "2rem",
        "8xl": "1",
        "9": "2.25rem",
        "9xl": "1",
        "base": "1.5rem",
        "lg": "1.75rem",
        "loose": "2",
        "none": "1",
        "normal": "1.5",
        "relaxed": "1.625",
        "sm": "1.25rem",
        "snug": "1.375",
        "tight": "1.25",
        "xl": "1.75rem",
        "xs": "1rem",
      },
      "opacities": Object {
        "0": "0",
        "10": "0.1",
        "100": "1",
        "20": "0.2",
        "25": "0.25",
        "30": "0.3",
        "40": "0.4",
        "5": "0.05",
        "50": "0.5",
        "60": "0.6",
        "70": "0.7",
        "75": "0.75",
        "80": "0.8",
        "90": "0.9",
        "95": "0.95",
      },
      "radii": Object {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px",
        "lg": "0.5rem",
        "md": "0.375rem",
        "none": "0px",
        "radius": "0.25rem",
        "sm": "0.125rem",
        "xl": "0.75rem",
      },
      "shadows": Object {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "none": "none",
        "shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      "spaces": Object {
        "-0-5": "-0.125rem",
        "-1": "-0.25rem",
        "-1-5": "-0.375rem",
        "-10": "-2.5rem",
        "-11": "-2.75rem",
        "-12": "-3rem",
        "-14": "-3.5rem",
        "-16": "-4rem",
        "-2": "-0.5rem",
        "-2-5": "-0.625rem",
        "-20": "-5rem",
        "-24": "-6rem",
        "-28": "-7rem",
        "-3": "-0.75rem",
        "-3-5": "-0.875rem",
        "-32": "-8rem",
        "-36": "-9rem",
        "-4": "-1rem",
        "-40": "-10rem",
        "-44": "-11rem",
        "-48": "-12rem",
        "-5": "-1.25rem",
        "-52": "-13rem",
        "-56": "-14rem",
        "-6": "-1.5rem",
        "-60": "-15rem",
        "-64": "-16rem",
        "-7": "-1.75rem",
        "-72": "-18rem",
        "-8": "-2rem",
        "-80": "-20rem",
        "-9": "-2.25rem",
        "-96": "-24rem",
        "-px": "-1px",
        "0": "0px",
        "0-5": "0.125rem",
        "1": "0.25rem",
        "1-5": "0.375rem",
        "10": "2.5rem",
        "11": "2.75rem",
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
        "2": "0.5rem",
        "2-5": "0.625rem",
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "3": "0.75rem",
        "3-5": "0.875rem",
        "32": "8rem",
        "36": "9rem",
        "4": "1rem",
        "40": "10rem",
        "44": "11rem",
        "48": "12rem",
        "5": "1.25rem",
        "52": "13rem",
        "56": "14rem",
        "6": "1.5rem",
        "60": "15rem",
        "64": "16rem",
        "7": "1.75rem",
        "72": "18rem",
        "8": "2rem",
        "80": "20rem",
        "9": "2.25rem",
        "96": "24rem",
        "px": "1px",
      },
      "zIndices": Object {
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "auto": "auto",
      },
    }
  `)
})