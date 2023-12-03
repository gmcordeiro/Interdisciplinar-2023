package com.api.domain.task

import com.api.domain.project.Project
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskRepository: JpaRepository <Task, Long> {
	override fun findById(taskId: Long): Optional<Task>
	fun findAllByProject(project: Project): List<Task>
	fun findByProjectIdAndId(projectId: Long, taskId: Long): Optional<Task>
}