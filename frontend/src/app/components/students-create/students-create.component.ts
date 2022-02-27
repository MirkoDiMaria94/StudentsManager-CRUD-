import { Router } from '@angular/router';
import { Component, OnInit,NgZone } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-students-create',
  templateUrl: './students-create.component.html',
  styleUrls: ['./students-create.component.scss']
})
export class StudentsCreateComponent implements OnInit {
  submitted = false;
  studentForm: FormGroup;
  StudentsProfile:any = ['Informatica', 'Elettrotecnica','Biologia']
 
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      fieldOfStudy: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  updateProfile(e){
    this.studentForm.get('fieldOfStudy').setValue(e, {
      onlySelf: true
    })
  }

  // Getter per accedere al controllo del modulo
  get myForm(){
    return this.studentForm.controls;
  }

  onSubmit() {
    console.log('test')
    this.submitted = true;
    if (!this.studentForm.valid) {
      console.log('form non valido');
      return false;
    } else {
      this.apiService.createStudent(this.studentForm.value).subscribe(
        (res) => {
          console.log('Studente creato con successo')
          this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}


