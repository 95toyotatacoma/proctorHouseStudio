/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      /* ============================================================
       *  TYPOGRAPHY TOKENS
       * ============================================================ */
      fontFamily: {
        "page-header": ["Tilt Warp", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "display-xl": ["LiHei Pro", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "display-l": ["LiHei Pro", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "display-m": ["LiHei Pro", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],

        "heading-xxl": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "heading-xl": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "heading-xl-bold": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "heading-l": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "heading-m": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "heading-s": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],

        "body-l": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "body-m": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "body-s": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],

        "label-m": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        "label-s": ["Kodchasan", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },

      // Each fontSize includes its token weight baked in
      fontSize: {
        "page-header": ["116px", { lineHeight: "1", fontWeight: "400" }],

        "display-xl": ["72px", { lineHeight: "1.1", fontWeight: "500" }],
        "display-l": ["48px", { lineHeight: "1.1", fontWeight: "500" }],
        "display-m": ["36px", { lineHeight: "1.1", fontWeight: "500" }],

        "heading-xxl": ["40px", { lineHeight: "1.2", fontWeight: "400" }],
        "heading-xl": ["32px", { lineHeight: "1.2", fontWeight: "400" }],
        "heading-xl-bold": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-l": ["28px", { lineHeight: "1.25", fontWeight: "400" }],
        "heading-m": ["22px", { lineHeight: "1.25", fontWeight: "700" }],
        "heading-s": ["18px", { lineHeight: "1.3", fontWeight: "400" }],

        "body-l": ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-m": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-s": ["16px", { lineHeight: "1.6", fontWeight: "400" }],

        "label-m": ["14px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.08em" }],
        "label-s": ["12px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.08em" }],
      },

      /* ============================================================
       *  COLOR TOKENS
       * ============================================================ */
      colors: {
        // Native Colors Collection
        "stone-shell": "#b5a99a",
        "lava-flow": "#e0452c",
        "leaf-vein": "#5fa148",
        "ocean-cliff": "#3d5a73",
        "driftwood-beige": "#d8c9b5",
        "meadow-grass": "#9bc87f",
        "petal-violet": "#7c5fa7",
        "circuit-glow": "#18c37d",
        "copper-patina": "#a46e44",
        "its-white": "#ebebeb",
        "its-black": "#1e1e1e",

        // Color Tools Collection (semantic)
        "very-back": "#1e1e1e",
        "primary-text": "#ebebeb",
        section: "#b5a99a",
        cards: "#d8c9b5",
        "border-cards": "#3d5a73",
        "primary-button": "#e0452c",
        "secondary-button-outline": "#5fa148",
        accent: "#18c37d",
        highlight: "#7c5fa7",
        dividers: "#a46e44",
        success: "#9bc87f",
        hover: "rgba(124, 95, 167, 0.2)",
      },

      /* ============================================================
       *  SPACING + RADII TOKENS
       * ============================================================ */
      spacing: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        xxl: "16px",
        "3xl-token": "24px",
        "4xl-token": "32px",
        big: "42px",
        giant: "56px",
        jumbo: "60px",
      },

      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
        big: "42px",
        giant: "56px",
        jumbo: "60px",
      },

      /* ============================================================
       *  SHADOW / EFFECT TOKENS
       * ============================================================ */
      boxShadow: {
        // Equivalent to --effect-text-shadow (used as a block effect)
        "text-block": "inset -12px -6px 3px 0px rgba(30, 30, 30, 0.33)",

        // Equivalent to --effect-cards
        card: "3px 4px 4px 0px rgba(0, 0, 0, 0.08)",

        // Equivalent to --effect-outer-shadow
        outer: "8px 4px 6px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};