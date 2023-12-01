package com.api.adapters.http


import com.api.application.user.UserLogin
import com.api.application.user.UserQuery
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

class UserCtrl(
    private val userHandler: UserHandler
) {
    @GetMapping("/users")
    fun findAll(): ResponseEntity<List<UserQuery>>{
        return userHandler.findAll()
    }

    @GetMapping("/users/{userEmail}")
    fun findByEmail(@PathVariable userEmail: String): ResponseEntity<UserQuery> {
        return userHandler.findByEmail(userEmail)
    }

    @GetMapping("/users/{userID}")
    fun findByID(@PathVariable userID: Long): ResponseEntity<UserQuery> {
        TODO("Not yet implemented")
    }

    @PostMapping("/auth/login")
    fun login(@RequestBody userLogin: UserLogin): ResponseEntity<UserQuery>{
        TODO("Not yet implemented")
    }
}