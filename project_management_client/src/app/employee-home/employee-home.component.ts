import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { UtilService } from '../core/util/util.service';
import { ApiList } from '../core/variables/api-list';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent {

  customDialog: boolean= false

  teamDetails: any;
  teamMembers: any;
  taskDetails: any;
  proId: any;
  empId: any;
  statusId: any;

  cols = [
    { field: 'task', header: 'Task' },
    { field: 'description', header: 'Description' },
    { field: 'assigned', header: 'Assigned By' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'priority', header: 'Priority' },
    { field: 'progress', header: 'Progress' }
  ]

  constructor(
    private router: Router,
    private apiService: ServiceService,
    private utilService: UtilService
  ) { }

  ngOnInit() { 
    const storedValue = localStorage.getItem('data');

    if (storedValue !== null) {
      const parsedValue = JSON.parse(storedValue);
      if (Array.isArray(parsedValue)) {
        this.proId = parsedValue[0]?.proId;
        this.empId = parsedValue[0]?.empId;
      }
    }

    this.getTeamDetails(this.proId);
    this.getEmpTaskDetails(this.empId);
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

  getEmpTaskDetails(id: number) {
    this.apiService.getById(ApiList.getEmpTaskDetails,id).subscribe({
      next:(res:any) => {
        if(res.status) {
          this.taskDetails = res.data
          console.log('this.taskDetails',this.taskDetails);
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

  openDialog(data:any) {
    if(data.progress == 'To Do') {
      this.customDialog = true;
    }
    this.statusId = data.id
    
  }

  saveProgressId() {
   this.apiService.getById(ApiList.saveProgressId,this.statusId).subscribe({
     next:(res:any) => {
       if(res.status) {
         this.customDialog = false;
         this.utilService.showSuccess(res.message)
         this.ngOnInit();
       }
     }, error: (err: HttpErrorResponse) => {
       this.utilService.showError(err.error.message)
     }
   })

  }

  cancelForm() {
    this.customDialog = false;

  }

}
