package com.api.adapters.http.security.exceptions

sealed class CredentialsExceptions (message: String): Exception(message)
class InvalidcredentialsExceptions(): CredentialsExceptions("Usuário ou senha inválidos")