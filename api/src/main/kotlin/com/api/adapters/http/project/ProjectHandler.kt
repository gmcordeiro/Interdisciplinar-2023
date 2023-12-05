package com.api.adapters.http.project

import com.api.application.project.ProjectQuery
import com.api.application.project.ProjectRequest
import com.api.application.project.ProjectService
import com.api.domain.project.Project
import com.api.domain.project.toProjectQuery
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class ProjectHandler(
	private val projectService: ProjectService
) {
	fun findAll(): ResponseEntity<List<ProjectQuery>> {
		val projects = projectService.findAll()
		return ResponseEntity.ok(projects)
	}

	fun findById(projectId: Long): ResponseEntity<ProjectQuery> {
		val project = projectService.findById(projectId)
		return ResponseEntity.ok(project?.toProjectQuery(true))
	}

	fun insert(projectRequest: ProjectRequest): ResponseEntity<ProjectQuery> {
		val project = projectService.insert(projectRequest)
		return ResponseEntity.status(HttpStatus.CREATED).body(project?.toProjectQuery(true))
	}

	fun update(projectRequest: ProjectRequest, projectId: Long): ResponseEntity<ProjectQuery> {
		val project = projectService.update(projectRequest, projectId)
		return ResponseEntity.status(HttpStatus.OK).body(project?.toProjectQuery(true))
	}

	fun delete(projectId: Long): ResponseEntity<Boolean>{
		val delete = projectService.delete(projectId)
		return ResponseEntity.ok(delete)
	}

	fun done(projectId: Long): ResponseEntity<Boolean> {
		val project = projectService.done(projectId)
		return ResponseEntity.ok(project)
	}

}