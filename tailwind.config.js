/** @type {import('tailwindcss').Config} */
const { heroui } = require('@heroui/react')

module.exports = {
  content: [
    './src/renderer/*.{html,js}',
    './src/renderer/src/**/*.{ts,js,tsx,jsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        // Default Tailwind breakpoints (included for reference)
        sm: '640px', // => @media (min-width: 640px)
        md: '768px', // => @media (min-width: 768px)
        lg: '1024px', // => @media (min-width: 1024px)
        xl: '1280px', // => @media (min-width: 1280px)
        '2xl': '1536px', // => @media (min-width: 1536px)

        // Custom breakpoints
        xs: { raw: '(max-width: 460px)' }, // Small phones
        '2xs': { raw: '(max-width: 400px)' },
        '3xs': { raw: '(max-width: 360px)' },
        '4xs': { raw: '(max-width: 320px)' },

        '3xl': '1920px', // Large monitors
        '4k': '2560px', // 4K displays
        ultrawide: '3440px', // Ultra-wide monitors

        // Device-specific
        tablet: { raw: '(min-width: 768px) and (max-width: 1023px)' },
        phone: { raw: '(max-width: 767px)' },
        desktop: { raw: '(min-width: 1024px)' },
        'tablet-landscape': {
          raw: '(min-width: 768px) and (max-width: 1023px) and (orientation: landscape)'
        },
        landscape: { raw: '(orientation: landscape)' },
        dark: { raw: '(prefers-color-scheme: dark)' },
        'reduced-motion': { raw: '(prefers-reduced-motion: reduce)' },

        // Height-based
        'h-sm': { raw: '(min-height: 640px)' },
        'h-md': { raw: '(min-height: 768px)' }
      },
      animation: {
        // Basic motions
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',

        // Advanced animations
        float: 'float 6s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        wave: 'wave 2s ease-in-out infinite',
        'neon-pulse': 'neonPulse 1.5s ease-in-out infinite',
        'text-shine': 'textShine 3s linear infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'particle-explode': 'particleExplode 0.6s ease-out forwards',
        morph: 'morph 4s ease-in-out infinite',
        glitch: 'glitch 2s linear infinite',
        parallax: 'parallax 10s linear infinite',
        blob: 'blob 8s ease-in-out infinite',
        flicker: 'flicker 3s ease infinite alternate',
        tilt: 'tilt 10s ease-in-out infinite alternate',
        quantumPulse: 'quantumPulse 1.5s infinite',
        particleStorm: 'particleStorm 0.8s ease-out forwards',
        // ===== FUTURISTIC BUTTONS =====
        'quantum-pulse': 'quantumPulse 1.5s infinite',
        'particle-storm': 'particleStorm 0.8s ease-out forwards',
        'neon-flicker': 'neonFlicker 1.5s ease infinite alternate',
        'hologram-glitch': 'hologramGlitch 2s linear infinite',

        // ===== MODERN LOADERS =====
        'atom-spinner': 'atomSpin 4s linear infinite',
        'data-stream': 'dataStream 3s linear infinite',
        wormhole: 'wormhole 6s linear infinite',

        // ===== UI MICRO-INTERACTIONS =====
        'soft-bounce': 'softBounce 2s ease infinite',
        'magnetic-hover': 'magneticHover 0.5s ease-out forwards',
        'fluid-hover': 'fluidHover 1.2s ease-out forwards',

        // ===== SPECIAL EFFECTS =====
        'cyberpunk-scan': 'cyberpunkScan 3s linear infinite',
        'matrix-rain': 'matrixRain 5s linear infinite',
        hyperspace: 'hyperspace 8s linear infinite'
      },
      keyframes: {
        // ===== BUTTON ANIMATIONS =====
        quantumPulse: {
          '0%': { 'box-shadow': '0 0 0 0 rgba(74, 255, 206, 0.7)' },
          '70%': { 'box-shadow': '0 0 0 15px rgba(74, 255, 206, 0)' },
          '100%': { 'box-shadow': '0 0 0 0 rgba(74, 255, 206, 0)' }
        },
        particleStorm: {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '1' },
          '100%': {
            transform: 'translate(var(--tx), var(--ty)) scale(1)',
            opacity: '0',
            filter: 'blur(1px)'
          }
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
            'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0fa, 0 0 40px #0fa'
          },
          '20%, 22%, 24%, 55%': {
            opacity: '0.6',
            'text-shadow': 'none'
          }
        },

        // ===== LOADING ANIMATIONS =====
        atomSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        dataStream: {
          '0%': { 'stroke-dashoffset': '100', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { 'stroke-dashoffset': '0', opacity: '0' }
        },
        wormhole: {
          '0%': {
            'border-radius': '50%',
            transform: 'rotate(0deg) scale(1)'
          },
          '50%': {
            'border-radius': '40% 60% 70% 30%/40% 70% 30% 60%',
            transform: 'rotate(180deg) scale(1.3)'
          },
          '100%': {
            'border-radius': '50%',
            transform: 'rotate(360deg) scale(1)'
          }
        },

        // ===== UI INTERACTIONS =====
        softBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        magneticHover: {
          '0%': { transform: 'translate(var(--tx), var(--ty)) scale(1)' },
          '100%': { transform: 'translate(0, 0) scale(1.05)' }
        },
        fluidHover: {
          '0%': {
            'clip-path': 'circle(0% at 50% 50%)',
            opacity: '0'
          },
          '100%': {
            'clip-path': 'circle(100% at 50% 50%)',
            opacity: '1'
          }
        },

        // ===== SPECIAL EFFECTS =====
        cyberpunkScan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '1%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' }
        },
        matrixRain: {
          '0%': {
            'background-position': '0 0',
            opacity: '0'
          },
          '1%': { opacity: '1' },
          '100%': {
            'background-position': '0 100%',
            opacity: '0'
          }
        },
        hyperspace: {
          '0%': {
            transform: 'perspective(500px) translateZ(0)',
            filter: 'brightness(1)'
          },
          '50%': {
            transform: 'perspective(500px) translateZ(200px)',
            filter: 'brightness(3)'
          },
          '100%': {
            transform: 'perspective(500px) translateZ(0)',
            filter: 'brightness(1)'
          }
        },

        // ========== BASIC MOTIONS ==========
        spin: {
          to: { transform: 'rotate(360deg)' }
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0'
          }
        },

        // ========== FLOATING EFFECTS ==========
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' }
        },

        // ========== GLOW & SHINE EFFECTS ==========
        neonPulse: {
          '0%, 100%': {
            'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0fa, 0 0 30px #0fa',
            'box-shadow': '0 0 5px rgba(10, 255, 170, 0.5)'
          },
          '50%': {
            'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0fa, 0 0 40px #0fa',
            'box-shadow': '0 0 20px rgba(10, 255, 170, 0.8)'
          }
        },
        textShine: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' }
        },
        borderGlow: {
          '0%': { 'box-shadow': '0 0 5px 3px rgba(99, 102, 241, 0.5)' },
          '100%': { 'box-shadow': '0 0 20px 5px rgba(99, 102, 241, 0.8)' }
        },

        // ========== GRADIENT EFFECTS ==========
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },

        // ========== PARTICLE EFFECTS ==========
        particleExplode: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0',
            filter: 'blur(1px)'
          }
        },

        // ========== MORPHING EFFECTS ==========
        morph: {
          '0%, 100%': { 'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40%/50% 60% 30% 60%' }
        },
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%'
          },
          '33%': {
            transform: 'translate(30px, -20px) scale(1.1)',
            'border-radius': '70% 30% 50% 50%/60% 60% 40% 40%'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
            'border-radius': '40% 60% 70% 30%/40% 70% 30% 60%'
          }
        },

        // ========== GLITCH EFFECTS ==========
        glitch: {
          '0%': {
            transform: 'translate(0)',
            'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          },
          '2%': {
            transform: 'translate(-5px, 5px)',
            'clip-path': 'polygon(0 10%, 100% 20%, 100% 90%, 0 80%)'
          },
          '4%': {
            transform: 'translate(5px, -5px)',
            'clip-path': 'polygon(0 20%, 100% 10%, 100% 80%, 0 90%)'
          },
          '6%': { transform: 'translate(0)' },
          '8%': {
            transform: 'translate(5px, 5px)',
            'clip-path': 'polygon(0 30%, 100% 20%, 100% 70%, 0 80%)'
          },
          '10%': {
            transform: 'translate(-5px, -5px)',
            'clip-path': 'polygon(0 20%, 100% 30%, 100% 80%, 0 70%)'
          },
          '12%': { transform: 'translate(0)' },
          '100%': { transform: 'translate(0)' }
        },

        // ========== PARALLAX EFFECTS ==========
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        },

        // ========== MISCELLANEOUS EFFECTS ==========
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '1'
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' }
        },
        tilt: {
          '0%': { transform: 'rotate(-3deg)' },
          '100%': { transform: 'rotate(3deg)' }
        }
      },
      // ===== 2. COLORS & GRADIENTS =====
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
        'dark-glass': 'rgba(0, 0, 0, 0.3)',
        'neon-pink': '#ff00ff',
        'holographic-blue': 'rgba(0, 255, 255, 0.7)'
      },
      gradientColorStops: {
        'metal-start': '#c0c0c0',
        'metal-end': '#e0e0e0'
      },
      // ===== 3. SPACING & SIZING =====
      spacing: {
        128: '32rem',
        144: '36rem',
        '1/10': '10%',
        '9/10': '90%'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      // ===== 4. TYPOGRAPHY =====
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.75rem',
        '10xl': '10rem'
      },
      lineHeight: {
        tight: '1.1',
        'super-tight': '0.9'
      },
      textShadow: {
        default: '0 2px 4px rgba(0,0,0,0.10)',
        lg: '0 4px 12px rgba(0,0,0,0.15)'
      },

      // ===== 5. BORDERS & EFFECTS =====
      borderWidth: {
        3: '3px',
        5: '5px'
      },
      boxShadow: {
        neumorphic: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'inner-xl': 'inset 0 10px 15px -3px rgba(0, 0, 0, 0.2)'
      },
      backdropBlur: {
        xs: '2px',
        lg: '16px'
      },

      // ===== 6. TRANSFORMS =====
      scale: {
        102: '1.02',
        105: '1.05'
      },
      rotate: {
        25: '25deg',
        '-25': '-25deg'
      },
      // ===== 7. TRANSITIONS =====
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms'
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
      },

      // ===== 8. LAYOUT & GRIDS =====
      aspectRatio: {
        portrait: '3/4',
        landscape: '4/3'
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(200px, 1fr))',
        masonry: 'masonry'
      }, // ===== 9. FILTERS =====
      brightness: {
        80: '0.8',
        120: '1.2'
      },
      hueRotate: {
        30: '30deg',
        60: '60deg'
      },

      // ===== 10. SPECIAL UTILITIES =====
      clipPath: {
        hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        'speech-bubble': 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)'
      },
      backgroundImage: {
        'circular-pattern': 'radial-gradient(circle, var(--tw-gradient-stops))',
        noise: "url('data:image/svg+xml;base64,...')"
      }
    }
  },
  darkMode: 'class',
  plugins: [heroui(), require('tailwindcss-animate')]
}
