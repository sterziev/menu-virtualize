import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  public itemForm: FormGroup;
  imageSrc = '\\assets\\img\\add-photo.png';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('init');

    this.itemForm = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.minLength(2), Validators.required],
          updateOn: 'submit',
        },
      ],
      description: [
        '',
        {
          validators: [Validators.minLength(2), Validators.required],
          updateOn: 'submit',
        },
      ],
      price: [
        '',
        {
          validators: [Validators.min(0), Validators.required],
          updateOn: 'submit',
        },
      ],
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]],
    });
  }

  add(formValues: any) {
    console.log(formValues);
  }

  get controls() {
    return this.itemForm.controls;
  }

  onFileChange(event) {
    console.log(event);

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.itemForm.patchValue({
          fileSource: reader.result,
        });
      };
      console.log('end');
    }
  }
}
