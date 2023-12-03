package com.api.application.task

import com.api.application.project.ProjectService
import com.api.application.project.exceptions.ProjectNotFoundException
import com.api.application.task.exceptions.TaskNotFoundException
import com.api.domain.project.ProjectRepository
import com.api.domain.task.Task
import com.api.domain.task.TaskRepository
import com.api.domain.task.TeskExecutionRepository
import org.springframework.stereotype.Service

@Service
class TaskService(
	private val taskRepository: TaskRepository,
	private val taskExecutionRepository: TeskExecutionRepository,
	private val projectRepository: ProjectRepository
) {
	fun findAllByProject(projectId: Long): List<Task>{
		val project = projectRepository.findById(projectId).get()
		return taskRepository.findAllByProject(project)
	}

	fun findByProjectIdAndId(projectId: Long, taskId: Long): Task? {
		return taskRepository.findByProjectIdAndId(projectId, taskId).get()
	}

	fun findById(taskId: Long): Task? {
		return taskRepository.findById(taskId).get()
	}

	fun insert(task: TaskRequest, projectId: Long): Task?{
		val taskCommand = getCommand(task, true, 0, projectId)
		val taskDomain = taskRepository.save(taskCommand.toTaskExecution())
		return taskDomain.id?.let { findById(it) }
	}

	fun update(task: TaskRequest, taskId: Long, projectId: Long): Task?{
		val taskCommand = getCommand(task, false, taskId, projectId)
		val taskDomain = taskRepository.save(taskCommand.toTaskExecution())
		return taskDomain.id?.let { findById(it) }
	}

	fun delete(taskId: Long): Boolean{
		taskRepository.deleteById(taskId) ?: throw TaskNotFoundException(taskId)
		return !taskRepository.existsById(taskId)
	}

	fun getCommand(task: TaskRequest, create: Boolean, taskId: Long, projectId: Long): TaskCommand {
		val taskDomain = taskRepository.findById(task.dependsOn).get()
		val projectDomain = projectRepository.findById(projectId).get()
		val execution = if(create) listOf() else taskExecutionRepository.findAllByTaskId(taskId)

		return task.toCommand(projectDomain, taskDomain, execution)
	}
}