import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRippleModule,
} from '@angular/material';
import { NaturalSelectModule } from '../select/select.module';
import { ConfigurationSelectorComponent } from './dropdown-components/configuration-selector/configuration-selector.component';
import { TypeDateRangeComponent } from './dropdown-components/type-date-range/type-date-range.component';
import { TypeNumericRangeComponent } from './dropdown-components/type-numeric-range/type-numeric-range.component';
import { TypeNumericComponent } from './dropdown-components/type-numeric/type-numeric.component';
import { TypeSelectComponent } from './dropdown-components/type-select/type-select.component';
import { TypeTextComponent } from './dropdown-components/type-text/type-text.component';
import { NaturalDropdownContainerComponent } from './dropdown-container/dropdown-container.component';
import { NaturalGroupComponent } from './group/group.component';
import { NaturalInputComponent } from './input/input.component';
import { TypeNaturalSelectComponent } from './dropdown-components/type-natural-search/type-natural-select.component';
import { NaturalSearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        NaturalSearchComponent,
        NaturalGroupComponent,
        NaturalInputComponent,
        NaturalDropdownContainerComponent,
        TypeNumericComponent,
        ConfigurationSelectorComponent,
        TypeSelectComponent,
        TypeNumericRangeComponent,
        TypeDateRangeComponent,
        TypeNaturalSelectComponent,
        TypeTextComponent
    ],
    entryComponents: [
        NaturalDropdownContainerComponent,
        ConfigurationSelectorComponent,
        TypeNumericComponent,
        TypeSelectComponent,
        TypeNumericRangeComponent,
        TypeDateRangeComponent,
        TypeNaturalSelectComponent,
        TypeTextComponent
    ],
    exports: [
        NaturalDropdownContainerComponent,
        NaturalSearchComponent,
        TypeNumericComponent,
        TypeSelectComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatRippleModule,
        PortalModule,
        OverlayModule,
        MatDialogModule,
        MatListModule,
        MatDatepickerModule,
        NaturalSelectModule,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
    ],
})
export class NaturalSearchModule {
}
