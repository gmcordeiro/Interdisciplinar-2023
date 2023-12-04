package com.api.adapters.http.task

import com.api.application.task.TaskExecutionService
import com.api.domain.task.Task
import com.api.domain.task.TaskExecution
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RestController

@Component
class TaskExecutionHandler(
	private val taskExecutionService: TaskExecutionService
) {
	fun findAllByTasks(taskID: Long): ResponseEntity<List<TaskExecution>> {
		val executions = taskExecutionService.findAllByTask(taskID)
		return ResponseEntity.ok(executions)
	}

	fun findByID(executionID: Long): ResponseEntity<TaskExecution> {
		val execution = taskExecutionService.findById(executionID)
		return ResponseEntity.ok(execution)
	}

	fun find

}