package com.api.adapters.http

import com.api.application.user.UserService
import com.api.application.user.UserQuery
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component

@Component
class UserHandler (
    private val userService: UserService
) {
    fun findAll(): ResponseEntity<List<UserQuery>>{
        val user = userService.findAll()
        return ResponseEntity.ok(user)
	}
	fun findByEmail(userEmail: String): ResponseEntity<UserQuery>{
        val user = userService.findByEmail(userEmail)
        return ResponseEntity.ok(user)
    }
	fun findByID(userID: Long): ResponseEntity<UserQuery>{
		val user = userService.findByID(userID)
		return ResponseEntity.ok(user)
	}

}