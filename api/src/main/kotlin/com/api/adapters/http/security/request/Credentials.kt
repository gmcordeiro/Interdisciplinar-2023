package com.api.adapters.http.security.request

import kotlinx.serialization.*


@Serializable
data class Credentials(
	val email: String,
	val password: String
)