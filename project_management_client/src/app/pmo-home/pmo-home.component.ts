import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { UtilService } from '../core/util/util.service';
import { ApiList } from '../core/variables/api-list';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-pmo-home',
  templateUrl: './pmo-home.component.html',
  styleUrls: ['./pmo-home.component.scss']
})
export class PmoHomeComponent {

  customTaskForm: boolean = false;
  taskForm: FormGroup

  projectId: any;
  teamDetails: any;
  priorityList: any;
  teamMembers: any;
  taskDetails: any;
  

  constructor(
    private router: Router,
    private apiService: ServiceService,
    private utilService: UtilService,
    private fb: FormBuilder,

  ) {

    this.taskForm = this.fb.group({
      task: [''],
      description: [''],
      dueDate: [''],
      priorityId: [''],
      empId:['']
    })

  }

  get form() {
    return this.taskForm.controls;
  }

 


  ngOnInit() { 
    this.projectId = localStorage.getItem('id');
    this.getTeamDetails(this.projectId)
    this.getPriorityList();
    this.getTaskDetails(); 
  }

  getPriorityList() {
    this.apiService.get(ApiList.getPriorityList).subscribe({
      next:(res:any) => {
        if(res.status) {
          this.priorityList = res.data
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }


  logout() {
    this.router.navigate(['']);
  }

  getTeamDetails(id: number){
    this.apiService.getById(ApiList.getTeamDetails,id).subscribe({
      next:(res:any) => {
        if(res.status) {
          this.teamDetails = res.data
          this.teamMembers = res.data[0].teamMembers

          this.teamMembers.forEach((member: any) => {
            member.fullName = `${member.name} - ${member.designation}`;
          });
  
          console.log('this.teamDetails',this.teamDetails);
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

  createTask() {
    this.customTaskForm = true;

  }

  cancelForm() {

  }

  taskSaveData() {
    let data = this.taskForm.value
    data['progressId'] = 2;
    data['proId'] = this.projectId;
    data['dueDate'] = moment(data.dueDate).format('YYYY-MM-DD');
    console.log('data',data);
    this.apiService.post(ApiList.taskSaveData, data).subscribe({
      next:(res: any) => {
        if(res.status) {
          this.utilService.showSuccess(res.message)
          this.customTaskForm = false;
          this.taskForm.reset();
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

  getTaskDetails() {
    this.apiService.getById(ApiList.getTaskDetails,this.projectId).subscribe({
      next:(res:any) => {
        if(res.status) {
          this.taskDetails = res.data
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

}
