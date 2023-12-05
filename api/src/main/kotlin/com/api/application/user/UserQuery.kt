package com.api.application.user

import com.api.domain.user.User
import com.api.domain.user.UserCategory

data class UserQuery(
    val id: Long?,
    val name: String,
    val email: String,
    val category: UserCategory,
	val rg: String,
	val cpf: String,
	val phone: String,
	val father: String,
	val mother: String,
	val academic: Boolean,
	val ra: String,
	val course: String,
	val period: String
)