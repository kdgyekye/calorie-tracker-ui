import { lazy } from "react"
import { RouteProp } from "./types";
import { DASHBOARD,
FOOD_ENTRIES,
MEALS,
STATISTICS,
} from "./constants";

const TestComponent = lazy(() => import ("../shared/layout/test-component"))
const FoodEntries = lazy(() => import ("../pages/food-entries/main/main"))
const Dashboard = lazy(() => import ("../pages/dashboard/main/main"))
const UserStatistics = lazy(() => import ("../pages/statistics/main/main"))

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
    // {
    //     name: "Meals",
    //     component: TestComponent,
    //     exact: true,
    //     path: MEALS,
    //     role: ["ADMIN"]
    // },
    {
        name: "Statistics",
        component: UserStatistics,
        exact: true,
        path: STATISTICS,
        role: ["USER"]
    }
]

export default routes