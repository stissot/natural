import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';
import { DropdownComponent } from '../../types/DropdownComponent';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { BehaviorSubject, merge } from 'rxjs';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownData } from '../../dropdown-container/dropdown.service';
import { PossibleOperators } from '../types';

export interface TypeDateConfiguration<D = any> {
    min?: D | null;
    max?: D | null;
}

/**
 * Min date validator
 */
function dateMin<D>(dateAdapter: DateAdapter<D>, min: D): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
        if (control.value && dateAdapter.compareDate(control.value, min) < 0) {
            return {min: true};
        }

        return null;
    };
}

/**
 * Max date validator
 */
function dateMax<D>(dateAdapter: DateAdapter<D>, max: D): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
        if (control.value && dateAdapter.compareDate(control.value, max) > 0) {
            return {max: true};
        }

        return null;
    };
}

@Component({
    templateUrl: './type-date.component.html',
})
export class TypeDateComponent<D = any> implements DropdownComponent {

    public renderedValue = new BehaviorSubject<string>('');
    public configuration: TypeDateConfiguration<D>;
    public operatorCtrl: FormControl = new FormControl('greaterOrEqual');
    public valueCtrl: FormControl = new FormControl();

    /**
     * Here we avoid `=` operator to avoid ambiguities when end-user select a date, but server filter on datetime
     */
    public readonly operators: PossibleOperators = {
        less: '<',
        lessOrEqual: '≤',
        greaterOrEqual: '≥',
        greater: '>',
    };

    public form: FormGroup;

    private readonly defaults: TypeDateConfiguration<D> = {
        min: null,
        max: null,
    };

    constructor(
        @Inject(NATURAL_DROPDOWN_DATA) data: NaturalDropdownData,
        private dateAdapter: DateAdapter<D>,
        @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    ) {
        this.configuration = {...this.defaults, ...data.configuration as TypeDateConfiguration};
        this.form = new FormGroup({
            operator: this.operatorCtrl,
            value: this.valueCtrl,
        });

        merge(this.operatorCtrl.valueChanges, this.valueCtrl.valueChanges).subscribe(() => {
            this.renderedValue.next(this.getRenderedValue());
        });

        this.initValidators();
        this.reloadCondition(data.condition);
    }

    private reloadCondition(condition: FilterGroupConditionField | null): void {
        if (!condition) {
            return;
        }

        for (const key in this.operators) {
            if (condition[key]) {
                this.operatorCtrl.setValue(key);

                const parsedValue = this.dateAdapter.parse(condition[key].value, null);
                this.valueCtrl.setValue(parsedValue);
            }
        }
    }

    private initValidators(): void {
        const validators: ValidatorFn[] = [Validators.required];
        if (this.configuration.min) {
            validators.push(dateMin<D>(this.dateAdapter, this.configuration.min));
        }

        if (this.configuration.max) {
            validators.push(dateMax<D>(this.dateAdapter, this.configuration.max));
        }

        this.valueCtrl.setValidators(validators);
    }

    public getCondition(): FilterGroupConditionField {
        const condition: FilterGroupConditionField = {};
        condition[this.operatorCtrl.value] = {
            value: this.serialize(this.valueCtrl.value),
        };

        return condition;
    }

    private serialize(value: D | null): string {
        return value ? this.dateAdapter.toIso8601(value) : '';
    }

    public render(value: D | null): string {
        return value ? this.dateAdapter.format(value, this.dateFormats.display.dateInput) : '';
    }

    private getRenderedValue(): string {
        if (this.valueCtrl.value === null) {
            return '';
        } else {
            const value = this.render(this.valueCtrl.value);

            return this.operators[this.operatorCtrl.value] + ' ' + value;
        }
    }

    public isValid(): boolean {
        return this.form.valid;
    }

    public isDirty(): boolean {
        return this.form.dirty;
    }

}
