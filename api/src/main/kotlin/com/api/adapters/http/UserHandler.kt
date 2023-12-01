package com.api.adapters.http

import com.api.application.user.UserService
import com.api.application.user.UserQuery
import org.springframework.http.ResponseEntity

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
}