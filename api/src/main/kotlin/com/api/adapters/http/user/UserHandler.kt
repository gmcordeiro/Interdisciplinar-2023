package com.api.adapters.http.user

import com.api.application.user.UserCommand
import com.api.application.user.UserService
import com.api.application.user.UserQuery
import org.springframework.http.HttpStatus
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
	fun findByID(userID: Long): ResponseEntity<UserQuery>{
		val user = userService.findByID(userID)
		return ResponseEntity.ok(user)
	}

	fun insert(user: UserCommand): ResponseEntity<UserQuery> {
		val userQuery = userService.insert(user)
		return ResponseEntity.status(HttpStatus.CREATED).body(userQuery)
	}

	fun update(user: UserCommand, userID: Long): ResponseEntity<UserQuery>{
		val userQuery = userService.update(user, userID)
		return ResponseEntity.status(HttpStatus.OK).body(userQuery)
	}

	fun delete(userID: Long): ResponseEntity<Boolean> {
		val deleted = userService.delete(userID)
		return ResponseEntity.ok(deleted)
	}
}