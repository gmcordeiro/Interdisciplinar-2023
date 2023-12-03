package com.api.domain.user

import com.api.application.user.UserQuery
import jakarta.persistence.*

enum class Role {
	ADMIN, COORDINATOR, COLLABORATOR
}

@Entity
class UserCategory (
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	val id: Long? = null,
	@Column(unique = true)
	val name: String,
	@Enumerated(value = EnumType.STRING)
	val role: Role
)