import { Pipe, PipeTransform } from "@angular/core";
import { HabitPeriodicity } from "../../habits-list/habits-list.component";

@Pipe({
    name: 'habitPeriodicity',
    standalone: true
})
export class HabitPeriodicityPipe implements PipeTransform {
    transform(unitType: HabitPeriodicity) {
        switch(unitType) {
            case HabitPeriodicity.daily:
                return 'Каждый день';
            case HabitPeriodicity.weekly:
                return 'Каждую неделю';
            case HabitPeriodicity.monthly:
                return 'Каждый месяц';
            default:
                return '';
        }
    }
}