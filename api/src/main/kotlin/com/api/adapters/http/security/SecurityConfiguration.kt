package com.api.adapters.http.security

import com.api.adapters.http.security.exceptions.CurstomEntryPoint
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class SecurityConfiguration(
	private val jwtUtil: JWTUtil
) {
	@Bean
	fun filterChain(http: HttpSecurity): SecurityFilterChain{
		return http.authorizeHttpRequests {
			it.requestMatchers(HttpMethod.OPTIONS).permitAll()
			it.requestMatchers("/auth/login/**").permitAll()
			it.anyRequest().authenticated()
		}.cors{
			it.disable()
		}.csrf{
			it.disable()
		}.addFilterBefore(JwsAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter::class.java)
			.sessionManagement{
			it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		}.exceptionHandling{
			it.authenticationEntryPoint(CurstomEntryPoint())
		}.build()
	}
	@Bean
	fun corsConfigurer(): WebMvcConfigurer {
		return object : WebMvcConfigurer {
			override fun addCorsMappings(registry: org.springframework.web.servlet.config.annotation.CorsRegistry) {
				registry.addMapping("/*")
					.allowedOrigins("")
					.allowedMethods("")
					.allowedHeaders("")
					.allowCredentials(true)
			}
		}
	}
}