package com.api.adapters.http.security

import com.api.application.user.UserService
import com.api.domain.user.User
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JWTUtil (
	private val userService: UserService
) {

	private val expiration: Long = 24 * 60 * 60 * 1000

	@Value("\${jwt.secret}")
	private lateinit var secret: String
	fun generateToken(user: User): String{
		return Jwts.builder()
			.id(user.id.toString())
			.subject(user.email)
			.claim("name", user.name)
			.claim("category", user.category.id)
			.claim("role", user.category.role)
			.expiration(Date(System.currentTimeMillis() + expiration))
			.signWith(getSecretKey(), Jwts.SIG.HS512)
			.compact()
	}

	fun getSecretKey(): SecretKey? {
		val keyBytes = Decoders.BASE64.decode(secret)
		return Keys.hmacShaKeyFor(keyBytes)
	}

	fun isValid(jwt: String?): Boolean {
		return try {
			Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(jwt)
			true
		}catch (e: JwtException){
			throw e
		}
	}

	fun getAuthentication(jwt: String?): Authentication {
		val username = Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(jwt).payload.subject
		return UsernamePasswordAuthenticationToken(username, null, null)
	}
}