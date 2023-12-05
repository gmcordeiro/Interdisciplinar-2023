package com.api.application.project.exceptions

sealed class ProjectTypeExceptions(message: String): Exception(message) {
    abstract val projectTypeID: Long?
}

data class ProjectTypeNotFoundException (
    override val projectTypeID: Long?
): ProjectTypeExceptions("Tipo de projeto $projectTypeID não encontrado!")

data class ProjectTypeNotInsertException (
    override val projectTypeID: Long?
): ProjectTypeExceptions("Não foi possivel inserir o tipo de projeto de ID: $projectTypeID!")