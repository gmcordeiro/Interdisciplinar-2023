package com.api.application.project

import com.api.domain.project.ProjectTypeRepository
import org.springframework.stereotype.Service

@Service
class ProjectTypeService(
	private val projectTypeRepository: ProjectTypeRepository
) {

}