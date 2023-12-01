package com.api.application.user.exceptions

sealed class UserCategoryExceptions(message: String): Exception(message) {
    abstract val userID: Int?
}

data class UserCategoryNotFoundException (
    override val userID: Int?
): UserCategoryExceptions("Categoria de usuário $userID não encontrada!")

data class UserCategoryNotInsertException (
    override val userID: Int?
): UserCategoryExceptions("Não foi possivel inserir a categoria de usuário de ID: $userID!")