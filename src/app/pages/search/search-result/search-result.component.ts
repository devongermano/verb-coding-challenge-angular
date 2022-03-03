import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Project, ProjectService} from 'src/app/shared/project.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  project: Project | null = null;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') !;
    this.projectService.getProject(id).subscribe(project => {
      this.project = project;
    });
  }
}
