package com.api.domain.user

import jakarta.persistence.*

@Entity
class User (
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    val id: Long? = null,
	val name: String,
	@Column(unique = true)
	val email: String,
	@ManyToOne
	val category: UserCategory,
	val password: String
)