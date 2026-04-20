import type { ReactNode } from 'react';

export const withHeader = { header: { header: true } };
export const withBottomNav = { bottomNavigation: true };

export const headerHandle = (title?: string, right?: ReactNode) => ({
  header: { header: true, title, right },
});
