package com.api.application.user

import com.api.application.user.exceptions.UserNotFoundException
import com.api.application.user.exceptions.UserNotInsertException
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

    fun findByEmail(userEmail: String): UserQuery? {
        val user = userRepository.findByEmail(userEmail)
        return user?.toUserQuery() ?: throw UserNotFoundException(userEmail = userEmail)
    }

    fun findByID(userID: Long): UserQuery? {
        val user = userRepository.findByID(userID)
        return user?.toUserQuery() ?: throw UserNotFoundException(userID = userID)
    }


    fun insert (user: UserCommand): UserQuery? {
        val userDomain = user.toUser()
        userRepository.save(userDomain)

        return findByEmail(user.email)
    }

    fun update (user: UserCommand, userEmail: String): UserQuery? {
        val userOld = findByEmail(userEmail) ?: throw UserNotFoundException(userEmail)
        val userDomain = user.toUser(userOld.id)
        userRepository.save(userDomain)
        return findByEmail(user.email)
    }

}