import { Pipe } from '@angular/core';
import { parse, format } from 'date-fns';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    transform(value: Date | string | undefined): string | null {
        if (!value || typeof(value) === "undefined"){
            return null;
        }
        
        let date: Date;
        if (typeof(value) === "string"){
            date = parse(value, "dd/MM/yyyy", new Date());
        }
        else {
            date = new Date(value);
        }

        if (isNaN(date.getTime())){
            return null;
        }

        return format(date, 'dd.MM.yyyy');
  }
}
