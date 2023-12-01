package com.api.application.project.exceptions

sealed class ProjectTypeExceptions(message: String): Exception(message) {
    abstract val projectTypeID: Int?
}

data class ProjectTypeNotFoundException (
    override val projectTypeID: Int?
): ProjectTypeExceptions("Tipo de projeto $projectTypeID não encontrado!")

data class ProjectTypeNotInsertException (
    override val projectTypeID: Int?
): ProjectTypeExceptions("Não foi possivel inserir o tipo de projeto de ID: $projectTypeID!")