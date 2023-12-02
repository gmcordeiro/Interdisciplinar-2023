package com.api.application.user.exceptions

sealed class UserExceptions(message: String): Exception(message) {
    abstract val userEmail: String?
    abstract val userID: Long?
}

data class UserNotFoundException (
    override val userEmail: String? = null,
    override val userID: Long? = null
): UserExceptions("Usuário " + (userEmail ?: userID) + "não encontrado!")

data class UserNotInsertException (
    override val userEmail: String? = null,
    override val userID: Long? = null
): UserExceptions("Não foi possivel inserir o usuário:" + (userEmail ?: userID))