package com.api.domain.task

import com.api.domain.user.User
import jakarta.persistence.*
import java.util.Date

@Entity
class TaskExecution (
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Int,
	val startedAt: Date,
	val finishedAt: Date,
	@ManyToOne
	val user: User,
	@ManyToOne
	val task: Task
)