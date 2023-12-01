package com.api.application.task.exceptions

sealed class TaskExceptions(message: String): Exception(message) {
    abstract val taskID: Int?
}

data class TaskNotFoundException (
    override val taskID: Int?
): TaskExceptions("Projeto $taskID não encontrado!")

data class TaskNotInsertException (
    override val taskID: Int?
): TaskExceptions("Não foi possivel inserir o Projeto de ID: $taskID!")