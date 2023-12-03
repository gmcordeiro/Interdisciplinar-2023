package com.api.domain.project

import org.springframework.data.jpa.repository.JpaRepository

interface ProjectTypeRepository: JpaRepository<ProjectType, Long> {
}