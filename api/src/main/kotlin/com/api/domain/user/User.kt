package com.api.domain.user

import com.api.application.user.UserQuery
import jakarta.persistence.*

@Entity
class User(
	@Id @GeneratedValue(strategy= GenerationType.IDENTITY)
	val id: Long? = null,
	val name: String,
	@Column(unique = true)
	val email: String,
	@ManyToOne
	val category: UserCategory,
	val password: String
)
fun User.toUserQuery() = id?.let {
	UserQuery(
		id = it,
		name = name,
		email = email,
		category = category
	)
}
