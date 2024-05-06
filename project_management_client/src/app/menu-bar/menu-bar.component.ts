import { Component, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ApiList } from '../core/variables/api-list';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment'; 
import { UtilService } from '../core/util/util.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  projectForm: FormGroup
  customProject: boolean = false;
  editProjectForm: boolean = false;
  saveData: any;

  empList: any[] = []
  pmoList: any[] = []
  tLList: any[] = []
  projectDetails: any[] = []
  
  roleResponse!: number
  modifiedValue!: string
  storedValue!: any

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
      this.roleResponse = parsedValue[0].roleId;
      this.modifiedValue = parsedValue.map((item: { name: string; }) => {
        return item.name.charAt(0);
      })[0];    
    }
    
    this.getMasterList();
    this.getProjectDetails();
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
    console.log('data',data);
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
          console.log('this.projectDetails',this.projectDetails);
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.showError(err.error.message)
      }
    })
  }

  editForm(id: number) {
    console.log('id',id);
    console.log('this.projectDetails',this.projectDetails);
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
      console.log('this.projectForm',this.projectForm.value);
    } 
  }

  cancelForm() {
    this.customProject = false;
  }

}
