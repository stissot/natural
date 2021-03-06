import { Component, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownData } from '../../dropdown-container/dropdown.service';
import { NaturalSearchConfiguration } from '../../types/Configuration';
import { DropdownComponent } from '../../types/DropdownComponent';

/**
 * Configuration for selection
 */
export interface ConfigurationSelectorConfiguration {
    configurations: NaturalSearchConfiguration;
}

@Component({
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements DropdownComponent {
    // Never has a real value
    public renderedValue = new BehaviorSubject<string>('');

    public configurations: NaturalSearchConfiguration;

    public selection;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) data: NaturalDropdownData,
                protected dropdownRef: NaturalDropdownRef) {
        this.configurations = (data.configuration as ConfigurationSelectorConfiguration).configurations;
    }

    /**
     * Get value, including rich object types
     */
    public getCondition(): FilterGroupConditionField {
        return {};
    }

    /**
     * Allow to close the dropdown with a valid value
     */
    public close(): void {
        if (this.selection) {
            this.dropdownRef.close({
                condition: {},
                configuration: this.selection,
            });
        }
    }

    public isValid(): boolean {
        return !!this.selection;
    }

    public isDirty(): boolean {
        return true;
    }

}
