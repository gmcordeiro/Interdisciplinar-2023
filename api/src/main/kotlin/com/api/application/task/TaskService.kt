package com.api.application.task

import com.api.domain.task.Task
import com.api.domain.task.TaskExecution
import com.api.domain.task.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService(
	private val taskRepository: TaskRepository
) {
	fun findAll(): List<Task>{
		return taskRepository.findAll()
	}

	fun findById(taksId: Long): Task? {
		return taskRepository.findById(taksId).get()
	}

}