export interface GetProjectsResponse {
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  framework: string;
  latestDeployments: LatestDeployment[];
}

export interface LatestDeployment {
  id: string;
  creator: {
    username: string;
  };
}
