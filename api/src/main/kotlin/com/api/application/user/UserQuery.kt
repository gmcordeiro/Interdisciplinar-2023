package com.api.application.user

import com.api.domain.user.User
import com.api.domain.user.UserCategory

data class UserQuery(
    val id: Long,
    val name: String,
    val email: String,
    val category: UserCategory
)

fun UserQuery.fromUser(user: User) = UserQuery(
	id = id,
	name = name,
	email = email,
	category = category
)
