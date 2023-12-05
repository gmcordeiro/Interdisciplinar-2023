package com.api.application.user

import org.springframework.stereotype.Repository

@Repository
interface EncoderPassword {
	fun encode(password: String): String

	fun matches(rawPassword: String, encoderPassword: String): Boolean
}