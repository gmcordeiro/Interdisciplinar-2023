package com.api.domain.task

import jakarta.persistence.Entity
import jakarta.persistence.GenerationType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne

@Entity
class Task (
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Int,
	val name: String,
	val description: String,
	val done: Boolean,
	@ManyToOne
	val dependsOn: Task? = null
)