import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });

   }

  addIssue(title: string, responsible: string, description: string, severity: string) {
    this.issueService.addIssue(title, responsible, description, severity).subscribe( () => {
      this.router.navigate(['/list'])
    })
  }

  ngOnInit(): void {
  }

}
