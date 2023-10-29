import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {CountryISO, SearchCountryField} from "ngx-intl-tel-input";
import {Store} from "@ngrx/store";
import {selectUser} from "./user.selector";
import {addUser, deleteUser} from "./user.actions";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'technologies';
    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        email: ['', [Validators.required, Validators.email]],
        mobile: [null, [Validators.required]],
        date: [null, Validators.required]
    });    protected readonly CountryISO = CountryISO;
    protected readonly SearchCountryField = SearchCountryField;
    nextDays: {day: number, name: string}[] = [];
    users= this.store.select(selectUser);
    modalRef!: NgbModalRef;

    constructor(private modalService: NgbModal, private fb: FormBuilder, private store: Store) {
    }

    open(content: any): void {
        this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    isDisabled(date: NgbDate): boolean {
        return date.day === 11 || date.day === 12
    }

    validateForms(): void {
        Object.values(this.form.controls).forEach(control => {
            if (control.invalid) {
                control.markAsTouched();
                control.updateValueAndValidity({ onlySelf: true });
            }
        });

    }

    onSubmit(): void {
        this.validateForms();

        if (this.form.invalid) { return; }

        const date = this.createDateFromNgbDate(this.form.get('date')?.value);
        const mobile: string = this.form.get('mobile')?.value?.['number'] || '';

        this.store.dispatch(addUser({
            mobile: mobile,
            date: date,
            email: this.form.get('email')?.value || '',
            name: this.form.get('name')?.value || ''
        }));

        this.form.reset();
        this.nextDays = [];
        this.modalRef.close();

    }

    onDateSelected(ngbDate: NgbDate) {
        const date = this.createDateFromNgbDate(ngbDate);
        this.nextDays = [];

        for (let i = 0; i < 7; i++) {
            const nextDay = this.getNextDay(date);
            this.nextDays.push({day: nextDay.getDate(), name: nextDay.toLocaleDateString('en-US', { weekday: 'long' })});
        }
    }

    getNextDay(date: Date) {
        const dayAhead = date.setDate(date.getDate() + 1);
        return new Date(dayAhead);
    }

    createDateFromNgbDate(ngbDate: NgbDate | any) {
        return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day)
    }

    onDeleteUser(index: number) {
        this.store.dispatch(deleteUser( { userIndex: index }));
    }
}
