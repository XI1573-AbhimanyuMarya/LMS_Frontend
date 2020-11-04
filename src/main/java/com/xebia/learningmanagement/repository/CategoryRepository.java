package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

	Category findCategoryById(Long id);

	@Query("FROM Category WHERE UPPER(name) LIKE UPPER(?1)")
//	@Query("Select * FROM category WHERE UPPER(name) LIKE UPPER('%?1%') ")
	Category findCategoryByName(String name);
}
