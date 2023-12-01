package com.api.domain.user

import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType

enum class Role {
	ADMIN, COORDNATOR, COLABORATOR
}

class UserCategory (
	@GeneratedValue(strategy = GenerationType.AUTO)
	val id: Int,
	val name: String,
	val role: Role
)