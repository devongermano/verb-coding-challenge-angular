import { Component, OnInit } from '@angular/core';
import { ProjectService, SearchProjects } from "../../shared/project.service";
import {ActivatedRoute, Router} from "@angular/router";

const PROJECT_NAME_PARAM = "project-name"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchParam: string = '';
  projects: SearchProjects[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchParam = params[PROJECT_NAME_PARAM];
      this.searchProjects(this.searchParam);
    });
  }

  onSearchParamChanged(param: string) {
    this.router.navigate([], {
      queryParams: {
        [PROJECT_NAME_PARAM]: param
      },
    });
  }

  searchProjects(projectNameSubstring: string) {
    this.projectService.searchProjects(projectNameSubstring)
      .subscribe(projects => {
        this.projects = projects;
      });
  }
}
