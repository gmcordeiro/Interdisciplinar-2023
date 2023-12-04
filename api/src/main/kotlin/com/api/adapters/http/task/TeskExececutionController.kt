package com.api.adapters.http.task

import com.api.domain.task.TaskExecution
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class TeskExececutionController(
	private val taskExecutionHandler: TaskExecutionHandler
) {
	@GetMapping("/tasks/{taskID}/executions")
	fun findAllByTasks(@PathVariable taskID: Long): ResponseEntity<List<TaskExecution>> {
		return taskExecutionHandler.findAllByTasks(taskID)
	}

	@GetMapping("/executions/{executionID}")
	fun findById(@PathVariable executionID: Long): ResponseEntity<TaskExecution> {
			TODO("Don't yet implemented")
	}
}