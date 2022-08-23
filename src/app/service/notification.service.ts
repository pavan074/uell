import {Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable, BehaviorSubject} from 'rxjs';

//Component
import {ModalComponent} from '../component/modal/modal.component';
import {ModalConfirmComponent} from '../component/modal/modal-confirm.component';

//Interface
import {Notification} from '../interface/notification.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notification: Notification;
    
    constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {}  
    
    public notify(notification: Notification) {  
        
        if(this.dialog.openDialogs.length == 0){
            let dialogRef = this.dialog.open(ModalComponent, {
                //width: '50%',
                data: { dialogTitle: notification.title, dialogContent: notification.content }
            });

            dialogRef.afterClosed().subscribe(result => {
                //console.log('The dialog was closed');
            });
        }
    } 
    
    public notifyConfirm(notification: Notification): BehaviorSubject<Boolean> {  
        var response$ = new BehaviorSubject<Boolean>(false);

        if(this.dialog.openDialogs.length == 0){
            let dialogRef = this.dialog.open(ModalConfirmComponent, {
                //width: '50%',
                data: { dialogTitle: notification.title, dialogContent: notification.content }
            });

            dialogRef.afterClosed().subscribe(result => {
                response$.next(result);
            });
        }

        return response$;
    } 
    
    public notifySnackBar(notification: Notification) {   
        this.snackBar.open(notification.title, notification.content, { duration: 5000,});
    }
    
}