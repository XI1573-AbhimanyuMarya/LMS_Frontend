package com.xebia.learningmanagement.service;

import com.xebia.learningmanagement.LearningmanagementApplicationTests;
import com.xebia.learningmanagement.entity.Competency;
import com.xebia.learningmanagement.repository.CompetencyRepository;
import com.xebia.learningmanagement.service.impl.CompetencyServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class CompetencyServiceTest {

    @Mock
    private CompetencyRepository competencyRepository;

    @InjectMocks
    private CompetencyServiceImpl competencyServiceImpl;

    @DisplayName("Competency Level Test")
    @Test
    void getCompetencyLevelsTest() {
        Competency competency = Mockito.mock(Competency.class);
        List<Competency> competencyList = new ArrayList<>();
        competencyList.add(competency);
        Mockito.when(competencyRepository.findAll()).thenReturn(competencyList);

        int size = competencyServiceImpl.getCompetencyLevels().size();
        assertEquals(1, size);

    }
}
