import { ElementRef } from '@angular/core';
import { AppMaskDirective} from './app-mask.directive';

describe('AppMaskDirective', () => {
  it('should create an instance', () => {
    const directive = new AppMaskDirective( new ElementRef('') );
    expect(directive).toBeTruthy();
  });
});
