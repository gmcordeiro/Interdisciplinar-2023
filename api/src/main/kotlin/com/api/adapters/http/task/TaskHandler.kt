package com.api.adapters.http.task

import com.api.application.task.TaskCommand
import com.api.application.task.TaskRequest
import com.api.application.task.TaskService
import com.api.domain.task.Task
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class TaskHandler(
	private val taskService: TaskService
) {
	fun findAllByProject(projectId: Long): ResponseEntity<List<Task>>{
		val task = taskService.findAllByProject(projectId)
		return ResponseEntity.ok(task)
	}

	fun findByProjectIdAndId(projectId: Long, taskId: Long): ResponseEntity<Task> {
		val task = taskService.findByProjectIdAndId(projectId, taskId)
		return ResponseEntity.ok(task)
	}

	fun insert(taskRequest: TaskRequest, projectId: Long): ResponseEntity<Task> {
		val task = taskService.insert(taskRequest, projectId)
		return ResponseEntity.status(HttpStatus.CREATED).body(task)
	}

	fun update(taskRequest: TaskRequest, projectId: Long, taskId: Long): ResponseEntity<Task> {
		val task = taskService.update(taskRequest, taskId, projectId)
		return ResponseEntity.status(HttpStatus.OK).body(task)
	}

	fun delete(projectId: Long, taskId: Long): ResponseEntity<Boolean>{
		val taskDeleted = taskService.delete(taskId)
		return ResponseEntity.ok(taskDeleted)
	}

	fun done(taskId: Long): ResponseEntity<Boolean> {
		val task = taskService.done(taskId)
		return ResponseEntity.ok(task)
	}


}