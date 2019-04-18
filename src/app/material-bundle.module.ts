import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatDialogModule,
    MatDividerModule,
    MatBadgeModule,
    MatTabsModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatMenuModule,
    MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';


@NgModule({
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatSortModule,
        MatDialogModule,
        MatDividerModule,
        MatMenuModule,
        MatBadgeModule,
        MatSelectModule,
        MatTabsModule,
        MatStepperModule,
        MatBottomSheetModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        LayoutModule,
        FormsModule,
        ReactiveFormsModule,
        CdkStepperModule,
    ]
})

export class MaterialBundleModule { }
