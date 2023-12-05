package com.api.domain.project

import com.api.application.project.ProjectQuery
import com.api.domain.task.Task
import com.api.domain.user.User
import com.api.domain.user.toUserQuery
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany

@Entity
class Project (
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Long? = null,
	var name: String,
	var description: String,
	var goal: String,
	var resources: String,
	var done: Boolean,
	@ManyToOne
	var type: ProjectType,
	@ManyToOne
	val owner: User
)

fun Project.toProjectQuery(listTasks: Boolean) = ProjectQuery(
	id = id,
	name = name,
	description = description,
	goal = goal,
	resources = resources,
	done = done,
	type = type,
	owner = owner.toUserQuery()
)