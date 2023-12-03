package com.api.adapters.http.user


import com.api.application.user.*
import com.api.application.user.exceptions.UserCategoryNotFoundException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController(
    private val userHandler: UserHandler,
    private val userCategoryService: UserCategoryService,
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
    fun insert(@RequestBody user: UserCreatedRequest): ResponseEntity<UserQuery>{
        user.password = encoderPassword.encode(user.password)
        val category = userCategoryService.findByID(user.category) ?: throw UserCategoryNotFoundException(categoryID = user.category)
        val userCommand = user.toCommand(category)
        return userHandler.insert(userCommand)
    }

    @PutMapping("/users/{userID}")
    fun update(@RequestBody user: UserCommand, @PathVariable userID: Long): ResponseEntity<UserQuery>{
        return userHandler.update(user, userID)
    }

    @DeleteMapping("/users/{userID}")
    fun dalete(@PathVariable userID: Long): ResponseEntity<Boolean>{
        return userHandler.delete(userID)
    }

}