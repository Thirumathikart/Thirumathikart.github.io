import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { ProductService } from 'src/app/services/api/product/product.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
    selector: 'app-add-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})

export class InventoryComponent implements OnInit {
    @ViewChild('fileUpload') fileUpload!: FileUpload;
    id!: string;
    productForm!: FormGroup;
    categories!: any[];
    uploadedFiles: any[] = [];

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.getProduct();
        });
    }

    getCategories() {
        this.productService.getCategories().subscribe(
            {
                next: (response: any) => {
                    this.categories = [];
                    for (let cat of response.categories) {
                        console.log(cat.name);
                        this.categories.push(cat.name);
                    }
                },
                error: error => {
                    console.log(error.message);
                }
            }
        );
    }
    getSafeUrl(file: File): SafeUrl {
        const objectURL = URL.createObjectURL(file);
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }

    getProduct() {
        if (this.id) {
            this.productService.getProductByID(this.id).subscribe(
                {
                    next: async (response: any) => {
                        console.log(response);
                        const product = response.product;
                        await this.getCategories();

                        fetch(`https://thirumathikart.nitt.edu/api/product/images/${product.image}`)
                            .then(response => response.blob())
                            .then(blob => {
                                const file = new File([blob], product.image, { type: 'image/png' });
                                const files: File[] = [file]
                                this.fileUpload.files = files;
                                
                                this.productForm.patchValue({
                                    file: file
                                });
                            
                            })
                            .catch(error => {
                                console.error('Error fetching the image:', error);
                            });
                            this.productForm = new FormGroup({
                                name: new FormControl(product.name),
                                category: new FormControl(product.categories),
                                description: new FormControl(product.description),
                                stock: new FormControl(product.stock),
                                price: new FormControl(product.price),
                                file: new FormControl()
                            });

                    
    
                    },
                    error: error => {
                        console.log(error.message);
                    }
                }
            );
        } else {
            this.getCategories();
            this.productForm = new FormGroup({
                name: new FormControl(""),
                category: new FormControl(""),
                description: new FormControl(""),
                stock: new FormControl(""),
                price: new FormControl(""),
                file: new FormControl()
            });
        }
    }

    //"1700248368372363302-418.jpg"

    fileUploader(event: FileSelectEvent) {
        const file = event.files && event.files[0];
        this.productForm.patchValue({
            file: file
        });
    }

    removeFile(event: any, index: number) {
        if (index >= 0) {
            this.fileUpload.remove(event, index)
        }
    }

    onUpload() {
        const formData = new FormData();

        // Append other form data if needed
        formData.append('name', this.productForm.get('name')?.value);
        formData.append('categories', this.productForm.get('category')?.value);
        formData.append('description', this.productForm.get('description')?.value);
        formData.append('stock', this.productForm.get('stock')?.value);
        formData.append('price', this.productForm.get('price')?.value);

        const fileInput: File = this.productForm.get('file')?.value;

        formData.append('file', fileInput, fileInput.name);


        if (this.id == undefined) {
            this.productService.addProduct(formData).subscribe(
                {
                    next: (response: any) => {
                        console.log(response);
                        this.messageService.add({ severity: 'success', summary: response.message, detail: 'Added Product' });
                    },
                    error: error => {
                        console.log(error.message);
                    }
                }
            );
        } else {
            this.productService.updateProduct(this.id,formData).subscribe(
                {
                    next: async (response: any) => {
                        console.log(response);
                        this.messageService.add({ severity: 'success', summary: response.message, detail: 'Updated Product' });
                    },
                    error: error => {

                    }
                }
            );
        }
    }
}
