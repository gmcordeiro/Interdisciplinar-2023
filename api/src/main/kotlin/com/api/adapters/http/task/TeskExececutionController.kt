package com.api.adapters.http.task

import com.api.application.task.TaskExecutionRequest
import com.api.domain.task.TaskExecution
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class TeskExececutionController(
	private val taskExecutionHandler: TaskExecutionHandler
) {
	@GetMapping("/tasks/{taskID}/executions")
	fun findAllByTasks(@PathVariable taskID: Long): ResponseEntity<List<TaskExecution>> {
		return taskExecutionHandler.findAllByTasks(taskID)
	}

	@GetMapping("/tasks/{taskID}/executions/{executionID}")
	fun findById(@PathVariable taskID: Long, @PathVariable executionID: Long): ResponseEntity<TaskExecution> {
		return taskExecutionHandler.findByID(executionID)
	}

	@PostMapping("/tasks/{taskID}/executions")
	fun insert(@PathVariable taskID: Long, @RequestBody execution: TaskExecutionRequest, @AuthenticationPrincipal userDetails: UserDetails): ResponseEntity<TaskExecution> {
		return taskExecutionHandler.insert(taskID, execution, userDetails)
	}

	@PutMapping("/tasks/{taskID}/executions/{executionID}/finish")
	fun finish(@PathVariable taskID: Long, @PathVariable executionID: Long, @RequestBody execution: TaskExecutionRequest, @AuthenticationPrincipal userDetails: UserDetails): ResponseEntity<TaskExecution> {
		return  taskExecutionHandler.done(taskID, executionID, execution, userDetails)
	}
}