package com.api.adapters.http.project

import com.api.application.project.ProjectRequest
import com.api.domain.project.Project
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ProjectController(
	private val projectHandler: ProjectHandler
) {
	@GetMapping("/projects")
	fun findAll(): ResponseEntity<List<Project>>{
		return projectHandler.findAll()
	}
	@GetMapping("/projects/{projectId}")
	fun findById(@PathVariable projectId: Long): ResponseEntity<Project>{
		return projectHandler.findById(projectId)
	}

	@PostMapping("/projects")
	fun insert(@RequestBody projectRequest: ProjectRequest): ResponseEntity<Project>{
		return projectHandler.insert(projectRequest)
	}

	@PutMapping("/projects/{projectId}")
	fun update(@RequestBody projectRequest: ProjectRequest, @PathVariable projectId: Long): ResponseEntity<Project>{
		return projectHandler.update(projectRequest, projectId)
	}

	@PutMapping("/projects/{projectId}/finish")
	fun finish(@PathVariable projectId: Long): ResponseEntity<Boolean>{
		return projectHandler.done(projectId)
	}

	@DeleteMapping("/projects/{projectId}")
	fun delete(@PathVariable projectId: Long): ResponseEntity<Boolean>{
		return projectHandler.delete(projectId)
	}

}