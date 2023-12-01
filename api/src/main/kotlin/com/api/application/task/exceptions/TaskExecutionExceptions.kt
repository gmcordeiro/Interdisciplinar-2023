package com.api.application.task.exceptions

sealed class TaskExecutionExceptions(message: String): Exception(message) {
    abstract val taskExecutionID: Int?
}

data class TaskExecutionNotFoundException (
    override val taskExecutionID: Int?
): TaskExecutionExceptions("Execução de tarefa $taskExecutionID não encontrado!")

data class TaskExecutionNotInsertException (
    override val taskExecutionID: Int?
): TaskExecutionExceptions("Não foi possivel inserir a execução da tarefa de ID: $taskExecutionID!")