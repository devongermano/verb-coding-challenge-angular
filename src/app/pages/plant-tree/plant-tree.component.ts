import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from "../../shared/project.service";
import { ActivatedRoute } from "@angular/router";
import { PlantTreeResult, TreeService} from 'src/app/shared/tree.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-plant-tree',
  templateUrl: './plant-tree.component.html',
  styleUrls: ['./plant-tree.component.scss']
})
export class PlantTreeComponent implements OnInit {

  showInterstitial: boolean = false;
  plantTreeResponse: PlantTreeResult["plantTree"] | null = null;

  project: Project | null = null;
  count = 1;
  email: string = "";

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private treeService: TreeService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.projectService.getProject(id).subscribe(project => {
      this.project = project;
    });
  }

  changeCount(value: number) {
    if(value == -1 && this.count == 1) return;
    this.count = this.count + value;
  }

  submit(projectId: string, email: string, treeCount: number) {
    this.showInterstitial = true;
    this.treeService.plantTree({
      enterpriseId: environment.digitalHumaniEnterpriseId,
      projectId: projectId,
      user: email,
      treeCount: treeCount
    }).subscribe(result => {
      this.plantTreeResponse = result;
      this.showInterstitial = false;
    });
  }
}
