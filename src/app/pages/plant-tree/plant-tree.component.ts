import { Component, OnInit } from '@angular/core';
import { Project, ProjectService} from "../../shared/project.service";
import { ActivatedRoute } from "@angular/router";
import { PlantTreeRequest, PlantTreeResult, TreeService } from 'src/app/shared/tree.service';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-plant-tree',
  templateUrl: './plant-tree.component.html',
  styleUrls: ['./plant-tree.component.scss']
})
export class PlantTreeComponent implements OnInit {

  showInterstitial: boolean = false;
  plantTreeResponse: PlantTreeResult["plantTree"] | null = null;
  project: Project | null = null;

  plantTreeRequest: PlantTreeRequest = {
    enterpriseId: environment.digitalHumaniEnterpriseId,
    projectId: '',
    user: '',
    treeCount: 1,
  }

  plantTreeFormGroup = new FormGroup({
    email: new FormControl(this.plantTreeRequest.user, [
      Validators.required,
      Validators.email,
    ]),
    treeCount: new FormControl(this.plantTreeRequest.treeCount, [
      Validators.min(1),
      Validators.required,
    ])
  })

  get email() {
    return this.plantTreeFormGroup.get('email');
  }

  get treeCount() {
    return this.plantTreeFormGroup.get('treeCount');
  }

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private treeService: TreeService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id !).subscribe(project => {
      this.plantTreeRequest.projectId = project.id;
      this.project = project;
    });
  }

  changeCount(value: number) {
    if(value == -1 && this.plantTreeFormGroup.value.treeCount == 1) return;
    this.plantTreeFormGroup.controls["treeCount"].setValue(this.plantTreeFormGroup.value.treeCount + value);
  }

  onSubmit() {
    this.showInterstitial = true;
    this.treeService.plantTree({
      enterpriseId: this.plantTreeRequest.enterpriseId,
      projectId: this.plantTreeRequest.projectId,
      user: this.plantTreeFormGroup.value.email,
      treeCount: this.plantTreeFormGroup.value.treeCount
    }).subscribe(result => {
      this.plantTreeResponse = result;
      this.showInterstitial = false;
    });
  }
}
