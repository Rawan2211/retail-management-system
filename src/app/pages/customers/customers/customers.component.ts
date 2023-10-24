import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersRepository } from 'src/app/domain/customers/customers.repository';
import { Customers } from 'src/app/domain/customers/models/cutomers';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  allCustomers: Customers[] = [];
  customersForm!: FormGroup;
  submit: boolean = false;
  currentData!: Customers;
  isButtonVisible: boolean = true;
  displayedColumns: string[] = [
    'id',
    'fullName',
    'nickName',
    'customerCode',
    'version',
    'nationalId',
    'primaryPhoneNo',
    'secondaryPhoneNo',
    'address',
    'trustReceiptNo',
    'actions',
    'delete'
  ];

  constructor(
    private build: FormBuilder,
    private _snackBar: MatSnackBar,
    private customersRepository: CustomersRepository
  ) {}

  ngOnInit() {
    this.custForm();
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customersRepository.getList().subscribe((result: any) => {
      this.allCustomers = result;
    });
  }
  restartForm(): void {
    this.customersForm.reset();
  }
  custForm() {
    this.customersForm = this.build.group({
      id: [''],
      fullName: ['', [Validators.required]],
      nickName: [''],
      customerCode: [''],
      version: [''],
      nationalId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,14}$'),
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      primaryPhoneNo: [
        '',
        [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')],
      ],
      secondaryPhoneNo: ['', [Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]],
      address: ['', [Validators.required]],
      trustReceiptNo: [''],
    });
  }

  addCustomer() {
    this.customersRepository.add(this.customersForm.value).subscribe(_=>
      {
        this.getAllCustomers();
      }
    );
  }

  fetchData(customer: Customers): void {
    this.isButtonVisible = false;
    this.customersForm.patchValue(customer);
    this.currentData = customer;
  }

  deleteCustomer(customer: Customers) {
    this.customersRepository.delete(customer.id).subscribe(() => {
      this.getAllCustomers();
    });
  }

  updateCustomer() {
    this.customersRepository.update(this.customersForm.value).subscribe(
      () => {
        this.getAllCustomers();
      },
    );
  }

  onSubmit() {
    this.customersForm.markAllAsTouched();
    if (this.customersForm.valid) {
      this.customersForm.controls['id'].value
        ? (this.updateCustomer())
        : (this.addCustomer());
    }
  }
}
