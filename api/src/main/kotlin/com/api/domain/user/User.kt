package com.api.domain.user

import com.squareup.moshi.Json
import jakarta.persistence.Column
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType

class User (
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    val id: Int,
	val name: String,
	@Column(unique = true)
	val email: String,
	val category: UserCategory,

	val password: String

)