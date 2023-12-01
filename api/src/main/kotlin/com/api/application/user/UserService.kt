package com.api.application.user

import com.api.application.user.exceptions.UserNotFoundException
import com.api.domain.user.User
import com.api.domain.user.UserRepository

class UserService (
    private val userRepository: UserRepository
) {
    fun findAll(): List<UserQuery> {
        val listUserQuery: ArrayList<UserQuery> = ArrayList()
        val userList: List<User> = userRepository.findAll()
        for (user in userList){
            val userQuery: UserQuery? = user.id?.let { UserQuery(it, user.name, user.email, user.category)}
            if (userQuery != null) {
                listUserQuery.add(userQuery)
            }
        }
        return listUserQuery
    }

    fun findByEmail(userEmail: String): UserQuery? {
        val user = userRepository.findByEmail(userEmail)
        if (user != null) {
            return user.id?.let { UserQuery(it, user.name, user.email, user.category) } ?: throw UserNotFoundException(userEmail)
        }
        return null
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