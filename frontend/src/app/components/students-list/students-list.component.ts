
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {
  
  Student:any = [];

  constructor(private apiService: ApiService) { 
    this.readStudents();
  }

  ngOnInit() {}

  readStudents(){
    this.apiService.getStudents().subscribe((data) => {
     this.Student = data;
    })    
  }

  removeStudent(student, index) {
    if(window.confirm('Sei sicuro di eliminare lo studente ?')) {
        this.apiService.deleteStudent(student._id).subscribe((data) => {
          this.Student.splice(index, 1);
        }
      )    
    }
  }

}