package com.api.application.user

import com.api.application.user.exceptions.UserNotFoundException
import com.api.domain.user.User
import com.api.domain.user.UserRepository
import com.api.domain.user.toUserQuery
import org.springframework.stereotype.Service

@Service
class UserService (
    private val userRepository: UserRepository
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
        val user = userRepository.findByID(userID)
        return user?.toUserQuery() ?: throw UserNotFoundException(userID = userID)
    }


    fun insert (user: UserCommand): UserQuery? {
        val userDomain = user.toUser()
        userRepository.save(userDomain)
        val insertUser = findByEmail(user.email)
        return insertUser?.toUserQuery()
    }

    fun update (user: UserCommand, userEmail: String): UserQuery? {
        val userOld = findByEmail(userEmail) ?: throw UserNotFoundException(userEmail)
        val userDomain = user.toUser(userOld.id)
        userRepository.save(userDomain)
        val updateUser = findByEmail(user.email)
        return updateUser?.toUserQuery()
    }

}