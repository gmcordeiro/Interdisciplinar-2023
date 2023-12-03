package com.api.adapters.http.task

import org.springframework.web.bind.annotation.RestController

@RestController
class TeskExececutionController(
	private val taskExecutionHandler: TaskExecutionHandler
) {
}