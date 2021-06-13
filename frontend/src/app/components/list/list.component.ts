import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[] = [] ;
  displayedColumns = ['title', 'responsible', 'description', 'severity', 'status', 'actions']

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit(): void {
      this.fetchIssues()
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((data: any) => {
      this.issues = data;
      console.log('Data requested...');
      console.log(this.issues);
    });
   
  }
  
  editIssue(id: String) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id: String){
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }


}
