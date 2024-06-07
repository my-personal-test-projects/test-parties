import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import Swal from 'sweetalert2';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  id: any;
  action: any;
  selectedFile: any;
  imageURl: any;

  addressLabelFlag: boolean = true;
  bankLabelFlag: boolean = true;

  public form: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.activeRoute.params.subscribe((r) => {
      this.id = r['id'];
      this.action = r['action'];
    });

    this.form = this.formBuilder.group({
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

      address: this.formBuilder.array([]),
      bank: this.formBuilder.array([]),
    });

    this.getData();
  }


  getData() {
    this.service.getpartybyid(this.id).subscribe((res: any) => {
      this.form.patchValue({
        name: res.name,
        company_name: res.company_name,
        mobile_no: res.mobile_no,
        telephone_no: res.telephone_no,
        whatsapp_no: res.whatsapp_no,
        email: res.email,
        remark: res.remark,
        date_of_birth: res.date_of_birth,
        anniversary_date: res.anniversary_date,
        gstin: res.gstin,
        pan_no: res.pan_no,
        apply_tds: res.apply_tds,
        credit_limit: res.credit_limit,
        is_active: res.is_active,
        login_access: res.login_access,
        // image :res.image
      });
      this.imageURl = 'https://ap.greatfuturetechno.com' + res.image;
      if (res.address.length != 0) {
        this.addressLabelFlag = false;
        for (let i = 0; i < res.address.length; i++) {
          this.addNewAddress();

          const addressArray = this.form.controls['address'] as FormArray;
          const addressFormGroup = addressArray.at(i) as FormGroup;

          addressFormGroup.patchValue({
            address1: res.address[i].address1,
            address2: res.address[i].address2,
            country: res.address[i].country,
            state: res.address[i].state,
            city: res.address[i].city,
            pincode: res.address[i].pincode,
            id: res.address[i].id,
          });
        }
      }

      if (res.bank_id.length != 0) {
        this.bankLabelFlag = false;
        for (let i = 0; i < res.bank_id.length; i++) {
          this.addNewBank();

          const array = this.form.controls['bank'] as FormArray;
          const bankFormGroup = array.at(i) as FormGroup;

          bankFormGroup.patchValue({
            id: res.bank_id[i].id,
            bank_ifsc_code: res.bank_id[i].bank_ifsc_code,
            bank_name: res.bank_id[i].bank_name,
            branch_name: res.bank_id[i].branch_name,
            account_no: res.bank_id[i].account_no,
            account_holder_name: res.bank_id[i].account_holder_name,
          });
        }
      }
      this.toggleFormControls();
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.patchValue({
        image: file,
      });
    }
  }

  get addressControls(): FormGroup[] {
    return (this.form.get('address') as FormArray).controls as FormGroup[];
  }

  get bankControls(): FormGroup[] {
    return (this.form.get('bank') as FormArray).controls as FormGroup[];
  }

  createAddressGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      address_line_1: [''],
      address_line_2: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: [''],
    });
  }

  addNewAddress(): void {
    (this.form.get('address') as FormArray).push(this.createAddressGroup());
  }

  addNewBank(): void {
    (this.form.get('bank') as FormArray).push(this.createBankGroup());
  }

  createBankGroup() {
    return this.formBuilder.group({
      id: [''],
      bank_ifsc_code: [''],
      bank_name: [''],
      branch_name: [''],
      account_no: [''],
      account_holder_name: [''],
    });
  }

  backButton() {
    this.router.navigate([`pages/parties`]);
  }

  delete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.value) {
        this.service.delete(this.id).subscribe(
          (res: any) => {
            if (res.success) {
              this.backButton();
              this.toastr.success(res.msg);
            } else {
              this.toastr.error(res.msg);
            }
          },
          (err: any) => {}
        );
      }
    });
  }

  update() {

    if (this.form.invalid) {
      return;
    }
    else {
    var address: any = [];
    const addressArray = this.form.get('address') as FormArray;
    addressArray.controls.forEach((group, index) => {
      address.push(group.value);
    });

    var bank: any = [];
    const backArray = this.form.get('bank') as FormArray;
    backArray.controls.forEach((group, index) => {
      bank.push(group.value);
    });

    const formData = new FormData();
    formData.append('id', this.id);

    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('name', this.form.get('name')?.value);
    formData.append('company_name', this.form.get('company_name')?.value);
    formData.append('mobile_no', this.form.get('mobile_no')?.value);
    formData.append('telephone_no', this.form.get('telephone_no')?.value);
    formData.append('whatsapp_no', this.form.get('whatsapp_no')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('remark', this.form.get('remark')?.value);
    formData.append('login_access', this.form.get('login_access')?.value);
    formData.append('date_of_birth', this.form.get('date_of_birth')?.value);
    formData.append(
      'anniversary_date',
      this.form.get('anniversary_date')?.value
    );
    formData.append('gstin', this.form.get('gstin')?.value);
    formData.append('pan_no', this.form.get('pan_no')?.value);
    formData.append('apply_tds', this.form.get('apply_tds')?.value);
    formData.append('credit_limit', this.form.get('credit_limit')?.value);

    formData.append('address', address ? JSON.stringify(address) : '');
    formData.append('bank', bank ? JSON.stringify(bank) : '');

    this.service.update(this.id, formData).subscribe((res: any) => {
      if (res.success) {
        this.backButton();
        this.toastr.success(res.msg);
      } else {
        this.toastr.error(res.msg);
      }
    });
  }
  }

  toggleFormControls() {
    if (this.action === 'Edit') {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
}
