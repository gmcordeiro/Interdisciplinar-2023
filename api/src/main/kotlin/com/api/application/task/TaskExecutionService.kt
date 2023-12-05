package com.api.application.task

import com.api.application.task.exceptions.TaskNotFoundException
import com.api.application.user.UserService
import com.api.application.user.exceptions.UserNotFoundException
import com.api.domain.task.TaskExecution
import com.api.domain.task.TeskExecutionRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Repository
import java.time.Instant
import java.util.*

@Repository
class TaskExecutionService(
	private val taskExecutionRepository: TeskExecutionRepository,
	private val taskService: TaskService,
	private val userService: UserService,
) {
	fun findById(executionId: Long): TaskExecution?{
		return taskExecutionRepository.findById(executionId).get()
	}
	fun findAllByTask(taskId: Long): List<TaskExecution>{
		return taskExecutionRepository.findAllByTaskId(taskId)
	}

	fun insert (taskId: Long, execution: TaskExecutionRequest, userDetails: UserDetails): TaskExecution? {
		val startedAt = Date.from(Instant.now())
		val finishedAt = null
		val executionCommand = (getCommand(startedAt, finishedAt, execution, userDetails.username, taskId))
		val executionDomain = executionCommand.toTaskExecution()
		taskExecutionRepository.save(executionDomain)
		return executionDomain.id?.let { findById(it) }
	}

	fun done(taskID: Long, executionID: Long, execution: TaskExecutionRequest, userDetails: UserDetails): TaskExecution? {
		val executionDomain = findById(executionID) ?: throw TaskNotFoundException(executionID)
		executionDomain.finishedAt = Date.from(Instant.now())
		executionDomain.details = execution.details
		return taskExecutionRepository.save(executionDomain)
	}

	fun getCommand(startedAt: Date, finishedAt: Date?, execution: TaskExecutionRequest, userEmail: String, taskId: Long): TaskExecutionCommand {
		val user = userService.findByEmail(userEmail) ?: throw UserNotFoundException(userEmail)
		val task = taskService.findById(taskId) ?: throw TaskNotFoundException(taskId)
		return execution.toCommand(startedAt, finishedAt, user, task)
	}

}