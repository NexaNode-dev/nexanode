import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value && value.length > 0) {
      return marked(value, {async: false, gfm: true, breaks: true}).toString();
    }
    return value;
  }
}
