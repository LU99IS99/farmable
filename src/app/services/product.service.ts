import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product, ProductResponse } from '../types/product.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
    console.log(`ProductService initialized with URL: ${this.apiUrl}`);
    this.testApiConnection();
  }

  testApiConnection(): Observable<any> {
    console.log('Testing API connection...');
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap((response: Product[]) => console.log('Products fetched:', response)),
      catchError(this.handleError)
    );
  }

  // POST new product
  addProduct(product: Product): Observable<any> {
    console.log('Adding product:', product);
    return this.http.post<any>(this.apiUrl, product, { headers: this.headers }).pipe(
      tap((response: any) => console.log('Product added:', response)),
      catchError(this.handleError)
    );
  }

  // POST new product with FormData
  addProductWithFormData(formData: FormData): Observable<any> {
    console.log('Adding product with FormData');
    return this.http.post<any>(this.apiUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(
      tap((response: any) => console.log('Product added with FormData:', response)),
      catchError(this.handleError)
    );
  }

  // DELETE a product
  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`Deleting product with id: ${id}`);
    return this.http.delete<any>(url).pipe(
      tap((response: any) => console.log('Product deleted:', response)),
      catchError(this.handleError)
    );
  }

  // PUT update a product
  updateProduct(id: number, product: Product): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`Updating product with id: ${id}`);
    return this.http.put<any>(url, product).pipe(
      tap((response: any) => console.log('Product updated:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}