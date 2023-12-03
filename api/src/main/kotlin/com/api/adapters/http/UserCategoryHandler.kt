package com.api.adapters.http

import com.api.application.user.UserCategoryCommand
import com.api.application.user.UserCategoryService
import com.api.domain.user.UserCategory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class UserCategoryHandler(
	private val userCategoryService: UserCategoryService
) {
	fun findAll(): ResponseEntity<List<UserCategory>>{
		val category = userCategoryService.findAll()
		return ResponseEntity.ok(category)
	}

	fun findById(categoryID: Long): ResponseEntity<UserCategory>{
		val category = userCategoryService.findByID(categoryID)
		return ResponseEntity.ok(category)
	}

	fun findByName(categoryName: String): ResponseEntity<UserCategory>{
		val category = userCategoryService.findByName(categoryName)
		return ResponseEntity.ok(category)
	}

	fun insert(userCategory: UserCategoryCommand): ResponseEntity<UserCategory>{
		val category = userCategoryService.insert(userCategory)
		return ResponseEntity.status(HttpStatus.CREATED).body(category)
	}
}