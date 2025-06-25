
export const uiConfig = {
  colors: {
    primary: '#20243F',
    background: {
      gradient: 'bg-gradient-to-br from-white via-[#F5F2FF] to-[#E0EEFF]',
      diamond: {
        opacity: 'opacity-[0.06]',
        pattern: `radial-gradient(circle at 1px 1px, #20243F 1px, transparent 0)`,
        size: '24px 24px'
      }
    },
    card: {
      background: 'bg-white/90',
      backdrop: 'backdrop-blur-sm',
      shadow: 'shadow-lg hover:shadow-xl',
      hover: 'hover:scale-[1.03]'
    }
  },
  animation: {
    fadeIn: 'animate-fade-in',
    transition: 'transition-all duration-200'
  },
  sidebar: {
    collapsed: 'ml-[72px]',
    expanded: 'ml-[280px]'
  }
} as const;
