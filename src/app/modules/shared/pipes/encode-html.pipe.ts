import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeHtml'
})
export class EncodeHtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {

      let buf = [];

      for (let i = value.length - 1; i >= 0; i--) {
          buf.unshift(['&#', value[i].charCodeAt(), ';'].join(''));
      }

      return buf.join('').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');

  }

}
