package com.api.application.user.exceptions

sealed class UserExceptions(message: String): Exception(message) {
    abstract val userEmail: String?
}

data class UserNotFoundException (
    override val userEmail: String?
): UserExceptions("Usuário $userEmail não encontrado!")

data class UserNotInsertException (
    override val userEmail: String?
): UserExceptions("Não foi possivel inserir o usuário de ID: $userEmail!")