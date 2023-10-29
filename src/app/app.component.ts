import {Component} from '@angular/core';
import {NgbDate, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'technologies';
    closeResult = '';
    form = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        email: [null, [Validators.required, Validators.email]],
        mobile: [null, Validators.required],
        date: [null, Validators.required]
    });
    nextDays: {day: number, name: string}[] = [];
    constructor(private modalService: NgbModal, private fb: FormBuilder) {
    }

    open(content: any): void {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {}
        );
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
        console.log(this.form.value);
    }

    test() {
        console.log(this.form.get('email')?.errors);
    }

    onDateSelected(ngbDate: NgbDate) {
        const date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
        console.log(date);

        for (let i = 0; i < 7; i++) {
            const nextDay = this.getNextDay(date);
            this.nextDays.push({day: nextDay.getDate(), name: nextDay.toLocaleDateString('en-US', { weekday: 'long' })});
        }

        console.log(this.nextDays);
    }

    getNextDay(date: Date) {
        const dayAhead = date.setDate(date.getDate() + 1);
        return new Date(dayAhead);
    }
}
