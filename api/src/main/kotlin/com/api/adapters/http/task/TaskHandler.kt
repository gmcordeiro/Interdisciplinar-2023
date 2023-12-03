package com.api.adapters.http.task

import com.api.application.task.TaskService
import org.springframework.stereotype.Component

@Component
class TaskHandler(
	private val taskService: TaskService
) {

}