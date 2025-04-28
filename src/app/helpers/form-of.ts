import { FormControl } from '@angular/forms';

export type FormOf<T> = { [key in keyof T]: FormControl<T[key] | null> };
//export type FormOf<T, keys extends (keyof T)> = { [key in keys]: FormControl<T[key]> };