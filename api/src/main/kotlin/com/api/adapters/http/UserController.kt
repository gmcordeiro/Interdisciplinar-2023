package com.api.adapters.http


import com.api.application.user.UserLogin
import com.api.application.user.UserQuery
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController(
    private val userHandler: UserHandler
) {
    @GetMapping("/users")
    fun findAll(): ResponseEntity<List<UserQuery>>{
        return userHandler.findAll()
    }

    @GetMapping("/users/{userID}")
    fun findByID(@PathVariable userID: Long): ResponseEntity<UserQuery> {
        return userHandler.findByID(userID)
    }
}