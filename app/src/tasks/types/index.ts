import { User } from "../../auth/types";

export type Task = {
  id: string;
  name: string;
  description: string;
  done: boolean;
  dependsOn?: Task;
};

export type TaskExecution = {
  id: string;
  startedAt: Date;
  finishedAt: Date;
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
