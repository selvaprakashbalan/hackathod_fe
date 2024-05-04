import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ApiList } from '../core/variables/api-list';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  projectForm: FormGroup
  visible: boolean = false;

  empList: any[] = []
  pmoList: any[] = []
  tLList: any[] = []
  
  roleResponse!: number
  modifiedValue!: string
  storedValue!: any

  constructor(
    private apiService: ServiceService,
    private fb: FormBuilder,
  ) {

    this.projectForm = this.fb.group({
      proName: [''],
      tlId: [''],
      proId: [''],
      empId: [''],
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
    this.visible = true;
    this.projectForm.reset();
  }

  saveProject() {
    let data = this.projectForm.value
    console.log('data',data);
  }

}
