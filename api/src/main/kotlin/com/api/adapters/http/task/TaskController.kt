package com.api.adapters.http.task

import com.api.application.project.ProjectRequest
import com.api.application.task.TaskCommand
import com.api.application.task.TaskRequest
import com.api.domain.task.Task
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class TaskController(
	private val taskHandler: TaskHandler
) {
	@GetMapping("/projects/{projectId}/tasks")
	fun findAllByProject(@PathVariable projectId: Long): ResponseEntity<List<Task>>{
		return taskHandler.findAllByProject(projectId)
	}

	@GetMapping("/projects/{projectId}/tasks/{taskId}")
	fun findByProjectIdAndId(@PathVariable projectId: Long, @PathVariable taskId: Long): ResponseEntity<Task> {
		return taskHandler.findByProjectIdAndId(projectId, taskId)
	}

	@PostMapping("/project/{projectId}/tasks")
	fun insert(@RequestBody task: TaskRequest, @PathVariable projectId: Long): ResponseEntity<Task>{
		return taskHandler.insert(task, projectId)
	}

	@PutMapping("/projects/{projectId}/tasks/{taskId}")
	fun update(@RequestBody task: TaskRequest, @PathVariable projectId: Long, @PathVariable taskId: Long): ResponseEntity<Task> {
		return taskHandler.update(task, projectId, taskId)
	}

	@DeleteMapping("/projects/{projectId}/tasks/{taskId}")
	fun delete(@PathVariable projectId: Long, @PathVariable taskId: Long): ResponseEntity<Boolean>{
		return taskHandler.delete(projectId, taskId)
	}

}