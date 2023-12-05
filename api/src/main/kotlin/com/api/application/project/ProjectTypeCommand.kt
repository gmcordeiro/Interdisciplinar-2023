package com.api.application.project

import com.api.domain.project.ProjectType

data class ProjectTypeCommand(
	val name: String
)

fun ProjectTypeCommand.toProjectType() = ProjectType(
	name = name
)

fun ProjectTypeCommand.toProjectType(typeId: Long) = ProjectType(
	id = typeId,
	name = name
)