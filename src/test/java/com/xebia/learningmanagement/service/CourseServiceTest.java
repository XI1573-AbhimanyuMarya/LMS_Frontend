package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.LearningmanagementApplicationTests;
import com.xebia.learningmanagement.entity.Category;
import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.repository.CategoryRepository;
import com.xebia.learningmanagement.repository.CourseRepository;
import com.xebia.learningmanagement.service.impl.CourseServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@SpringBootTest
 class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CourseServiceImpl courseServiceImpl;



    @DisplayName("Course By KeyWord Test")
    @Test
     void getCoursesByKeywordTest()
    {
        Courses courses=Mockito.spy(Courses.class);
        courses.setName("dummy");
        Set<Courses> courseSet=new HashSet<>();
           courseSet.add(courses);
        List<Courses> coursesList=new ArrayList<>();
        coursesList.add(courses);

        Mockito.when(categoryRepository.findCategoryByName(Mockito.anyString())).thenReturn(new Category());
        Mockito.when(courseRepository.findByCategory(Mockito.any())).thenReturn(courseSet);
        Mockito.when(courseRepository.findAll()).thenReturn(coursesList);
        int size=courseServiceImpl.getCoursesByKeyword("Dummy").size();
        assertEquals(1,size);

    }

    @DisplayName("Get All Course Test")
    @Test
     void getAllCoursesTests()
    {
        Courses courses=Mockito.mock(Courses.class);
        List<Courses> courseList=new ArrayList<>();
           courseList.add(courses);
        Mockito.when(courseRepository.findAll()).thenReturn(courseList);
        int size=courseServiceImpl.getAllCourses().size();
       assertEquals(1,size);

    }


}
