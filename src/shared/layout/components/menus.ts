import {NavigationProp} from "../../../navigation/types" 
import {
    DASHBOARD,
    FOOD_ENTRIES,
    MEALS,
    REPORTS
} from "../../../navigation/constants"
import {
    ChartPieIcon,
    CollectionIcon,
    CakeIcon,
    DocumentReportIcon,
} from "@heroicons/react/outline"

export const navigation:NavigationProp[] = [
    {
        href: FOOD_ENTRIES,
        icon: CakeIcon,
        name: "Food Entries",
        role: ["ADMIN", "USER"]
    },
    {
        href: DASHBOARD,
        icon: ChartPieIcon,
        name: "Reports",
        role: ["ADMIN"]
    },
    {
        href: MEALS,
        icon: CollectionIcon,
        name: "Meals",
        role: ["ADMIN", "USER"]
    },
]