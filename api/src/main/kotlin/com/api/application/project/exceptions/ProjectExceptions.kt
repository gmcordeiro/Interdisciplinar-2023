package com.api.application.project.exceptions

sealed class ProjectExceptions(message: String): Exception(message) {
    abstract val projectID: Int?
}

data class ProjectNotFoundException (
    override val projectID: Int?
): ProjectExceptions("Projeto $projectID não encontrado!")

data class ProjectNotInsertException (
    override val projectID: Int?
): ProjectExceptions("Não foi possivel inserir o projeto de ID: $projectID!")