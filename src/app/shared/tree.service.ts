import { Injectable } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { map, Observable } from "rxjs";


export interface PlantTreeRequest {
  enterpriseId: string;
  projectId: string;
  user: string;
  treeCount: number;
}

export interface PlantTreeResult {
  plantTree: {
    created: string;
    enterpriseId: string;
    projectId: string;
    user: string;
    treeCount: number;
  }
}

const PLANT_TREE_MUTATION = gql`
mutation PlantTree($enterpriseId: String!, $projectId: String!, $user: String!, $treeCount: Int!) {
  plantTree(enterpriseId: $enterpriseId, projectId: $projectId, user: $user, treeCount: $treeCount) {
    created
    projectId
    uuid
    user
    treeCount
    enterpriseId
  }
}`;


@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private apollo: Apollo) { }

  /*
  * Plant tree for project by enterpriseId
  */
  plantTree(plantTreeRequest: PlantTreeRequest): Observable<PlantTreeResult["plantTree"]> {
    return this.apollo
      .mutate<PlantTreeResult>({
        mutation: PLANT_TREE_MUTATION,
        variables: plantTreeRequest
      }).pipe(map((result) => {
        return result.data!.plantTree
      }));
  }
}
