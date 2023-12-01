package com.api.domain.task

import com.api.domain.user.User
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
class TaskExecution (
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Int,
	val startedAt: LocalDateTime,
	val finishedAt: LocalDateTime,
	@ManyToOne
	val user: User,
	@ManyToOne
	val task: Task
)