package com.api.application.task.exceptions

sealed class TaskExceptions(message: String): Exception(message) {
    abstract val taskID: Long?
}

data class TaskNotFoundException (
    override val taskID: Long?
): TaskExceptions("Projeto $taskID não encontrado!")

data class TaskNotInsertException (
    override val taskID: Long?
): TaskExceptions("Não foi possivel inserir o Projeto de ID: $taskID!")