export const ROUTES = {
    ROOT: '/',
    PROFILE: '/profile',
    VIP: '/vip',
    MOVIES: '/movies',
} as const;

export type AppRoutes = typeof ROUTES;
