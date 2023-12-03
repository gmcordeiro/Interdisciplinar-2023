package com.api.application.task

import com.api.domain.task.Task
import com.api.domain.task.TaskExecution
import com.api.domain.user.User
import java.util.Date

data class TaskExecutionCommand (
	val startedAt: Date,
	val finishedAt: Date,
	val details: String,
	val user: User,
	val task: Task
)

data class TaskExecutionRequest(
	val startedAt: Date,
	val finishedAt: Date,
	val details: String,
	val user: Long,
	val task: Long
)

fun TaskExecutionRequest.toCommand(user: User, task: Task) = TaskExecutionCommand(
	startedAt = startedAt,
	finishedAt = finishedAt,
	details = details,
	user = user,
	task = task
)

fun TaskExecutionCommand.toTaskExecution() = TaskExecution (
	startedAt = startedAt,
	finishedAt = finishedAt,
	details = details,
	user = user,
	task = task
)

fun TaskExecutionCommand.toTaskExecution(executionId: Long) = TaskExecution (
	id = executionId,
	startedAt = startedAt,
	finishedAt = finishedAt,
	details = details,
	user = user,
	task = task
)