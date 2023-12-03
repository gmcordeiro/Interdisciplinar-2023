package com.api.domain.task

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskRepository: JpaRepository <Task, Long> {
	override fun findById(taskId: Long): Optional<Task>
}