export interface GetProjectsResponse {
  projects: Project[];
}

export interface Project {
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
