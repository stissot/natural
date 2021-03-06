import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatCommonModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NATURAL_DROPDOWN_CONTAINER_DATA, NaturalDropdownContainerComponent } from './dropdown-container.component';

describe('NaturalDropdownContainerComponent', () => {
    let component: NaturalDropdownContainerComponent;
    let fixture: ComponentFixture<NaturalDropdownContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NaturalDropdownContainerComponent],
            imports: [
                NoopAnimationsModule,
                CommonModule,
                OverlayModule,
                PortalModule,
                MatCommonModule,
                MatCheckboxModule,
            ],
            providers: [
                {
                    provide: NATURAL_DROPDOWN_CONTAINER_DATA,
                    useValue: {},
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NaturalDropdownContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
