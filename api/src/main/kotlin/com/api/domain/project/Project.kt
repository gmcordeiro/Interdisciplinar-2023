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
	val name: String,
	val description: String,
	val goal: String,
	val resources: String,
	var done: Boolean,
	@OneToMany(mappedBy = "project", cascade = [CascadeType.REMOVE])
	val tasks: List<Task>,
	@ManyToOne
	val type: ProjectType,
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
	tasks = if(listTasks) tasks else listOf(),
	type = type,
	owner = owner.toUserQuery()
)