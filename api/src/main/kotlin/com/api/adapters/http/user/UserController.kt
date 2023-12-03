package com.api.adapters.http.user


import com.api.application.user.*
import com.api.application.user.exceptions.UserCategoryNotFoundException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController(
    private val userHandler: UserHandler,
    private val encoderPassword: EncoderPassword
) {
    @GetMapping("/users")
    fun findAll(): ResponseEntity<List<UserQuery>>{
        return userHandler.findAll()
    }

    @GetMapping("/users/{userID}")
    fun findByID(@PathVariable userID: Long): ResponseEntity<UserQuery> {
        return userHandler.findByID(userID)
    }

    @PostMapping("/users")
    fun insert(@RequestBody user: UserRequest): ResponseEntity<UserQuery>{
        user.password = encoderPassword.encode(user.password)
        return userHandler.insert(user)
    }

    @PutMapping("/users/{userID}")
    fun update(@RequestBody user: UserRequest, @PathVariable userID: Long): ResponseEntity<UserQuery>{
        return userHandler.update(user, userID)
    }

    @DeleteMapping("/users/{userID}")
    fun delete(@PathVariable userID: Long): ResponseEntity<Boolean>{
        return userHandler.delete(userID)
    }

}