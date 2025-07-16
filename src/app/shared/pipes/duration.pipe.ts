import { Pipe } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe {
    transform(value: number): string {        
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        
        const hoursStr = hours.toString().padStart(2, "0");
        const minutesStr = minutes.toString().padStart(2, "0");
        
        if (hours == 1){
            return `${hoursStr}:${minutesStr} hour`;
        }
        
        return `${hoursStr}:${minutesStr} hours`;
    }
}
