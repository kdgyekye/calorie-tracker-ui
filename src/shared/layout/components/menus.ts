import {NavigationProp} from "../../../navigation/types" 
import {
    DASHBOARD,
    FOOD_ENTRIES,
    MEALS,
    STATISTICS
} from "../../../navigation/constants"
import {
    ChartPieIcon,
    CollectionIcon,
    CakeIcon,
    DocumentReportIcon,
} from "@heroicons/react/outline"

export const navigation:NavigationProp[] = [
    {
        href: DASHBOARD,
        icon: ChartPieIcon,
        name: "Reports",
        role: ["ADMIN"]
    },
    {
        href: FOOD_ENTRIES,
        icon: CakeIcon,
        name: "Food Entries",
        role: ["ADMIN", "USER"]
    },
    {
        href: MEALS,
        icon: CollectionIcon,
        name: "Meals",
        role: ["ADMIN"]
    },
    {
        href: STATISTICS,
        icon: DocumentReportIcon,
        name: "Statistics",
        role: ["USER"]
    },
]