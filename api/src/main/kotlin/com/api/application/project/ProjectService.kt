package com.api.application.project

import com.api.application.project.exceptions.ProjectNotFoundException
import com.api.domain.project.Project
import com.api.domain.project.ProjectRepository
import com.api.domain.project.ProjectTypeRepository
import com.api.domain.project.toProjectQuery
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
	fun findAll(): List<ProjectQuery> {
		val listProjectQuery: ArrayList<ProjectQuery> = arrayListOf()
		val projectList = projectRepository.findAll()
		for (project in projectList){
			val projectQuery = project.toProjectQuery(false)
			listProjectQuery.add(projectQuery)
		}
		return listProjectQuery
	}
	fun findById(projectId: Long): Project?{
		return projectRepository.findById(projectId).get()
	}
	fun insert(projectRequest: ProjectRequest): Project? {
		val projectCommand = getCommand(projectRequest, true, 0)  ?: throw ProjectNotFoundException(0)
		val projectDomain = projectRepository.save(projectCommand.toProject())
		return projectDomain.id?.let { findById(it) }
	}
	fun update(projectRequest: ProjectRequest, projectId: Long): Project?{
		val projectCommand = getCommand(projectRequest, false, projectId) ?: throw ProjectNotFoundException(projectId)
		val projectDomain = projectRepository.save(projectCommand.toProject())
		return projectDomain.id?.let { findById(it) }
	}
	fun delete (projectId: Long): Boolean{
		projectRepository.deleteById(projectId) ?: throw ProjectNotFoundException(projectId)
		return !projectRepository.existsById(projectId)
	}
	fun done(projectId: Long): Boolean? {
		val project = findById(projectId) ?: throw ProjectNotFoundException(projectId)
		project.done = true
		projectRepository.save(project)
		return true
	}
	fun getCommand(projectRequest: ProjectRequest, create: Boolean, projectId: Long): ProjectCommand? {

		val projectDomain = if(create) null else projectRepository.findById(projectId).get()

		val owner = userRepository.findById(projectRequest.owner).get()
		val projectType = projectTypeRepository.findById(projectRequest.type).get()
		val tasks = if(create) listOf() else projectDomain?.let { taskRepository.findAllByProject(it) }

		return tasks?.let { projectRequest.toCommand(it, projectType, owner) }
	}
}