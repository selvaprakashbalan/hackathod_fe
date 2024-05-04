import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private messageService: MessageService
  ) { }

  showSuccess(msg: string) {
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: msg });
  }

  showError(msg: string) {
    this.messageService.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: msg });
}



}
