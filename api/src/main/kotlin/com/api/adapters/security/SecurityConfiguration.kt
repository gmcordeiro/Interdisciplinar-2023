package com.api.adapters.security

import com.api.adapters.security.exceptions.CurstomEntryPoint
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfiguration {
	@Bean
	fun filterChain(http: HttpSecurity): SecurityFilterChain{
		return http.authorizeHttpRequests {
			it.requestMatchers("/login/**").permitAll()
			it.anyRequest().permitAll()
		}.csrf{
			it.disable()
		}.exceptionHandling{
			it.authenticationEntryPoint(CurstomEntryPoint())
		}.build()
	}
}