package com.api.domain.task

import com.api.domain.project.Project
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GenerationType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany

@Entity
class Task (
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Long? = null,
	val name: String,
	val description: String,
	val done: Boolean,
	@ManyToOne
	val project: Project,
	@ManyToOne
	val dependsOn: Task? = null,
	@OneToMany(mappedBy = "task", cascade = [CascadeType.REMOVE])
	val executions: List<TaskExecution>?
)