import { User } from "../../auth/types";

export type Task = {
  id: number;
  name: string;
  description: string;
  done: boolean;
  dependsOn?: Task;
  executions?: TaskExecution[];
};

export type TaskExecution = {
  id: number;
  startedAt: string;
  finishedAt: string;
  user: User;
  details: string;
};

export type ProjectType = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  goal: string;
  resources: string;
  done: boolean;
  tasks: Task[];
  owner: User;
  type: ProjectType;
};

export type FetchProjectsPayload = Omit<Project, "tasks">;

export type ProjectFormValues = {
  name: string;
  description: string;
  goal: string;
  resources: string;
  done: boolean;
  owner: number;
  type: number;
};

export type GetProjectPayload = Project;
