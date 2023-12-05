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

fun ProjectRequest.toCommand(type: ProjectType, owner: User) = ProjectCommand(
	name = name,
	description = description,
	goal = goal,
	resources = resources,
	done = done,
	type = type,
	owner = owner
)

fun ProjectCommand.toProject() = Project(
	name = name,
	description = description,
	goal = goal,
	resources = resources,
	done = done,
	type = type,
	owner = owner
)