package com.api.application.project

import com.api.application.user.UserQuery
import com.api.domain.project.ProjectType
import com.api.domain.task.Task

data class ProjectQuery(
	val id: Long?,
	val name: String,
	val description: String,
	val goal: String,
	val resources: String,
	val done: Boolean,
	val type: ProjectType,
	val owner: UserQuery
)