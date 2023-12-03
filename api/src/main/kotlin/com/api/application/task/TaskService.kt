package com.api.application.task

import com.api.application.project.ProjectService
import com.api.application.project.exceptions.ProjectNotFoundException
import com.api.application.task.exceptions.TaskNotFoundException
import com.api.domain.task.Task
import com.api.domain.task.TaskExecution
import com.api.domain.task.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService(
	private val taskRepository: TaskRepository,
	private val taskExecutionService: TaskExecutionService,
	private val projectService: ProjectService
) {
	fun findAll(): List<Task>{
		return taskRepository.findAll()
	}

	fun findAllByProject(projectId: Long): List<Task>{
		val project = projectService.findById(projectId) ?: throw ProjectNotFoundException(projectId)
		return taskRepository.findAllByProject(project)
	}

	fun findById(taskId: Long): Task? {
		return taskRepository.findById(taskId).get()
	}

	fun insert(task: TaskRequest): Task?{
		val taskCommand = getCommand(task, true, 0)
		val taskDomain = taskCommand.toTaskExecution()
		taskRepository.save(taskDomain)
		return taskDomain.id?.let { findById(it) }
	}

	fun update(task: TaskRequest, taskId: Long): Task?{
		val taskCommand = getCommand(task, false, taskId)
		val taskDomain = taskCommand.toTaskExecution()
		taskRepository.save(taskDomain)
		return taskDomain.id?.let { findById(it) }
	}

	fun delete(taskId: Long){
		val task = taskRepository.findById(taskId).get() ?: throw TaskNotFoundException(taskId)
		taskRepository.delete(task)
	}

	fun getCommand(task: TaskRequest, create: Boolean, taskId: Long): TaskCommand {
		val taskDomain = taskRepository.findById(task.dependsOn).get()
		val execution = if(!create) listOf() else taskExecutionService.findAllByTask(taskId)

		return task.toCommand(taskDomain, execution)
	}
}