import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appMask]'
})
export class AppMaskDirective {
  @Input('appMask') mask: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    let value = this.el.nativeElement.value.replace(/\D/g, '');

    if (this.mask === 'cpf') {
      value = this.formatCPF(value);
    } else if (this.mask === 'telefone') {
      value = this.formatTelefone(value);
    }

    this.el.nativeElement.value = value;
  }

  private formatCPF(value: string): string {
    if (!value) return '';
    value = value.replace(/^(\d{3})(\d)/, '$1.$2');
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
    return value;
  }

  private formatTelefone(value: string): string {
    if (!value) return '';
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    return value;
  }
}
