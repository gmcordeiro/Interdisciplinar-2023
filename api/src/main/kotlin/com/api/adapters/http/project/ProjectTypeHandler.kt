package com.api.adapters.http.project

import com.api.application.project.ProjectTypeService
import org.springframework.stereotype.Component

@Component
class ProjectTypeHandler(
	private val projectTypeService: ProjectTypeService
) {

}