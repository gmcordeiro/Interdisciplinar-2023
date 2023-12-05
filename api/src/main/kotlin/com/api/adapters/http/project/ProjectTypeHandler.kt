package com.api.adapters.http.project

import com.api.application.project.ProjectTypeCommand
import com.api.application.project.ProjectTypeService
import com.api.domain.project.ProjectType
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class ProjectTypeHandler(
	private val projectTypeService: ProjectTypeService
) {
	fun findAll(): ResponseEntity<List<ProjectType>> {
		val types = projectTypeService.findAll()
		return ResponseEntity.ok(types)
	}
	fun findById(typeId: Long): ResponseEntity<ProjectType> {
		val type = projectTypeService.findById(typeId)
		return ResponseEntity.ok(type)
	}
	fun insert(projectTypeCommand: ProjectTypeCommand): ResponseEntity<ProjectType> {
		val projectType = projectTypeService.insert(projectTypeCommand)
		return ResponseEntity.status(HttpStatus.CREATED).body(projectType)
	}
	fun update(projectTypeCommand: ProjectTypeCommand, typeId: Long): ResponseEntity<ProjectType> {
		val projectType = projectTypeService.update(projectTypeCommand, typeId)
		return ResponseEntity.status(HttpStatus.OK).body(projectType)
	}
}