import { lazy } from "react"
import { RouteProp } from "./types";
import { DASHBOARD,
FOOD_ENTRIES,
MEALS,
REPORTS } from "./constants";

const TestComponent = lazy(() => import ("../shared/layout/test-component"))
const FoodEntries = lazy(() => import ("../pages/food-entries/main/main"))
const Dashboard = lazy(() => import ("../pages/dashboard/main/main"))

const routes: RouteProp[] = [
    {
        name: "Food Entries",
        component: FoodEntries,
        exact: true,
        path: FOOD_ENTRIES,
        role: ["ADMIN", "USER"]
    },
    {
        name: "Reports",
        component: Dashboard,
        exact: true,
        path: DASHBOARD,
        role: ["ADMIN"]
    },
    {
        name: "Meals",
        component: TestComponent,
        exact: true,
        path: MEALS,
        role: ["ADMIN", "USER"]
    },
]

export default routes