package com.api.adapters.http.user

import com.api.application.user.UserCategoryCommand
import com.api.domain.user.UserCategory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UserCategoryController(
	private val userCategoryHandler: UserCategoryHandler
) {
	@GetMapping("/users/categories")
	fun findAll(): ResponseEntity<List<UserCategory>>{
		return userCategoryHandler.findAll()
	}

	@GetMapping("/users/categories/{categoryID}")
	fun findByID(@PathVariable categoryID: Long): ResponseEntity<UserCategory>{
		return userCategoryHandler.findById(categoryID)
	}

	@PostMapping("/users/categories")
	fun insert(@RequestBody category: UserCategoryCommand): ResponseEntity<UserCategory>{
		return userCategoryHandler.insert(category)
	}

}