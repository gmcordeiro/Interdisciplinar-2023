import { User } from "../../auth/types";

export type Task = {
  id: string;
  name: string;
  description: string;
  done: boolean;
  dependsOn?: Task;
  executions?: TaskExecution[];
};

export type TaskExecution = {
  id: string;
  startedAt: string;
  finishedAt: string;
  user: User;
  details: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  goal: string;
  resources: string;
  done: boolean;
  tasks: Task[];
  owner: User;
};
