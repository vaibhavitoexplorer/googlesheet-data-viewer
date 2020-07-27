import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortner'
})
export class ShortenPipe implements PipeTransform {
    
    transform(string: any, length: number) {
        return string.substr(0, 45);
    }
}