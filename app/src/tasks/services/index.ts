import { AuthenticatedHttp } from "../../common/http/axios";
import { TasksFormValues } from "../components/TasksForm";
import {
  FetchProjectsPayload,
  GetProjectPayload,
  ProjectFormValues,
  ProjectType,
  Task,
  TaskExecution,
} from "../types";

export const getProjects = async (): Promise<FetchProjectsPayload[]> =>
  AuthenticatedHttp.get("/projects").then(
    (response) => response.data as FetchProjectsPayload[]
  );

export const getProject = async (id: number): Promise<GetProjectPayload> =>
  AuthenticatedHttp.get(`/projects/${id}`).then((response) => response.data);

export const createProject = async (project: ProjectFormValues) =>
  AuthenticatedHttp.post("/projects", project);

export const updateProject = async (id: number, project: ProjectFormValues) =>
  AuthenticatedHttp.put(`/projects/${id}`, project);

export const removeProject = async (id: number): Promise<void> =>
  AuthenticatedHttp.delete(`/projects/${id}`);

export const finishProject = async (id: number): Promise<void> =>
  AuthenticatedHttp.put(`/projects/${id}/finish`);

export const getProjectTypes = async (): Promise<ProjectType[]> =>
  AuthenticatedHttp.get("/projects/types").then((response) => response.data);

export const createTask = async (projectId: number, task: TasksFormValues) =>
  AuthenticatedHttp.post(`/projects/${projectId}/tasks`, task);

export const getTasks = async (projectId: number): Promise<Task[]> =>
  AuthenticatedHttp.get(`/projects/${projectId}/tasks`).then(
    (response) => response.data
  );

export const getExecutions = async (taskId: number): Promise<TaskExecution[]> =>
  AuthenticatedHttp.get(`/tasks/${taskId}/executions`).then(
    (response) => response.data
  );

export const updateTask = async (
  projectId: number,
  taskId: number,
  task: TasksFormValues
) => AuthenticatedHttp.put(`/projects/${projectId}/tasks/${taskId}`, task);

export const removeTask = async (projectId: number, taskId: number) =>
  AuthenticatedHttp.delete(`/projects/${projectId}/tasks/${taskId}`);

export const finishTask = async (projectId: number, taskId: number) =>
  AuthenticatedHttp.put(`/projects/${projectId}/tasks/${taskId}/finish`);

export const clockInTask = async (
  user: number,
  taskId: number,
  details: string
) => AuthenticatedHttp.post(`/tasks/${taskId}/executions`, { details, user });

export const clockOutTask = async (
  user: number,
  taskId: number,
  executionId: number,
  details: string
) =>
  AuthenticatedHttp.put(`/tasks/${taskId}/executions/${executionId}/finish`, {
    details,
    user,
  });
