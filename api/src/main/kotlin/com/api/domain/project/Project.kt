package com.api.domain.project

import com.api.domain.task.Task
import com.api.domain.user.User
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany

@Entity
class Project (
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Int,
	val name: String,
	val description: String,
	val goal: String,
	val resources: String,
	val done: Boolean,
	@OneToMany
	val task: List<Task>,
	@ManyToOne
	val type: ProjectType,
	@ManyToOne
	val owner: User
)