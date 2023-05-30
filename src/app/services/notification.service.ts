import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";


@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private messageService : MessageService) { }

  onSuccess(key: string, summary: string, detail: string): void{
    this.messageService.add({key: key,severity: Severity.SUCCESS, summary: summary, detail: detail});
  }

  onInfo(summary: string, detail: string): void {
    this.messageService.add({severity: Severity.INFO, summary: summary, detail: detail});
  }

  onWarning(summary: string, detail: string): void {
    this.messageService.add({severity: Severity.WARNING, summary: summary, detail: detail});
  }

  onError(key: string, summary: string, detail: string): void {
    console.log(summary);
    this.messageService.add({key: key, severity: Severity.ERROR, summary: summary, detail: detail});
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});

  }
}

enum Severity { SUCCESS = 'success', INFO = 'info', WARNING = 'warn', ERROR = 'error'}
