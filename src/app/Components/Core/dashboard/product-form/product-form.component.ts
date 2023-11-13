import { Iproductadd } from './../../../../Interfaces/product/iproductadd';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iwarranty } from 'src/app/Interfaces/iwarranty';
import { ProductlistService } from 'src/app/Services/productlist.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  fg !: FormGroup;

  selectedImage: File | null = null;

  product: Iproductadd = {
    name: '',
    description: '',
    price: 0,
    condition: 0,
    stockQuantity: 0,
    discount: 0,
    model: '',
    color: '',
    storage: 0,
    ram: 0,
    camera: '',
    cpu: '',
    screenSize: 0,
    batteryCapacity: 0,
    osVersion: '',
    categoryID: 0,
    brandID: 0,
    warranties: [],
    images: []
  };

  images: File[] = [];
  warranties: Iwarranty[] = [];

  constructor(private fb: FormBuilder, private productapi: ProductlistService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.fg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(1000), Validators.max(80000)]],
      condition: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      stockQuantity: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(70)]],
      model: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      storage: ['', [Validators.required, Validators.min(16), Validators.max(1000)]],
      ram: ['', [Validators.required, Validators.min(8), Validators.max(64)]],
      camera: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      cpu: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      screenSize: ['', [Validators.required]],
      batteryCapacity: ['', [Validators.required, Validators.min(16), Validators.max(10000)]],
      osVersion: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      categoryID: [1, [Validators.required, Validators.min(1)]],
      brandID: [1, [Validators.required]],
      warranties: [''],
      images: ['']

    })
  }

  addWarranty() {

    const warrantyInput = this.fg.get('warranties')?.value as string;

    const [partName, duration] = warrantyInput.split('-');

    const newWarranty: Iwarranty = { partName, duration };

    this.warranties.push(newWarranty);

    this.fg.get('warranties')?.reset();
  }


  AssignImage(e: any) {
    this.selectedImage = e.target.files[0];
  }

  addImage() {
    if (this.selectedImage != null) {
      this.images.push(this.selectedImage);
      this.fg.get('images')?.reset();
      this.selectedImage = null;
    }
    else {
      console.log('there is no images choosed')
    }
  }

  OnSubmit(e: Event) {

    e.preventDefault();

    if (this.fg.valid || true) {


      let formData = new FormData();

      formData.append('name', this.fg.get('name')?.value);
      formData.append('description', this.fg.get('description')?.value);
      formData.append('price', this.fg.get('price')?.value.toString());
      formData.append('condition', this.fg.get('condition')?.value.toString());
      formData.append('stockQuantity', this.fg.get('stockQuantity')?.value.toString());
      formData.append('discount', this.fg.get('discount')?.value.toString());
      formData.append('model', this.fg.get('model')?.value);
      formData.append('color', this.fg.get('color')?.value);
      formData.append('storage', this.fg.get('storage')?.value.toString());
      formData.append('ram', this.fg.get('ram')?.value.toString());
      formData.append('camera', this.fg.get('camera')?.value);
      formData.append('cpu', this.fg.get('cpu')?.value);
      formData.append('screenSize', this.fg.get('screenSize')?.value.toString());
      formData.append('batteryCapacity', this.fg.get('batteryCapacity')?.value.toString());
      formData.append('osVersion', this.fg.get('osVersion')?.value);
      formData.append('categoryID', this.fg.get('categoryID')?.value.toString());
      formData.append('brandID', this.fg.get('brandID')?.value.toString());


      for (let item of this.warranties) {
        formData.append(`warranties`, JSON.stringify(item));
      }

      for (let  image of this.images) {
        formData.append(`images`, image, image.name);
      }

      this.productapi.AddProduct(formData).subscribe({
        next: (d) => console.log('Adding Product ...',d),
        error: (e) => console.log('Error: ',e),
        complete: () => console.log('Added Product Successfully!')
      })

    }

    else {
      console.log('Form is invalid');
    }

  }




  // ---------------- [ name ]
  get nameRequired(): boolean | void { return this.fg.get('name')?.hasError('required'); }
  get nameValid(): boolean | void { return this.fg.get('name')?.valid; }
  get nameTouched(): boolean | void { return this.fg.get('name')?.touched; }

  // ---------------- [ description ]
  get descriptionRequired(): boolean | void { return this.fg.get('description')?.hasError('required'); }
  get descriptionValid(): boolean | void { return this.fg.get('description')?.valid; }
  get descriptionTouched(): boolean | void { return this.fg.get('description')?.touched; }

  // ---------------- [ price ]
  get priceRequired(): boolean | void { return this.fg.get('price')?.hasError('required'); }
  get priceValid(): boolean | void { return this.fg.get('price')?.valid; }
  get priceTouched(): boolean | void { return this.fg.get('price')?.touched; }

  // ---------------- [ condition ]
  get conditionRequired(): boolean | void { return this.fg.get('condition')?.hasError('required'); }
  get conditionValid(): boolean | void { return this.fg.get('condition')?.valid; }
  get conditionTouched(): boolean | void { return this.fg.get('condition')?.touched; }

  // ---------------- [ stockQuantity ]
  get stockQuantityRequired(): boolean | void { return this.fg.get('stockQuantity')?.hasError('required'); }
  get stockQuantityValid(): boolean | void { return this.fg.get('stockQuantity')?.valid; }
  get stockQuantityTouched(): boolean | void { return this.fg.get('stockQuantity')?.touched; }

  // ---------------- [ discount ]
  get discountRequired(): boolean | void { return this.fg.get('discount')?.hasError('required'); }
  get discountValid(): boolean | void { return this.fg.get('discount')?.valid; }
  get discountTouched(): boolean | void { return this.fg.get('discount')?.touched; }

  // ---------------- [ model ]
  get modelRequired(): boolean | void { return this.fg.get('model')?.hasError('required'); }
  get modelValid(): boolean | void { return this.fg.get('model')?.valid; }
  get modelTouched(): boolean | void { return this.fg.get('model')?.touched; }

  // ---------------- [ color ]
  get colorRequired(): boolean | void { return this.fg.get('color')?.hasError('required'); }
  get colorValid(): boolean | void { return this.fg.get('color')?.valid; }
  get colorTouched(): boolean | void { return this.fg.get('color')?.touched; }

  // ---------------- [ storage ]
  get storageRequired(): boolean | void { return this.fg.get('storage')?.hasError('required'); }
  get storageValid(): boolean | void { return this.fg.get('storage')?.valid; }
  get storageTouched(): boolean | void { return this.fg.get('storage')?.touched; }

  // ---------------- [ ram ]
  get ramRequired(): boolean | void { return this.fg.get('ram')?.hasError('required'); }
  get ramValid(): boolean | void { return this.fg.get('ram')?.valid; }
  get ramTouched(): boolean | void { return this.fg.get('ram')?.touched; }

  // ---------------- [ camera ]
  get cameraRequired(): boolean | void { return this.fg.get('camera')?.hasError('required'); }
  get cameraValid(): boolean | void { return this.fg.get('camera')?.valid; }
  get cameraTouched(): boolean | void { return this.fg.get('camera')?.touched; }


  // ---------------- [ cpu ]
  get cpuRequired(): boolean | void { return this.fg.get('cpu')?.hasError('required'); }
  get cpuValid(): boolean | void { return this.fg.get('cpu')?.valid; }
  get cpuTouched(): boolean | void { return this.fg.get('cpu')?.touched; }

  // ---------------- [ screenSize ]
  get screenSizeRequired(): boolean | void { return this.fg.get('screenSize')?.hasError('required'); }
  get screenSizeValid(): boolean | void { return this.fg.get('screenSize')?.valid; }
  get screenSizeTouched(): boolean | void { return this.fg.get('screenSize')?.touched; }

  // ---------------- [ batteryCapacity ]
  get batteryCapacityRequired(): boolean | void { return this.fg.get('batteryCapacity')?.hasError('required'); }
  get batteryCapacityValid(): boolean | void { return this.fg.get('batteryCapacity')?.valid; }
  get batteryCapacityTouched(): boolean | void { return this.fg.get('batteryCapacity')?.touched; }

  // ---------------- [ osVersion ]
  get osVersionRequired(): boolean | void { return this.fg.get('osVersion')?.hasError('required'); }
  get osVersionValid(): boolean | void { return this.fg.get('osVersion')?.valid; }
  get osVersionTouched(): boolean | void { return this.fg.get('osVersion')?.touched; }

  // ---------------- [ categoryID ]
  get categoryIDRequired(): boolean | void { return this.fg.get('categoryID')?.hasError('required'); }
  get categoryIDValid(): boolean | void { return this.fg.get('categoryID')?.valid; }
  get categoryIDTouched(): boolean | void { return this.fg.get('categoryID')?.touched; }

  // ---------------- [ brandID ]
  get brandIDRequired(): boolean | void { return this.fg.get('brandID')?.hasError('required'); }
  get brandIDValid(): boolean | void { return this.fg.get('brandID')?.valid; }
  get brandIDTouched(): boolean | void { return this.fg.get('brandID')?.touched; }

  // ---------------- [ warranties ]
  public get warrantiesRequired(): boolean | void { return this.fg.get('warranties')?.hasError('required'); }
  get warrantiesValid(): boolean | void { return this.fg.get('warranties')?.valid; }
  get warrantiesTouched(): boolean | void { return this.fg.get('warranties')?.touched; }

  // ---------------- [ images ]
  get imagesRequired(): boolean | void { return this.fg.get('images')?.hasError('required'); }
  get imagesValid(): boolean | void { return this.fg.get('images')?.valid; }
  get imagesTouched(): boolean | void { return this.fg.get('images')?.touched; }




}
