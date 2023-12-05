package com.api.application.user

import com.api.domain.user.User
import com.api.domain.user.UserCategory

data class UserCommand(
	val name: String,
	val email: String,
	var category: UserCategory,
	var password: String,
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

data class UserRequest(
	val name: String,
	val email: String,
	var category: Long,
	var password: String,
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

fun UserRequest.toCommand(category: UserCategory) = UserCommand(
	name = name,
	email = email,
	category = category,
	password = password,
	rg = rg,
	cpf = cpf,
	phone = phone,
	father = father,
	mother = mother,
	academic = academic,
	ra = ra,
	course = course,
	period = period
)

fun UserCommand.toUser() = User (
	name = name,
	email = email,
	category = category,
	password = password,
	rg = rg,
	cpf = cpf,
	phone = phone,
	father = father,
	mother = mother,
	academic = academic,
	ra = ra,
	course = course,
	period = period
)

fun UserCommand.toUser(userID: Long?) = User (
	id = userID,
	name = name,
	email = email,
	category = category,
	password = password,
	rg = rg,
	cpf = cpf,
	phone = phone,
	father = father,
	mother = mother,
	academic = academic,
	ra = ra,
	course = course,
	period = period
)