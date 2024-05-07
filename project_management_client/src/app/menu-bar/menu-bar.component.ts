import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ApiList } from '../core/variables/api-list';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment'; 
import { UtilService } from '../core/util/util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IMaster } from '../core/variables/interface';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  projectForm: FormGroup
  customProject: boolean = false;
  editProjectForm: boolean = false;

  empList: Array<IMaster> = [];
  pmoList: Array<IMaster> = [];
  tLList: Array<IMaster> = [];
  projectDetails: any[] = []
  pmoProjectDetails: any
  empProjectDetails: any
  
  roleResponse!: number
  id!: number
  modifiedValue!: string
  storedValue!: any

  currentDate = new Date();
  startedDate!: any;

  constructor(
    private apiService: ServiceService,
    private fb: FormBuilder,
    private router: Router,
    private utilService: UtilService
  ) {

    this.projectForm = this.fb.group({
      proName: [''],
      tlId: [''],
      pmoId: [''],
      empId: [''],
      startDate: [''],
      dueDate: [''],
    })

  }

  get form() {
    return this.projectForm.controls;
  }


  ngOnInit() {
    const storedValue = localStorage.getItem('roleResponse');
    if (storedValue !== null) {
      const parsedValue = JSON.parse(storedValue);
      if (Array.isArray(parsedValue)) {
        this.roleResponse = parsedValue[0]?.roleId;
        this.id = parsedValue[0]?.id;
        this.modifiedValue = parsedValue.map((item: { name: string; }) => {
          return item.name.charAt(0);
        })[0];
      }
    }
    
    this.getMasterList();
    this.getProjectDetails();
    this.getPmoProjectDetails(this.id);
    this.getEmpProjectDetails(this.id);
  }

  getMasterList() {
    this.apiService.get(ApiList.getMasterList).subscribe({
      next:(res:any) => {
      if(res.status) {
      this.empList = res.data.empList
      this.pmoList = res.data.pmoList
      this.tLList = res.data.tLList
      }
      }
    })
  }


  showDialog() {
    this.customProject = true;
    this.projectForm.reset();
  }

  saveProject() {
    let data = this.projectForm.value
    data.startDate = moment(data.startDate).format('YYYY-MM-DD');
    data.dueDate = moment(data.dueDate).format('YYYY-MM-DD');
    this.apiService.post(ApiList.projectSaveData,data).subscribe({
      next:(res: any) => {
        if(res.status) {
          this.utilService.showSuccess(res.message)
          this.customProject = false;
          this.projectForm.reset();
          this.getProjectDetails();
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

  logout() {
    this.router.navigate(['']);
  }

  getProjectDetails() {
    this.apiService.get(ApiList.getProjectDetails).subscribe({
      next:(res:any) => {
        if(res.status) {
          this.projectDetails = res.data
        }
      }, error: (err: HttpErrorResponse) => { 
        this.utilService.showError(err.error.message)
      }
    })
  }


  getPmoProjectDetails(id: number){
    this.apiService.getById(ApiList.getPmoProjectDetails,id).subscribe({
      next:(res:any) => {
        if(res.status) {
          this.pmoProjectDetails = res.data
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

  getEmpProjectDetails(id: number){
    this.apiService.getById(ApiList.getEmpProjectDetails,id).subscribe({
      next:(res:any) => {
        if(res.status) {
          this.empProjectDetails = res.data
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

  editForm(id: number) {
    const projectToEdit = this.projectDetails.find(project => project.id === id);
    if (projectToEdit) {
      this.editProjectForm = true;
      this.customProject = true;
      this.projectForm.patchValue({
        proName: projectToEdit.proName,
        startDate:  moment(projectToEdit.startDate).format('DD/MM/YYYY'),
        dueDate:  moment(projectToEdit.dueDate).format('DD/MM/YYYY'),
        tlId: projectToEdit.tlId,
        pmoId: projectToEdit.pmoId,
        empId: projectToEdit.empId,
      });
    } 
  }

  cancelForm() {
    this.customProject = false;
  }

  teamDetails(id: number) {
    let data = [
      {
        proId: id,
        empId: this.id
      }
    ]
    localStorage.setItem('data',JSON.stringify(data));
    this.router.navigate(['pmo']);
  }

  taskDetails(id: number) {
    let data = [
      {
        proId: id,
        empId: this.id
      }
    ]
    localStorage.setItem('data',JSON.stringify(data));
    this.router.navigate(['employee']);
  }

  event(event: Event) {
    this.startedDate = event;
  }

}
