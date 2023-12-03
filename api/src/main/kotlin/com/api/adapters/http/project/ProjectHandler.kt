package com.api.adapters.http.project

import com.api.application.project.ProjectRequest
import com.api.application.project.ProjectService
import com.api.domain.project.Project
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class ProjectHandler(
	private val projectService: ProjectService
) {
	fun findAll(): ResponseEntity<List<Project>> {
		val projects = projectService.findAll()
		return ResponseEntity.ok(projects)
	}

	fun findById(projectId: Long): ResponseEntity<Project> {
		val project = projectService.findById(projectId)
		return ResponseEntity.ok(project)
	}

	fun insert(projectRequest: ProjectRequest): ResponseEntity<Project> {
		val project = projectService.insert(projectRequest)
		return ResponseEntity.status(HttpStatus.CREATED).body(project)
	}

	fun update(projectRequest: ProjectRequest, projectId: Long): ResponseEntity<Project> {
		val project = projectService.update(projectRequest, projectId)
		return ResponseEntity.status(HttpStatus.OK).body(project)
	}

	fun delete(projectId: Long): ResponseEntity<Boolean>{
		val delete = projectService.delete(projectId)
		return ResponseEntity.ok(delete)
	}

}