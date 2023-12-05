package com.api.adapters.http

import kotlinx.serialization.json.Json
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.json.KotlinSerializationJsonHttpMessageConverter
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
	override fun addCorsMappings(registry: CorsRegistry) {
		registry.addMapping("/**").allowedOrigins("*")
			.allowedMethods("GET", "PUT", "POST", "DELETE")
	}

	override fun extendMessageConverters(converters: MutableList<HttpMessageConverter<*>>) {
		val converter = KotlinSerializationJsonHttpMessageConverter(
			Json {
				ignoreUnknownKeys = true
			},
		)

		converters.forEachIndexed { index, httpMessageConverter ->
			if (httpMessageConverter is KotlinSerializationJsonHttpMessageConverter) {
				converters[index] = converter
				return
			}
		}
	}
}