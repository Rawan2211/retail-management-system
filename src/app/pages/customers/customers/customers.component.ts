import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersRepository } from 'src/app/domain/customers/customers.repository';
import { Customers } from 'src/app/domain/customers/models/cutomers';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  allCustomers: Customers[] = [];
  customersForm!: FormGroup;
  submit: boolean = false;

constructor(private build: FormBuilder,     private _snackBar: MatSnackBar
,private customersRepository: CustomersRepository
  ){

  }

  ngOnInit(){
    this.custForm();
    this.getAllCustomers();

  }

  getAllCustomers(): void {
    console.log("customers");

    this.customersRepository.getList().subscribe((result:any) => {
      this.allCustomers = result;
      console.log(this.allCustomers);
    });
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
    this.submit = true;
    this.customersRepository.add(this.customersForm.value).subscribe(
      () => {
        this.getAllCustomers();
        this.submit = false;
        console.log("Added");

      },
      () => {
        this.submit = false;
      }
    );
  }
  onSubmit() {
    this.customersForm.markAllAsTouched();
    if (this.customersForm.valid) {
      this.customersForm.controls['id'].value
        ? console.log("update")
        : this.addCustomer();
    }
  }

}
