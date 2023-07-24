'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface IMainNavProps extends React.HtmlHTMLAttributes<HTMLElement> {}

const MainNav: React.FC<IMainNavProps> = ({ className, ...props }) => {
  const pathname = usePathname();
  const params = useParams();
  const checkActiveRoute = (route: string) => {
    return pathname === `/${params.storeId}${route}`;
  };
  const routes = [
    {
      href: `/${params.storeId}/`,
      label: 'Overview',
      active: checkActiveRoute(''),
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: checkActiveRoute('/settings'),
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              route.active ? 'text-black ' : 'text-muted-foreground'
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
