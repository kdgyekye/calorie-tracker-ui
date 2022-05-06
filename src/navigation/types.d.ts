import { LazyExoticComponent, FC } from "react";

export interface RouteProp {
  name: string;
  component: LazyExoticComponent<() => JSX.Element>;
  exact: boolean;
  path: string;
  role: AdminRole[];
}

export type AdminRole = "ADMIN" | "USER";

export interface NavigationProp {
  href: string;
  icon: any;
  name: string;
  role: AdminRole[];
}

export interface UserNavigationProp {
  href: string;
  name: string;
}
