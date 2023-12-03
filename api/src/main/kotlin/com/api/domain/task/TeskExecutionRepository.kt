package com.api.domain.task

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TeskExecutionRepository: JpaRepository <TaskExecution, Long> {
}