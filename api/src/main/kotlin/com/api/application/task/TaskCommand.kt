package com.api.application.task

import com.api.domain.project.Project
import com.api.domain.task.Task
import com.api.domain.task.TaskExecution
import com.api.domain.user.User
import java.util.Date

data class TaskCommand (
	val name: String,
	val description: String,
	val done: Boolean,
	val project: Project,
	val dependsOn: Task?
//	val executions: List<TaskExecution>?
)

data class TaskRequest(
	val name: String,
	val description: String,
	val done: Boolean,
	val dependsOn: Long? = null
)

fun TaskRequest.toCommand(project: Project, dependsOndTask: Task?) = TaskCommand(
	name = name,
	description = description,
	done = done,
	project = project,
	dependsOn = dependsOndTask
)

fun TaskCommand.toTask() = Task (
	name = name,
	description = description,
	done = done,
	project = project,
	dependsOn = dependsOn
)

fun TaskCommand.toTask(taskId: Long) = Task (
	id = taskId,
	name = name,
	description = description,
	done = done,
	project = project,
	dependsOn = dependsOn
)