import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    OverlayPanelModule,
    ConfirmPopupModule,
    InputTextareaModule,
    TableModule
  ],
  exports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    OverlayPanelModule,
    ConfirmPopupModule,
    InputTextareaModule,
    TableModule
  ]
})
export class SharedModule { }
