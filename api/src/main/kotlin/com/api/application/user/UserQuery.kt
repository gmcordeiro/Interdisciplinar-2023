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
	val telefone: String,
	val father: String,
	val mother: String,
	val academic: Boolean,
	val ra: String,
	val curse: String,
	val period: String
)

fun UserQuery.fromUser(user: User) = UserQuery(
	id = id,
	name = name,
	email = email,
	category = category,
	rg = rg,
	cpf = cpf,
	telefone = telefone,
	father = father,
	mother = mother,
	academic = academic,
	ra = ra,
	curse = curse,
	period = period
)
