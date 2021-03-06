import { Injectable } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { map, Observable, of } from "rxjs";

export interface ProjectStub {
  name: string;
  reforestationProjectDescription_en: string;
  id: string;
}

export interface SearchProjectsResult {
  searchProjects: ProjectStub[];
}

export interface GetAllProjectsResult {
  allProjects: ProjectStub[];
}

export interface GetProjectDetailsResult {
  project: {
    id: string;
    name: string;
    reforestationCompanyName_en: string;
    description: string;
    reforestationCompanyAddress_en: string;
    reforestationCompanyWebsite_en: string;
    reforestationProjectCountry_en: string;
    reforestationProjectDescription_en: string;
    reforestationProjectImageURL_en: string;
    reforestationProjectState_en: string;
    reforestationProjectWebsite_en: string;
  }
}

export type Project = GetProjectDetailsResult['project'];

const GET_PROJECT = gql`
  query Project($projectId: String!) {
  project(id: $projectId) {
    id
    name
    reforestationCompanyName_en
    description
    reforestationCompanyAddress_en
    reforestationCompanyWebsite_en
    reforestationProjectCountry_en
    reforestationProjectDescription_en
    reforestationProjectImageURL_en
    reforestationProjectState_en
    reforestationProjectWebsite_en
  }
}
`;

const SEARCH_PROJECTS = gql`
  query SearchProjects($substring: String!) {
    searchProjects(substring: $substring) {
      name
      id
      reforestationProjectDescription_en
    }
  }
`;

const GET_ALL_PROJECTS = gql`
  query AllProjects {
    allProjects {
      id
      name
      reforestationProjectDescription_en
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  allProjectsCache: ProjectStub[] = [];
  useLocalSearch = true;

  constructor(private apollo: Apollo) { }

  /*
  * Get single project by id
  */
  getProject(projectId: string): Observable<Project> {
    return this.apollo
      .query<GetProjectDetailsResult>({
        query: GET_PROJECT,
        variables: {projectId}
      }).pipe(map((result) => {
      return result.data.project
    }));
  }

  /*
  * Get All Projects
  */
  getAllProjects(): Observable<ProjectStub[]> {
    if(this.allProjectsCache.length != 0) return of(this.allProjectsCache);
    return this.apollo.query<GetAllProjectsResult>({
      query: GET_ALL_PROJECTS,
    }).pipe(map((result) => {
      this.allProjectsCache = result.data.allProjects;
      return this.allProjectsCache;
    }));
  }

  /*
  Search projects using a GraphQL query, this is slow because the serverless environment implements no
  caching as of right now for the proxied http call.
  */
  searchProjects(substring: string): Observable<ProjectStub[]> {
    if(this.useLocalSearch) {
      return this.searchProjectsLocal(substring);
    }
    return this.searchProjectsAPI(substring);
  }

  /*
  Search projects using a GraphQL query, this is slow because the serverless environment implements no
  caching as of right now for the proxied http call.
  */
  searchProjectsAPI(substring: string): Observable<ProjectStub[]> {
    return this.apollo.query<SearchProjectsResult>({
      query: SEARCH_PROJECTS,
      variables: {substring}
    }).pipe(map((result) => {
      return result.data.searchProjects
    }));
  }

  /*
  Search projects locally by grabbing all of our projects from our proxy and doing some simple filtering
  */
  private searchProjectsLocal(substring: string) {
    return this.getAllProjects().pipe(map((result) => {
      return result.filter((project: ProjectStub) => {
        return project.name.toLowerCase().match(substring.toLowerCase());
      });
    }));
  }
}
