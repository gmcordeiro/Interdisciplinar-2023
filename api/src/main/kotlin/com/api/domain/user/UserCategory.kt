package com.api.domain.user

import jakarta.persistence.*

enum class Role {
	ADMIN, COORDNATOR, COLABORATOR
}

@Entity
class UserCategory (
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	val id: Long? = null,
	val name: String,
	@Enumerated(value = EnumType.STRING)
	val role: Role
)