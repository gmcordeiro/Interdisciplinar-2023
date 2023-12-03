package com.api.application.project.exceptions

sealed class ProjectExceptions(message: String): Exception(message) {
    abstract val projectID: Long?
}

data class ProjectNotFoundException (
    override val projectID: Long?
): ProjectExceptions("Projeto $projectID não encontrado!")

data class ProjectNotInsertException (
    override val projectID: Long?
): ProjectExceptions("Não foi possivel inserir o projeto de ID: $projectID!")