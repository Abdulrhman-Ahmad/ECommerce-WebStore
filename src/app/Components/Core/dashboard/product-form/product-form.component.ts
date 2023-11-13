import { HttpHeaders } from '@angular/common/http';
import { Iproductadd, Warranty } from './../../../../Interfaces/product/iproductadd';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOperationService } from 'src/app/Services/dashboard/product-operation.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  fg !:FormGroup
  productId:number=0
  product: Iproductadd = {
    name: "",
    description: "",
    price: 0,
    condition: 0,
    stockQuantity: 0,
    discount: 0,
    model: "",
    color: "",
    storage: 0,
    ram: 0,
    camera: "",
    cpu: "",
    screenSize: 0,
    batteryCapacity: 0,
    osVersion: "",
    categoryID: 1,
    brandID: 1,
    warranties: [],
    images: []
  };

  constructor(private fb:FormBuilder, private prodService : ProductOperationService, private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.fg = this.fb.group({
    productId:[0],
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
    description:['',[Validators.required,Validators.minLength(10),Validators.maxLength(100)]],
    price:['',[Validators.required,Validators.min(1000),Validators.max(80000)]],
    condition: [1,[Validators.required,Validators.min(0),Validators.max(1)]],
    stockQuantity: ['',[Validators.required,Validators.min(0),Validators.max(100)]],
    discount: [0,[Validators.required,Validators.min(0),Validators.max(70)]],
    model: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
    color: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
    storage: ['',[Validators.required,Validators.min(16),Validators.max(1000)]],
    ram: ['',[Validators.required,Validators.min(8),Validators.max(64)]],
    camera: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
    cpu: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
    screenSize: ['',[Validators.required]],
    batteryCapacity: ['',[Validators.required,Validators.min(16),Validators.max(10000)]],
    osVersion: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
    categoryID: [1,[Validators.required,Validators.min(1)]],
    brandID: [1,[Validators.required]],
    warranties: [''],
    images: ['']
    })
    }

    addWarranty() {
      const warrantyInput = this.fg.get('warranties')?.value as string;
      // "partName-duration"  "battery-1 year"
      const [partName, duration] = warrantyInput.split('-');
      
      // Construct the Warranty object
      const newWarranty: Warranty = { partName, duration };
      
      // Add the warranty to the product
      this.product.warranties.push(newWarranty);
    
      // Clear the warranty input field
      this.fg.get('warranties')?.reset();
      console.log(this.product.warranties);
    }

    addImage() {
      const imageInput = this.fg.get('images')?.value;
      // Add the selected images to the product.images array
      this.product.images.push(imageInput);
      // Clear the input field
      this.fg.get('images')?.reset();
      console.log(this.product.images);
    }
    
    OnSubmit(e :Event){
      e.preventDefault();
      console.log(this.fg);
      console.log(this.product);
      if (this.fg.valid )
      {
        this.product.name = this.fg.get('name')?.value;
        this.product.description = this.fg.get('description')?.value;
        this.product.price = this.fg.get('price')?.value;
        this.product.condition = this.fg.get('condition')?.value;
        this.product.stockQuantity = this.fg.get('stockQuantity')?.value;
        this.product.discount = this.fg.get('discount')?.value;
        this.product.model = this.fg.get('model')?.value;
        this.product.color = this.fg.get('color')?.value;
        this.product.storage = this.fg.get('storage')?.value;
        this.product.ram = this.fg.get('ram')?.value;
        this.product.camera = this.fg.get('camera')?.value;
        this.product.cpu = this.fg.get('cpu')?.value;
        this.product.screenSize = this.fg.get('screenSize')?.value;
        this.product.batteryCapacity = this.fg.get('batteryCapacity')?.value;
        this.product.osVersion = this.fg.get('osVersion')?.value;
        this.product.categoryID = this.fg.get('categoryID')?.value;
        this.product.brandID = this.fg.get('brandID')?.value;
        // this.product.warranties =  this.product.warranties.push(newWarranty);
        //this.product.images = this.fg.get('images')?.value;
        console.log("pass valid");
        // Create a FormData object
        const formData = new FormData();

        // Append product data to FormData
          formData.append('name', this.product.name);
          formData.append('description', this.product.description);
          formData.append('price', this.product.price.toString());
          formData.append('condition', this.product.condition.toString());
          formData.append('stockQuantity', this.product.stockQuantity.toString());
          formData.append('discount', this.product.discount.toString());
          formData.append('model', this.product.model);
          formData.append('color', this.product.color);
          formData.append('storage', this.product.storage.toString());
          formData.append('ram', this.product.ram.toString());
          formData.append('camera', this.product.camera);
          formData.append('cpu', this.product.cpu);
          formData.append('screenSize', this.product.screenSize.toString());
          formData.append('batteryCapacity', this.product.batteryCapacity.toString());
          formData.append('osVersion', this.product.osVersion);
          formData.append('categoryID', this.product.categoryID.toString());
          formData.append('brandID', this.product.brandID.toString());

          // Append each warranty to FormData
          for (const warranty of this.product.warranties) {
            formData.append('warranties', JSON.stringify(warranty));
          }

          // Append each image URL to FormData
          for (const image of this.product.images) {
            formData.append('images', image.imageUrl);
          }


        // Assuming 'imageUrl' property contains the URL of the image
        for (const image of this.product.images) {
          const imageUrl = image.imageUrl; // Adjust this based on your actual data structure
        
          // Append the image URL to FormData
          formData.append('images', imageUrl);
        }

        this.productId = this.activatedRoute.snapshot.params['id'];

        console.log('product to add :',this.product); // work and get data
          if(this.productId > 0){
                  //edit
                  this.prodService.edit(this.productId,this.product).subscribe({
                    next:(data) =>this.router.navigate(['/adminproducts']),
                    error:(error)=> console.log('error'+error),
                    complete: ()=>console.log("Successfully Add Product!"),
                  });
              }else{
                //add
            this.prodService.add(this.product).subscribe({
              next: (data) => this.router.navigate(['/adminproducts']),
              error: (error) => console.log('error' , JSON.stringify(error)),
              complete: () => console.log("Successfully Add Product!"),
            });
                  }
      }
      else {
        // Log validation errors
        console.log('Form is invalid');
        // Log individual form controls' errors
        console.log('Form control errors:', this.fg.errors);
    
        // Log errors for warranties
        const warrantiesErrors = this.fg.get('warranties')?.errors;
        if (warrantiesErrors) {
          console.log('Warranties errors:', warrantiesErrors);
        }
        // Log errors for images
        const imagesErrors = this.fg.get('images')?.errors;
        if (imagesErrors) {
          console.log('Images errors:', imagesErrors);
        }
      }
      
    }


  // ---------------- [ name ]
  get nameRequired():boolean|void{return this.fg.get('name')?.hasError('required');}
  get nameValid(): boolean|void { return this.fg.get('name')?.valid;}
  get nameTouched():boolean|void{ return this.fg.get('name')?.touched;}

  // ---------------- [ description ]
  get descriptionRequired():boolean|void{return this.fg.get('description')?.hasError('required');}
  get descriptionValid(): boolean|void { return this.fg.get('description')?.valid;}
  get descriptionTouched():boolean|void{ return this.fg.get('description')?.touched;}

  // ---------------- [ price ]
  get priceRequired():boolean|void{return this.fg.get('price')?.hasError('required');}
  get priceValid(): boolean|void { return this.fg.get('price')?.valid;}
  get priceTouched():boolean|void{ return this.fg.get('price')?.touched;}

  // ---------------- [ condition ]
  get conditionRequired():boolean|void{return this.fg.get('condition')?.hasError('required');}
  get conditionValid(): boolean|void { return this.fg.get('condition')?.valid;}
  get conditionTouched():boolean|void{ return this.fg.get('condition')?.touched;}

  // ---------------- [ stockQuantity ]
  get stockQuantityRequired():boolean|void{return this.fg.get('stockQuantity')?.hasError('required');}
  get stockQuantityValid(): boolean|void { return this.fg.get('stockQuantity')?.valid;}
  get stockQuantityTouched():boolean|void{ return this.fg.get('stockQuantity')?.touched;}

  // ---------------- [ discount ]
  get discountRequired():boolean|void{return this.fg.get('discount')?.hasError('required');}
  get discountValid(): boolean|void { return this.fg.get('discount')?.valid;}
  get discountTouched():boolean|void{ return this.fg.get('discount')?.touched;}

  // ---------------- [ model ]
  get modelRequired():boolean|void{return this.fg.get('model')?.hasError('required');}
  get modelValid(): boolean|void { return this.fg.get('model')?.valid;}
  get modelTouched():boolean|void{ return this.fg.get('model')?.touched;}

  // ---------------- [ color ]
  get colorRequired():boolean|void{return this.fg.get('color')?.hasError('required');}
  get colorValid(): boolean|void { return this.fg.get('color')?.valid;}
  get colorTouched():boolean|void{ return this.fg.get('color')?.touched;}

  // ---------------- [ storage ]
  get storageRequired():boolean|void{return this.fg.get('storage')?.hasError('required');}
  get storageValid(): boolean|void { return this.fg.get('storage')?.valid;}
  get storageTouched():boolean|void{ return this.fg.get('storage')?.touched;}

  // ---------------- [ ram ]
  get ramRequired():boolean|void{return this.fg.get('ram')?.hasError('required');}
  get ramValid(): boolean|void { return this.fg.get('ram')?.valid;}
  get ramTouched():boolean|void{ return this.fg.get('ram')?.touched;}

  // ---------------- [ camera ]
  get cameraRequired():boolean|void{return this.fg.get('camera')?.hasError('required');}
  get cameraValid(): boolean|void  {return this.fg.get('camera')?.valid;}
  get cameraTouched():boolean|void {return this.fg.get('camera')?.touched;}
  

  // ---------------- [ cpu ]
  get cpuRequired():boolean|void{return this.fg.get('cpu')?.hasError('required');}
  get cpuValid(): boolean|void  {return this.fg.get('cpu')?.valid;}
  get cpuTouched():boolean|void {return this.fg.get('cpu')?.touched;}

  // ---------------- [ screenSize ]
  get screenSizeRequired():boolean|void{return this.fg.get('screenSize')?.hasError('required');}
  get screenSizeValid(): boolean|void  {return this.fg.get('screenSize')?.valid;}
  get screenSizeTouched():boolean|void {return this.fg.get('screenSize')?.touched;}

  // ---------------- [ batteryCapacity ]
  get batteryCapacityRequired():boolean|void{return this.fg.get('batteryCapacity')?.hasError('required');}
  get batteryCapacityValid(): boolean|void  {return this.fg.get('batteryCapacity')?.valid;}
  get batteryCapacityTouched():boolean|void {return this.fg.get('batteryCapacity')?.touched;}

  // ---------------- [ osVersion ]
  get osVersionRequired():boolean|void{return this.fg.get('osVersion')?.hasError('required');}
  get osVersionValid(): boolean|void  {return this.fg.get('osVersion')?.valid;}
  get osVersionTouched():boolean|void {return this.fg.get('osVersion')?.touched;}

  // ---------------- [ categoryID ]
  get categoryIDRequired():boolean|void{return this.fg.get('categoryID')?.hasError('required');}
  get categoryIDValid(): boolean|void  {return this.fg.get('categoryID')?.valid;}
  get categoryIDTouched():boolean|void {return this.fg.get('categoryID')?.touched;}

  // ---------------- [ brandID ]
  get brandIDRequired():boolean|void{return this.fg.get('brandID')?.hasError('required');}
  get brandIDValid(): boolean|void  {return this.fg.get('brandID')?.valid;}
  get brandIDTouched():boolean|void {return this.fg.get('brandID')?.touched;}

  // ---------------- [ warranties ]
  public get warrantiesRequired():boolean|void{return this.fg.get('warranties')?.hasError('required');}
  get warrantiesValid(): boolean|void  {return this.fg.get('warranties')?.valid;}
  get warrantiesTouched():boolean|void {return this.fg.get('warranties')?.touched;}

  // ---------------- [ images ]
  get imagesRequired():boolean|void{return this.fg.get('images')?.hasError('required');}
  get imagesValid(): boolean|void  {return this.fg.get('images')?.valid;}
  get imagesTouched():boolean|void {return this.fg.get('images')?.touched;}

  


}