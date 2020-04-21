import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'format',
})
export class FormatPipe implements PipeTransform {
    transform(quantity: number, decimals: number = 8) {
        return (quantity / Math.pow(10, decimals)).toLocaleString(undefined, { maximumFractionDigits: decimals })
    }
}
