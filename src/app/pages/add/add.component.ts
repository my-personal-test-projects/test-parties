import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  createForm: FormGroup;
  selectedFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ServiceService,
    private toastr: ToastrService
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      mobile_no: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      telephone_no: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      whatsapp_no: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      remark: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      anniversary_date: ['', [Validators.required]],
      gstin: ['', [Validators.pattern('^[A-Z]{5}[0-9]{5}[A-Z]$')]],
      pan_no: [
        '',
        [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
      ],
      apply_tds: ['', [Validators.required]],
      credit_limit: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      login_access: ['', [Validators.required]],
      image: ['', [Validators.required, this.fileValidator]],

      address: this.formBuilder.array([this.createAddressGroup()]),
      bank: this.formBuilder.array([this.createBankGroup()]),
    });
  }

  fileValidator(control: { value: any }) {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        return {
          invalidFileType: true,
        };
      }
    }
    return null;
  }

  get addressControls(): FormGroup[] {
    return (this.createForm.get('address') as FormArray)
      .controls as FormGroup[];
  }

  get bankControls(): FormGroup[] {
    return (this.createForm.get('bank') as FormArray).controls as FormGroup[];
  }

  createAddressGroup(): FormGroup {
    return this.formBuilder.group({
      address_line_1: [''],
      address_line_2: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: [''],
    });
  }

  addNewAddress(): void {
    (this.createForm.get('address') as FormArray).push(
      this.createAddressGroup()
    );
  }

  addNewBank(): void {
    (this.createForm.get('bank') as FormArray).push(this.createBankGroup());
  }

  createBankGroup() {
    return this.formBuilder.group({
      bank_ifsc_code: [''],
      bank_name: [''],
      branch_name: [''],
      account_no: [''],
      account_holder_name: [''],
      pincode: [''],
    });
  }

  backButton() {
    this.router.navigate([`pages/parties`]);
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.createForm.patchValue({
        image: input.files[0],
      });
    }
  }

  create() {

    if (this.createForm.invalid) {
      return;
    }
    else {


    var address: any = [];
    const addressArray = this.createForm.get('address') as FormArray;
    addressArray.controls.forEach((group, index) => {
      address.push(group.value);
    });

    var bank: any = [];
    const backArray = this.createForm.get('bank') as FormArray;
    backArray.controls.forEach((group, index) => {
      bank.push(group.value);
    });

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('name', this.createForm.get('name')?.value);
    formData.append('company_name', this.createForm.get('company_name')?.value);
    formData.append('mobile_no', this.createForm.get('mobile_no')?.value);
    formData.append('telephone_no', this.createForm.get('telephone_no')?.value);
    formData.append('whatsapp_no', this.createForm.get('whatsapp_no')?.value);
    formData.append('email', this.createForm.get('email')?.value);
    formData.append('remark', this.createForm.get('remark')?.value);
    formData.append('login_access', this.createForm.get('login_access')?.value);
    formData.append(
      'date_of_birth',
      this.createForm.get('date_of_birth')?.value
    );
    formData.append(
      'anniversary_date',
      this.createForm.get('anniversary_date')?.value
    );
    formData.append('gstin', this.createForm.get('gstin')?.value);
    formData.append('pan_no', this.createForm.get('pan_no')?.value);
    formData.append('apply_tds', this.createForm.get('apply_tds')?.value);
    formData.append('credit_limit', this.createForm.get('credit_limit')?.value);

    formData.append('address', address ? JSON.stringify(address) : '');
    formData.append('bank', bank ? JSON.stringify(bank) : '');

    this.service.create(formData).subscribe((res: any) => {
      if (res.success) {
        this.backButton();
        this.toastr.success(res.msg);
      } else {
        this.toastr.error(res.msg);
      }
    });
  }
}
}
