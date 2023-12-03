package com.api.domain.task

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TeskExecutionRepository: JpaRepository <TaskExecution, Long> {
	override fun findById(executionId: Long): Optional<TaskExecution>
	fun findAllByTask(task: Task): List<TaskExecution>
}