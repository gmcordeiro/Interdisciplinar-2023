package com.api.adapters.security.response

import kotlinx.serialization.Serializable

@Serializable
data class Token (
	val accessToken: String
)