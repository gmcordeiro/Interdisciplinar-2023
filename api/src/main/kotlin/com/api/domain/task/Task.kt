package com.api.domain.task

import jakarta.persistence.GenerationType
import jakarta.persistence.GeneratedValue

class Task (
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Int,
	val name: String,
	val description: String,
	val done: Boolean,
	val dependsOn: Task?
)