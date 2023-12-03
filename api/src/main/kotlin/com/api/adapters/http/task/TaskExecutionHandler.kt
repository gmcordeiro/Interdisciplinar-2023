package com.api.adapters.http.task

import com.api.application.task.TaskExecutionService
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RestController

@Component
class TaskExecutionHandler(
	private val taskExecutionService: TaskExecutionService
) {

}