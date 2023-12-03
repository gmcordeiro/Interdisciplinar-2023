package com.api.application.user

import com.api.domain.user.Role
import com.api.domain.user.UserCategory

data class UserCategoryCommand(
	val name: String,
	val role: Role
)

fun UserCategoryCommand.toUserCategory() = UserCategory (
	name = name,
	role = role
)

fun UserCategoryCommand.toUserCategory(userID: Long?) = UserCategory (
	id = userID,
	name = name,
	role = role
)