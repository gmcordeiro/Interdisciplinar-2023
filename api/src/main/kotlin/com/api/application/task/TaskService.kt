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
		return taskRepository.findByProjectIdAndId(projectId, taskId)
	}

	fun findById(taskId: Long): Task? {
		return taskRepository.findById(taskId).get()
	}

	fun insert(task: TaskRequest, projectId: Long): Task? {
		val taskCommand = getCommand(task, true, projectId)
		val taskDomain = taskRepository.save(taskCommand.toTask())
		return taskDomain.id?.let { findById(it) }
	}

	fun update(task: TaskRequest, taskId: Long, projectId: Long): Task? {
		val taskCommand = getCommand(task, false, projectId)
		val taskDomain = task.dependsOn?.let { taskCommand.toTask(it) }?.let { taskRepository.save(it) }
		return taskDomain?.id?.let { findById(it) }
	}

	fun delete(taskId: Long): Boolean{
		taskRepository.deleteById(taskId) ?: throw TaskNotFoundException(taskId)
		return !taskRepository.existsById(taskId)
	}

	fun getCommand(task: TaskRequest, create: Boolean, projectId: Long): TaskCommand {
		val dependsOndTask = task.dependsOn?.let { taskRepository.findById(it).get() }
		val projectDomain = projectRepository.findById(projectId).get()

		return task.toCommand(projectDomain, dependsOndTask)
	}

	fun done(taskId: Long): Boolean? {
		val task = findById(taskId) ?: throw TaskNotFoundException(taskId)
		task.done = true
		taskRepository.save(task)
		return true
	}
}