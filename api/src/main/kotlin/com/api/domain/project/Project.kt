package com.api.domain.project

import com.api.domain.task.Task
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType

class Project (
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Int,
	val name: String,
	val description: String,
	val goal: String,
	val resources: String,
	val done: Boolean,
	val task: List<Task>,
	val type: ProjectType
)