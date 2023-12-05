package com.api.domain.user

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserCategoryRepository: JpaRepository<UserCategory, Long> {
	fun findByName(categoryName: String): Optional<UserCategory>
}