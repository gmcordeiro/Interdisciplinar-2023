package com.api.application.project

import com.api.application.project.exceptions.ProjectNotFoundException
import com.api.domain.project.Project
import com.api.domain.project.ProjectRepository
import com.api.domain.project.ProjectTypeRepository
import com.api.domain.task.TaskRepository
import com.api.domain.user.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class ProjectService(
	private val projectRepository: ProjectRepository,
	private val taskRepository: TaskRepository,
	private val projectTypeRepository: ProjectTypeRepository,
	private val userRepository: UserRepository
) {
	fun findAll(): List<Project> {
		return projectRepository.findAll()
	}

	fun findById(projectId: Long): Project?{
		return projectRepository.findById(projectId).get()
	}

	fun insert(projectRequest: ProjectRequest): Project? {
		val projectCommand = getCommand(projectRequest, true, 0)
		val projectDomain = projectRepository.save(projectCommand.toProject())
		return projectDomain.id?.let { findById(it) }
	}

	fun update(projectRequest: ProjectRequest, projectId: Long): Project?{
		val projectCommand = getCommand(projectRequest, false, projectId)
		val projectDomain = projectRepository.save(projectCommand.toProject())
		return projectDomain.id?.let { findById(it) }
	}

	fun delete (projectId: Long): Boolean{
		projectRepository.deleteById(projectId) ?: throw ProjectNotFoundException(projectId)
		return !projectRepository.existsById(projectId)
	}

	fun getCommand(projectRequest: ProjectRequest, create: Boolean, projectId: Long): ProjectCommand{
		val projectDomain = projectRepository.findById(projectId).get()

		val owner = userRepository.findById(projectRequest.owner).get()
		val projectType = projectTypeRepository.findById(projectRequest.type).get()
		val tasks = if(create) listOf() else taskRepository.findAllByProject(projectDomain)

		return projectRequest.toCommand(tasks, projectType, owner)
	}
}