package com.api.application.user

import com.api.application.user.exceptions.UserNotFoundException
import com.api.domain.user.*
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class UserService (
    private val userRepository: UserRepository,
    private val userCategoryRepository: UserCategoryRepository
) {
    fun findAll(): List<UserQuery> {
        val listUserQuery: ArrayList<UserQuery> = ArrayList()
        val userList: List<User> = userRepository.findAll()
        for (user in userList){
            val userQuery = user.toUserQuery()
            if (userQuery != null) {
                listUserQuery.add(userQuery)
            }
        }
        return listUserQuery
    }

    fun findByEmail(userEmail: String): User? {
        return userRepository.findByEmail(userEmail) ?: throw UserNotFoundException(userEmail)
    }

    fun findByID(userID: Long): UserQuery? {
        val user = userRepository.findById(userID).get()
        return user.toUserQuery() ?: throw UserNotFoundException(userID = userID)
    }


    fun insert (user: UserRequest): UserQuery? {
        val userCommand = getCommand(user, true)
        val userDomain = userCommand.toUser()
        userRepository.save(userDomain)
        val insertUser = findByEmail(user.email)
        return insertUser?.toUserQuery()
    }

    fun update (user: UserRequest, userID: Long): UserQuery? {
        val userOld = findByID(userID) ?: throw UserNotFoundException(userID = userID)
        if(user.password.isEmpty()){
            val userDomain = findByEmail(userOld.email) ?: throw UserNotFoundException(userID = userID)
            user.password = userDomain.password
        }
        val userCommand = getCommand(user, false)
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

    fun getCommand(user: UserRequest, crete: Boolean): UserCommand{
        val category = userCategoryRepository.findById(user.category).get()
        return user.toCommand(category)
    }

}