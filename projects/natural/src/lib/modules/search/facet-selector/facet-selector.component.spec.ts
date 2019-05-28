import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetSelectorComponent } from './facet-selector.component';
import { MatFormFieldModule, MatListModule } from '@angular/material';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownData } from '../../search/dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../search/dropdown-container/dropdown-ref';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FacetSelectorComponent', () => {
    let component: FacetSelectorComponent;
    let fixture: ComponentFixture<FacetSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FacetSelectorComponent],
            imports: [
                MatListModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
            ],
            providers: [
                {
                    provide: NATURAL_DROPDOWN_DATA,
                    useValue: {
                        condition: {},
                        configuration: {
                            configurations: [],
                        },
                    } as NaturalDropdownData,
                },
                {
                    provide: NaturalDropdownRef,
                    useValue: {},
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FacetSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});