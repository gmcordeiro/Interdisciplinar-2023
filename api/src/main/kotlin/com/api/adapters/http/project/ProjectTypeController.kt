package com.api.adapters.http.project

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ProjectTypeController(
	private val projectTypeHandler: ProjectTypeHandler
) {
}