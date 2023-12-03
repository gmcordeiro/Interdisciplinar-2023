package com.api.application.user.exceptions

sealed class UserCategoryExceptions(message: String): Exception(message) {
    abstract val categoryID: Long?
    abstract val categoryName: String?
}

data class UserCategoryNotFoundException (
	override val categoryID: Long? = null,
	override val categoryName: String? = null
): UserCategoryExceptions("Categoria de usuário " + (categoryID ?: categoryName) + " não encontrada!")

data class UserCategoryNotInsertException (
    override val categoryID: Long? = null,
	override val categoryName: String? = null
): UserCategoryExceptions("Não foi possivel inserir a categoria de usuário de ID: " + (categoryID ?: categoryName) + "!")