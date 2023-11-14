import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibrandadd } from 'src/app/Interfaces/brand/ibrandadd';
import { Ibrandreturn } from 'src/app/Interfaces/brand/ibrandreturn';
import { BrandService } from 'src/app/Services/dashboard/brand.service';

@Component({
  selector: 'app-brand-list-dashboard',
  templateUrl: './brand-list-dashboard.component.html',
  styleUrls: ['./brand-list-dashboard.component.css']
})
export class BrandListDashboardComponent {

  brands:Ibrandreturn[] = [];

  fg !:FormGroup;

  brandAdd : Ibrandadd = {
    name : ''
  }

  fgEdit !:FormGroup;

  brandEdit : Ibrandreturn={
    id:0,
    name : ''
  }

  brandId:number = 0;


  constructor(private fb:FormBuilder , private fbEdit:FormBuilder ,private brandService:BrandService ,private router:Router ,private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.fg = this.fb.group({
      name:['',[Validators.required, Validators.minLength(4)]]
    });

    this.brandService.getAll().subscribe({
      next:(data) =>{this.brands= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    
  }

  OnSubmit(e :Event){
    e.preventDefault();

    if (this.fg.valid)
    {
      this.brandAdd.name = this.fg.get('name')?.value;

      this.brandService.add(this.brandAdd).subscribe(
        {
          next:     () => this.closeForm(),
          error:    (e) => console.log(e),
          complete: () => console.log("Successfully Add Brand")
        }
      )
    }

  }



    
  
  
  // ---------------- [Delete Brand ]
  delete(id:number){
    this.brands = this.brands.filter(b => b.id !== id);
    this.brandService.delete(id).subscribe(() => {
    });
  }


  // ---------------- [OPEN Brand Form ]
  openForm() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'block';
    }
  }

    // ---------------- [Close Brand Form ]
  closeForm() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  // ---------------- [ name ]
  get nameRequired():boolean|void{return this.fg.get('name')?.hasError('required');}
  get nameValid(): boolean|void { return this.fg.get('name')?.valid;}
  get nameTouched():boolean|void{ return this.fg.get('name')?.touched;}

}
