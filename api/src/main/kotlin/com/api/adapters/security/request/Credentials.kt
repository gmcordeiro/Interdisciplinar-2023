package com.api.adapters.security.request

import kotlinx.serialization.Serializable

@Serializable
data class Credentials(
	val email: String,
	val password: String
)