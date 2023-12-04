package com.api.application.user

import com.api.application.user.exceptions.UserNotFoundException
import com.api.domain.user.*
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class UserService (
    private val userRepository: UserRepository,
    private val userCategoryRepository: UserCategoryRepository,
    private val encoderPassword: EncoderPassword
) {
    fun findAll(): List<UserQuery> {
        val listUserQuery: ArrayList<UserQuery> = arrayListOf()
        val userList = userRepository.findAll()
        for (user in userList){
            val userQuery = user.toUserQuery()
            listUserQuery.add(userQuery)
        }
        return listUserQuery
    }

    fun findByEmail(userEmail: String): User? {
        return userRepository.findByEmail(userEmail)
    }

    fun findByID(userID: Long): UserQuery? {
        val user = userRepository.findById(userID).get()
        return user.toUserQuery()
    }


    fun insert (user: UserRequest): UserQuery? {
        user.password = encoderPassword.encode(user.password)
        val userCommand = getCommand(user)
        val userDomain = userCommand.toUser()
        userRepository.save(userDomain)
        val insertUser = findByEmail(user.email)
        return insertUser?.toUserQuery()
    }

    fun update (user: UserRequest, userID: Long): UserQuery? {
        val userOld = userRepository.findById(userID).get()
        if(user.password.isEmpty()){
            user.password = userOld.password
        }else{
            user.password = encoderPassword.encode(user.password)
        }
        val userCommand = getCommand(user)
        val userDomain = userCommand.toUser(userOld.id)
        userRepository.save(userDomain)
        val updateUser = findByEmail(user.email)
        return updateUser?.toUserQuery()
    }

    fun delete(userID: Long): Boolean {
        val userQuery = findByID(userID)
        val user = userQuery?.let { findByEmail(it.email) }
        if (user != null){
            userRepository.delete(user)
            return true
        }
        return false
    }

    fun getCommand(user: UserRequest): UserCommand{
        val category = userCategoryRepository.findById(user.category).get()
        return user.toCommand(category)
    }

}