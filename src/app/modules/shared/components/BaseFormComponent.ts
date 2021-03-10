import { Component, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class BaseFormComponent implements ControlValueAccessor {

    @ViewChild('inputControl') inputControl;
    @Input() placeholder: string;
    @Input() disabled: boolean;
    @Input() white: boolean;
    @Input() whiteMd: boolean;
    focussed = false;
    invalid = false;

    protected _thisValue: any;

    propagateChange = (_: any) => {};
    registerTouched = () => {};

    get thisValue() {
        return this._thisValue;
    }

    set thisValue(text) {
        this._thisValue = text;
        this.invalid = false;
        this.propagateChange(this._thisValue);
        this.registerTouched();
    }

    writeValue(value: any) {
        if (value !== undefined) {
            this._thisValue = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.registerTouched = fn;
    }

    minimizePlaceholder() {
        return (this._thisValue ? true : false);
    }

    focus() {
        this.focussed = true;
    }

    setInvalid() {
        this.invalid = true;
    }

    select() {
        this.inputControl.nativeElement.focus();
    }

    blur() {
        this.focussed = false;
    }

}
