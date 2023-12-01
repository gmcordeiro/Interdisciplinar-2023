package com.api.domain.project

import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType

class ProjectType(
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	val id: Int,
	val name: String
)