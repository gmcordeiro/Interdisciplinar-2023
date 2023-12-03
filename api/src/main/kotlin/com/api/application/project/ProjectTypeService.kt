package com.api.application.project

import com.api.domain.project.ProjectType
import com.api.domain.project.ProjectTypeRepository
import org.springframework.stereotype.Service

@Service
class ProjectTypeService(
	private val projectTypeRepository: ProjectTypeRepository
) {
	fun findAll(): List<ProjectType> {
		return projectTypeRepository.findAll()
	}
	fun findById(typeId: Long): ProjectType? {
		return projectTypeRepository.findById(typeId).get()
	}
	fun insert(projectTypeCommand: ProjectTypeCommand): ProjectType? {
		val projectTypeDomain = projectTypeCommand.toProjectType()
		val type = projectTypeRepository.save(projectTypeDomain)
		return type.id?.let { findById(it) }
	}
	fun update(projectTypeCommand: ProjectTypeCommand, typeId: Long): ProjectType? {
		val type = projectTypeRepository.save(projectTypeCommand.toProjectType(typeId))
		return type.id?.let { findById(it) }
	}

}