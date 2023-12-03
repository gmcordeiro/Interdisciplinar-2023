package com.api.application.project

import com.api.domain.project.Project
import com.api.domain.project.ProjectType
import com.api.domain.task.Task
import com.api.domain.user.User

data class ProjectCommand(
	val name: String,
	val description: String,
	val goal: String,
	val resources: String,
	val done: Boolean,
	val tasks: List<Task>,
	val type: ProjectType,
	val owner: User
)

data class ProjectRequest(
	val name: String,
	val description: String,
	val goal: String,
	val resources: String,
	val done: Boolean,
	val type: Long,
	val owner: Long
)

fun ProjectRequest.toCommand(tasks: List<Task>, type: ProjectType, owner: User) = ProjectCommand(
	name = name,
	description = description,
	goal = goal,
	resources = resources,
	done = done,
	tasks = tasks,
	type = type,
	owner = owner
)

fun ProjectCommand.toProject() = Project(
	name = name,
	description = description,
	goal = goal,
	resources = resources,
	done = done,
	tasks = tasks,
	type = type,
	owner = owner
)