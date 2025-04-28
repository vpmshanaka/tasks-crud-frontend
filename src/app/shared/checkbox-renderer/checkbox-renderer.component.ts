import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface CheckboxRendererParams<T>
  extends ICellRendererParams<T, unknown, void> {
  label: string;
  action: (data: T) => void;
  value: (data: T) => boolean;
  conditional: (data: T) => boolean;
  disabled: (data: T) => boolean;
}

@Component({
  selector: 'checkbox-renderer',
  standalone: true,
  imports: [MatCheckboxModule, MatTooltipModule],
  templateUrl: './checkbox-renderer.component.html',
  styleUrl: './checkbox-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxRendererComponent<T> implements ICellRendererAngularComp {
  params!: CheckboxRendererParams<T>;
  label = '';
  conditional = true;
  disabled = false;
  value = false;

  agInit(params: CheckboxRendererParams<T>): void {
    this.setValuesBasedOnParams(params);
  }

  refresh(params: CheckboxRendererParams<T>): boolean {
    this.setValuesBasedOnParams(params);
    return true;
  }

  private setValuesBasedOnParams(params: CheckboxRendererParams<T>) {
    this.params = params;
    if (params.data) {
      this.label = this.params.label;
      // this.conditional = this.params.conditional(params.data);
      // this.disabled = this.params.disabled(params.data);
      this.value = this.params.value(params.data);
    }
  }

  performAction() {
    if (this.params.data) {
      this.params.action(this.params.data);
    }
  }
}
