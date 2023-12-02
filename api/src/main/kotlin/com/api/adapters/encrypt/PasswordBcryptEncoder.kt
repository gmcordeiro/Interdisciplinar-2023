package com.api.adapters.encrypt

import com.api.application.user.EncoderPassword
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class PasswordBcryptEncoder (
	private val passwordEncoder: PasswordEncoder,
): EncoderPassword {
	override fun encode(password: String): String {
		return passwordEncoder.encode(password)
	}

	override fun matches(rawPassword: String, encoderPassword: String): Boolean {
		return passwordEncoder.matches(rawPassword, encoderPassword)
	}
}