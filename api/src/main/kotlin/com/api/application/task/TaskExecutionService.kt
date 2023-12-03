package com.api.application.task

import com.api.application.task.exceptions.TaskNotFoundException
import com.api.application.user.UserService
import com.api.application.user.exceptions.UserNotFoundException
import com.api.domain.task.TaskExecution
import com.api.domain.task.TeskExecutionRepository
import org.springframework.stereotype.Repository

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

	fun insert (execution: TaskExecutionRequest): TaskExecution? {
		val executionCommand = (getCommand(execution))
		val executionDomain = executionCommand.toTaskExecution()
		taskExecutionRepository.save(executionDomain)
		return executionDomain.id?.let { findById(it) }
	}

	fun update (execution: TaskExecutionRequest, executionId: Long): TaskExecution?{
		val executionCommand = (getCommand(execution))
		val executionDomain = executionCommand.toTaskExecution(executionId)
		taskExecutionRepository.save(executionDomain)
		return executionDomain.id?.let { findById(it) }
	}

	fun getCommand (execution: TaskExecutionRequest): TaskExecutionCommand{
		val user = userService.findByID(execution.user) ?: throw UserNotFoundException(userID = execution.user)
		val userDomain = userService.findByEmail(user.email) ?: throw UserNotFoundException(userID = execution.user)

		val task = taskService.findById(execution.task) ?: throw TaskNotFoundException(taskID = execution.task)
		return execution.toCommand(user = userDomain,task = task)
	}
}