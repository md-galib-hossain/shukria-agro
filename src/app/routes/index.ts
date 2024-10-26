import { Router } from "express";
import { CategoryRoutes } from "../modules/Category/category.route";
import { CowRoutes } from "../modules/Cow/cow.route";
import { LactationRoutes } from "../modules/Lactation/lactation.route";
import { PregnancyRoutes } from "../modules/Pregnancy/pregnancy.route";
import { VaccineRoutes } from "../modules/Vaccine/vaccine.route";

const router = Router()
const moduleRoutes = [
    {
        path: '/category',
        route: CategoryRoutes
    },
    {
        path: '/cow',
        route: CowRoutes
    },
    {
        path: '/lactation',
        route: LactationRoutes
    },
    {
        path: '/pregnancy',
        route: PregnancyRoutes
    },
    {
        path: '/vaccine',
        route: VaccineRoutes
    },
]

moduleRoutes.forEach((item)=> router.use(item.path,item.route))
export default router