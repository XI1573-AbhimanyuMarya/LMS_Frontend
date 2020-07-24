package com.xebia.learningmanagement.repository;

import com.xebia.learningmanagement.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

	SubCategory findSubCategoryById(Long id);

}
