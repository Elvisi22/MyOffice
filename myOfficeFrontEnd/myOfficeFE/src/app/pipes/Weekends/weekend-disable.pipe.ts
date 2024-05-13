import { Pipe, PipeTransform } from '@angular/core';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Pipe({
  name: 'weekendDisable'
})
export class WeekendDisablePipe implements PipeTransform {

  transform(): (date: Date) => boolean {
    // Return a function that takes a Date and returns true if it's not a weekend
    return (date: Date) => {
      const dayOfWeek = date.getDay();
      return dayOfWeek !== 0 && dayOfWeek !== 6; // Return true if not Sunday (0) or Saturday (6)
    };
  }
}
