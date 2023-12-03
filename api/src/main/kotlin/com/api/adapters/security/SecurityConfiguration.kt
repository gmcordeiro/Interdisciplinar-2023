package com.api.adapters.security

import com.api.adapters.security.exceptions.CurstomEntryPoint
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
class SecurityConfiguration(
	private val jwtUtil: JWTUtil
) {
	@Bean
	fun filterChain(http: HttpSecurity): SecurityFilterChain{
		return http.authorizeHttpRequests {
			it.requestMatchers("/login/**").permitAll()
			it.requestMatchers("/users/**").permitAll()
			it.anyRequest().permitAll()
		}.csrf{
			it.disable()
		}.addFilterBefore(JwsAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter::class.java)
			.sessionManagement{
			it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		}.exceptionHandling{
			it.authenticationEntryPoint(CurstomEntryPoint())
		}.build()
	}
}