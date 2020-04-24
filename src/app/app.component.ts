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

  allPlans = [];
  plans = [];
  selectedPlan = false;
  selectedPlanId = "";
  area = "";
  constructor(public planService: PlanService, public fb: FormBuilder) {

  }

  ngOnInit() { 
    this.reactiveForm();
    this.planService.getPlans()
      .subscribe(res => {
        this.allPlans = res;
        this.plans = res;
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
      entraceFees: [''],
      image: ['']
    })
  }

  submitForm() {
    if (this.myForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    this.planService.createPlan(this.myForm.value)
      .subscribe(res => {
        this.loading = false;
        this.submitted = false;
        this.plans.push(res);
        this.reactiveForm();
      });
  }
  editPlan(i) {
    this.selectedPlan = true;
    this.selectedPlanId = this.plans[i]._id;
    this.myForm.patchValue(this.plans[i]);

    
  }
  deletePlan(i) {
    let plan_id = this.plans[i]._id;
    this.plans.splice(i, 1);
    this.planService.deletePlan(plan_id)
      .subscribe(res => {
        this.reactiveForm();
      });
  }
  updatePlan() {
    this.planService.updatePlan(this.myForm.value, this.selectedPlanId)
      .subscribe(res => {
        let index = this.plans.findIndex(item => item._id == this.selectedPlanId);
        this.plans[index] = res;
        this.loading = false;
        this.submitted = false;
        this.reactiveForm();
        this.selectedPlan = false;
      });
  }

  changeArea(area) {
    this.plans = this.allPlans.filter(item => {
      if(area == "") return true;
      if(item.area == area) return true;
    })
  }
  getArea(area) {
    let filter = this.planService.areas.filter(item => {
      if(item.value == area) return true;
    })
    return filter[0].name;
  }
}
