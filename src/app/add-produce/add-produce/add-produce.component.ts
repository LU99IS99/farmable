import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, PRODUCT_CATEGORIES } from '../../types/product.types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-produce',
  templateUrl: './add-produce.component.html',
  styleUrls: ['./add-produce.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class AddProduceComponent {
  categories = PRODUCT_CATEGORIES;

  formData: Product = {
    productName: '',
    category: '',
    shelfLife: 7,
    shelfLifeUnit: 'Days',
    unlimitedShelfLife: false,
    packUnit: '',
    description: null,
    productImage: null
  };

  loading = false;
  errorMessage: string | null = null;
  imageFile: File | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  submitForm(): void {
    console.log('Submit button clicked');

    if (!this.isFormValid()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form data:', this.formData);
    this.loading = true;
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('data', JSON.stringify(this.formData));
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    // 打印FormData内容
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.productService.addProductWithFormData(formData).subscribe({
      next: (response) => {
        console.log('Success response:', response);
        this.handleSuccess();
      },
      error: (error) => {
        console.error('Error in component:', error);
        this.handleError(error);
      }
    });
  }

  private isFormValid(): boolean {
    if (!this.formData.productName || !this.formData.category || !this.formData.packUnit) {
      this.errorMessage = 'Please fill out all required fields.';
      console.log('Missing required fields:', {
        name: !this.formData.productName,
        category: !this.formData.category,
        packUnit: !this.formData.packUnit
      });
      return false;
    }
    return true;
  }

  private handleSuccess(): void {
    this.loading = false;
    this.router.navigate(['/product'], {
      queryParams: { refresh: Date.now().toString() }
    });
  }

  private handleError(error: any): void {
    console.error('Error adding product:', error);
    this.loading = false;
    this.errorMessage = `Failed to add product. Please try again. Error: ${error.message || error.statusText || 'Unknown error'}`;
  }
}