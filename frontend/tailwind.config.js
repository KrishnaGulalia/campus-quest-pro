/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: { '0%, 100%': { transform: 'translateX(0)' }, '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' }, '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' } },
        'gradient-shift': { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        'orbital-spin': { '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' }, '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' } },
        'counter-orbital': { '0%': { transform: 'rotate(0deg) translateX(5px) rotate(0deg)' }, '100%': { transform: 'rotate(-360deg) translateX(5px) rotate(360deg)' } },
        'icon-bob': { '0%, 100%': { transform: 'translateY(-5%)' }, '50%': { transform: 'translateY(5%)' } },
        satellite: { '0%': { transform: 'rotate(0deg) translateX(50px) scale(0.8)' }, '100%': { transform: 'rotate(360deg) translateX(50px) scale(0.8)' } },
        'text-glow': { '0%, 100%': { textShadow: '0 0 5px rgba(255, 165, 0, 0.5), 0 0 10px rgba(255, 165, 0, 0.5)' }, '50%': { textShadow: '0 0 15px rgba(255, 165, 0, 1), 0 0 25px rgba(255, 165, 0, 1)' } },
        'title-entrance': { '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' }, '100%': { opacity: '1', transform: 'translateY(0) scale(1)' } },
        'subtitle-slide': { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        'star-twinkle': { '0%, 100%': { transform: 'scale(0.8)', opacity: '0.7' }, '50%': { transform: 'scale(1.2)', opacity: '1' } },
        'sparkle-spin': { '0%': { transform: 'rotate(0deg) scale(1)', opacity: 1 }, '50%': { transform: 'rotate(180deg) scale(1.5)', opacity: 0.5 }, '100%': { transform: 'rotate(360deg) scale(1)', opacity: 1 } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in': { '0%': { transform: 'scale(0.9)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'orbital-spin': 'orbital-spin 8s linear infinite',
        'counter-orbital': 'counter-orbital 5s linear infinite',
        'icon-bob': 'icon-bob 3s ease-in-out infinite',
        satellite: 'satellite 4s linear infinite',
        'text-glow': 'text-glow 2.5s ease-in-out infinite',
        'title-entrance': 'title-entrance 0.5s ease-out 0.2s forwards',
        'subtitle-slide': 'subtitle-slide 0.5s ease-out 0.4s forwards',
        'star-twinkle': 'star-twinkle 2s ease-in-out infinite',
        'sparkle-spin': 'sparkle-spin 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};