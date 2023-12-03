package com.api.application.user

import com.api.domain.user.User
import com.api.domain.user.UserCategory

data class UserCommand(
	val name: String,
	val email: String,
	var category: UserCategory,
	var password: String
)

data class UserRequest(
	val name: String,
	val email: String,
	var category: Long,
	var password: String
)

fun UserRequest.toCommand(category: UserCategory) = UserCommand(
	name = name,
	email = email,
	category = category,
	password = password
)

fun UserCommand.toUser() = User (
	name = name,
	email = email,
	category = category,
	password = password
)

fun UserCommand.toUser(userID: Long?) = User (
	id = userID,
	name = name,
	email = email,
	category = category,
	password = password
)