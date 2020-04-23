import { Component, OnInit } from '@angular/core';
import { PlanService } from './services/plan.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'holiday';
  myForm: FormGroup;
  submitted = false;
  loading = false; 
  constructor(public planService: PlanService, public fb: FormBuilder) {

  }

  ngOnInit() { 
    this.reactiveForm();
    this.planService.getPlans()
      .subscribe(res => {
        console.log(res);
      })
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      area: [''],
      country: [''],
      whyGo: [''],
      wheretoGo: [''],
      timeInDays: [''],
      levelofDifficulty: [''],
      entraceFees: ['']
    })
  }

  submitForm() {
    console.log(this.myForm.value);
    this.planService.createPlan(this.myForm.value)
      .subscribe(res => {
        console.log(res);
      });
  }
}
