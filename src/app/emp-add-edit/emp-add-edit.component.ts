import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit {

  empform: FormGroup;

  education: string[] = [
    'Matric',
    'graduate',
    'postgrad',
  ];

  constructor(private _fb: FormBuilder, 
    private _empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.empform = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      education: '',
      company: '',
      experience: '',
      package: '',
      gender: '',
    });
  }

ngOnInit(): void {
  this.empform.patchValue(this.data);
}

  onFormSubmit()
  {
    if(this.empform.valid)
    {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empform.value)
          .subscribe({
            next: (val: any) => {
              alert("employee updated");
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
      else
      {
      this._empService.addEmployee(this.empform.value).subscribe(
        {
          next: (val:any)=>
          {
            alert("Employee added successfully");
            this.dialogRef.close(true);
          },
          error: (err:any)=>
          {
            console.error(err)
          }
        }
      );
    }
  }
}
}
