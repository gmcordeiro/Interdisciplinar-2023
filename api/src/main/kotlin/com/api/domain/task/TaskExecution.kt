package com.api.domain.task

import com.api.domain.user.User
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import kotlinx.datetime.*

class TaskExecution (
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Int,
	val startedAt: Instant,
	val finishedAt: Instant,
	val user: User,
	val task: Task
)