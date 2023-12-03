package com.api.adapters.http.project

import com.api.application.project.ProjectTypeCommand
import com.api.domain.project.ProjectType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ProjectTypeController(
	private val projectTypeHandler: ProjectTypeHandler
) {
	@GetMapping("/projects/types")
	fun findAll(): ResponseEntity<List<ProjectType>>{
		return projectTypeHandler.findAll()
	}

	@GetMapping("/projects/types/{typeId}")
	fun findById(@PathVariable typeId: Long): ResponseEntity<ProjectType> {
		return projectTypeHandler.findById(typeId)
	}

	@PostMapping("/projects/types/")
	fun insert(@RequestBody projectTypeCommand: ProjectTypeCommand): ResponseEntity<ProjectType>{
		return projectTypeHandler.insert(projectTypeCommand)
	}

	@PutMapping("/projects/type/{typeId}")
	fun update(@RequestBody projectTypeCommand: ProjectTypeCommand, @PathVariable typeId: Long): ResponseEntity<ProjectType>{
		return projectTypeHandler.update(projectTypeCommand, typeId)
	}

}