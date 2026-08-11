/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030712",
          surface: "rgba(15, 23, 42, 0.65)",
          card: "rgba(17, 24, 39, 0.7)",
          border: "rgba(56, 189, 248, 0.2)",
          primary: "#00f2fe",
          secondary: "#4facfe",
          accent: "#a855f7",
          purple: "#7f00ff",
          text: "#f1f5f9",
          muted: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 20%, rgba(0, 242, 254, 0.15) 0%, rgba(127, 0, 255, 0.1) 40%, rgba(3, 7, 18, 0) 70%)',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'glow-radial': 'radial-gradient(circle, rgba(0,242,254,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(168, 85, 247, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
