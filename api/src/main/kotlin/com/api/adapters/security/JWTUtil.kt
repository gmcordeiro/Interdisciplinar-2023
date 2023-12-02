package com.api.adapters.security

import com.api.domain.user.User
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JWTUtil {

	private val expiration: Long = 24 * 60 * 60 * 1000

	@Value("\${jwt.secret}")
	private lateinit var secret: String
	fun generateToken(user: User): String{
		return Jwts.builder()
			.id(user.id.toString())
			.subject(user.email)
			.expiration(Date(System.currentTimeMillis() + expiration))
			.signWith(getSecretKey(), Jwts.SIG.HS512)
			.compact()
	}

	fun getSecretKey(): SecretKey? {
		val keyBytes = Decoders.BASE64.decode(secret)
		return Keys.hmacShaKeyFor(keyBytes)
	}
}