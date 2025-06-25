
export const routes = {
  dashboard: {
    root: '/dashboard',
    realtime: '/dashboard/realtime',
    funnels: '/dashboard/funnels',
    economy: '/dashboard/economy',
    retention: '/dashboard/retention',
    abtests: '/dashboard/abtests',
  }
} as const;

export type DashboardRoute = typeof routes.dashboard[keyof typeof routes.dashboard];
