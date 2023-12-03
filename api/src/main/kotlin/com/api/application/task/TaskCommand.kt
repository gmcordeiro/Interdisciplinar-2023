package com.api.application.task

import com.api.domain.task.Task
import com.api.domain.task.TaskExecution
import com.api.domain.user.User
import java.util.Date

data class TaskCommand (
	val name: String,
	val description: String,
	val done: Boolean,
	val dependsOn: Task?,
	val executions: List<TaskExecution>?
)

data class TaskRequest(
	val name: String,
	val description: String,
	val done: Boolean,
	val dependsOn: Long,
	val execution: Long
)

fun TaskRequest.toCommand(task: Task, executions: List<TaskExecution>) = TaskCommand(
	name = name,
	description = description,
	done = done,
	dependsOn = task,
	executions = executions
)

fun TaskCommand.toTaskExecution() = Task (
	name = name,
	description = description,
	done = done,
	dependsOn = dependsOn,
	executions = executions
)

fun TaskCommand.toTaskExecution(taskId: Long) = Task (
	id = taskId,
	name = name,
	description = description,
	done = done,
	dependsOn = dependsOn,
	executions = executions
)