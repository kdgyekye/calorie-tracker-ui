import { lazy } from "react"
import { RouteProp } from "./types";
import { DASHBOARD,
FOOD_ENTRIES,
MEALS,
REPORTS } from "./constants";

const TestComponent = lazy(() => import ("../shared/layout/test-component"))

const routes: RouteProp[] = [
    {
        name: "Dashboard",
        component: TestComponent,
        exact: true,
        path: DASHBOARD,
        role: ["ADMINISTRATOR", "USER"]
    },
    {
        name: "Food Entries",
        component: TestComponent,
        exact: true,
        path: FOOD_ENTRIES,
        role: ["ADMINISTRATOR", "USER"]
    },
    {
        name: "Meals",
        component: TestComponent,
        exact: true,
        path: MEALS,
        role: ["ADMINISTRATOR", "USER"]
    },
    {
        name: "Reports",
        component: TestComponent,
        exact: true,
        path: REPORTS,
        role: ["ADMINISTRATOR"]
    }
]

export default routes