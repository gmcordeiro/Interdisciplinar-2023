package com.api.application.user

import com.api.application.user.exceptions.UserCategoryNotFoundException
import com.api.domain.user.UserCategory
import com.api.domain.user.UserCategoryRepository
import org.springframework.stereotype.Service

@Service
class UserCategoryService(
	private val userCategoryRepository: UserCategoryRepository
) {
	fun findAll(): List<UserCategory>{
		return userCategoryRepository.findAll()
	}

	fun findByID(categoryID: Long): UserCategory?{
		return userCategoryRepository.findById(categoryID).orElseThrow { throw UserCategoryNotFoundException(categoryID = categoryID) }
	}

	fun findByName(categoryName: String): UserCategory?{
		return userCategoryRepository.findByName(categoryName).orElseThrow{ throw UserCategoryNotFoundException(categoryName = categoryName) }
	}

	fun insert(userCategory: UserCategoryCommand): UserCategory?{
		val userCategoryDomain = userCategory.toUserCategory()
		userCategoryRepository.save(userCategoryDomain)
		val insertCategory = findByName(userCategoryDomain.name)
		return insertCategory?.id?.let { findByID(it) }
	}

}