import { Student} from '../../../model/Student';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/service/api.service';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.scss']
})

export class StudentsEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  studentData: Student[];
  StudentsProfile:any = ['Informatica', 'Elettrotecnica','Biologia']
 
 
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateStudent();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getstudent(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      fieldOfStudy: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }


  // Getter per accedere al controllo del modulo
  get myForm() {
    return this.editForm.controls;
  }


  updateProfile(e){
    this.editForm.get('fieldOfStudy').setValue(e, {
      onlySelf: true
    })
  }

  getstudent(id) {
    this.apiService.getStudent(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        surname: data['surname'],
        fieldOfStudy: data['fieldOfStudy'],
        email: data['email'],
        dateOfBirth: data['dateOfBirth'],
        phoneNumber: data['phoneNumber'],
      });
    });
  }

  updateStudent() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      fieldOfStudy: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Sei siucuro di aggiornare lo studente?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateStudent(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/students-list');
            console.log('Contenuto aggiornato correttamente!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}