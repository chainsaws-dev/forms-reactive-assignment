import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  OptionArray = ['Stable', 'Critical', 'Finished'];
  ProjectForm: FormGroup;
  ForbiddenArray = ['Test'];
  ProjectNameMessage: string;

  ngOnInit(): void {
    this.ProjectForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required], this.ValidateCustomAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectstatus': new FormControl('Stable')
    });
  }

  OnSubmitForm() {
    console.log(this.ProjectForm);
  }

  ValidateControl(ControlName: string) {
    if (this.ProjectForm.get('projectname').getError('NameIsForbidden')) {
      this.ProjectNameMessage = 'Name Test is not allowed!';
    } else {
      this.ProjectNameMessage = 'Please enter valid project name!';
    }

    return this.ProjectForm.get(ControlName).invalid && this.ProjectForm.get(ControlName).touched;
  }

  ValidateCustom(Control: FormControl): { [s: string]: boolean } {
    if (this.ForbiddenArray.indexOf(Control.value) !== -1) {
      return { 'NameIsForbidden': true };
    }
    return null;
  }

  ValidateCustomAsync(Control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.ForbiddenArray.indexOf(Control.value) !== -1) {
          resolve({ 'NameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
