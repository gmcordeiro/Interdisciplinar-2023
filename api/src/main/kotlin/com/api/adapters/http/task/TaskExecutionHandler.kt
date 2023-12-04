package com.api.adapters.http.task

import com.api.application.task.TaskExecutionRequest
import com.api.application.task.TaskExecutionService
import com.api.domain.task.Task
import com.api.domain.task.TaskExecution
import com.api.domain.user.User
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.Date

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

	fun insert(taskId: Long, execution: TaskExecutionRequest, userDetails: UserDetails): ResponseEntity<TaskExecution> {
		val executionDomain = taskExecutionService.insert(taskId, execution, userDetails)
		return ResponseEntity.ok(executionDomain)
	}

	fun done(taskID: Long, executionID: Long, execution: TaskExecutionRequest, userDetails: UserDetails): ResponseEntity<TaskExecution> {
		TODO("Don't yet implemented")
	}

}