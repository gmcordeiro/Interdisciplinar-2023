package com.api.adapters.http.security

import com.api.adapters.http.security.exceptions.InvalidcredentialsExceptions
import com.api.adapters.http.security.request.Credentials
import com.api.adapters.http.security.response.Token
import com.api.application.user.EncoderPassword
import com.api.application.user.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class LogginController (
	private val userService: UserService,
	private val encoderPassword: EncoderPassword,
	private val jwtUtil: JWTUtil
) {
	@PostMapping("/auth/login")
	fun auth(@RequestBody credentials: Credentials): ResponseEntity<Token> {
		val user = userService.findByEmail(credentials.email) ?: throw InvalidcredentialsExceptions()

		if (encoderPassword.matches(encoderPassword.encode(credentials.password), user.password)){
			throw InvalidcredentialsExceptions()
		}
		val accessToken = jwtUtil.generateToken(user) ?: throw InvalidcredentialsExceptions()
		return ResponseEntity.ok(Token(accessToken))
	}
}