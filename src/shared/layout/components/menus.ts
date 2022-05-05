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
        href: DASHBOARD,
        icon: ChartPieIcon,
        name: "Dashboard",
        role: ["ADMINISTRATOR", "USER"]
    },
    {
        href: FOOD_ENTRIES,
        icon: CakeIcon,
        name: "Food Entries",
        role: ["ADMINISTRATOR", "USER"]
    },
    {
        href: MEALS,
        icon: CollectionIcon,
        name: "Meals",
        role: ["ADMINISTRATOR", "USER"]
    }, 
    {
        href: REPORTS,
        icon: DocumentReportIcon,
        name: "Reports",
        role: ["ADMINISTRATOR"]
    }
]