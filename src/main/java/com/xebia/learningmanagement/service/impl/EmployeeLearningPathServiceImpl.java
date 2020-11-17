package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.service.EmployeeLearningPathService;
import com.xebia.learningmanagement.util.ErrorBank;
import com.xebia.learningmanagement.util.MessageBank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeLearningPathServiceImpl implements EmployeeLearningPathService {
    @Autowired
    LearningPathEmployeesRepository learningPathEmployeesRepository;

    /***
     *
     * @param data
     * @throws LearningPathException
     */
    @Override
    public void deleteLearningPath(Map data) throws LearningPathException {
        List<String> employeeLearningpathids = null;
        LearningPathEmployees learningpathemployees = null;
        List<LearningPathEmployees> datalist = new ArrayList<>();
        List deletedlearningpath=new ArrayList();
        try {
            employeeLearningpathids = (List) data.get("ids");
            if(employeeLearningpathids!=null) {
                for (int i = 0; i < employeeLearningpathids.size(); i++) {
                    String id = String.valueOf(employeeLearningpathids.get(i));
                    learningpathemployees = learningPathEmployeesRepository.findById(Long.valueOf(id)).orElse(null);
                    if (learningpathemployees != null) {
                        datalist.add(learningpathemployees);
                        deletedlearningpath.add(learningpathemployees.getLearningPath().getName());
                    }else{
                        throw new LearningPathException(MessageBank.NO_DATA_FOUND);
                    }
                }
            }else{
                throw new LearningPathException(ErrorBank.ERROR_WHILE_DELETING);
            }
            learningPathEmployeesRepository.deleteAll(datalist);
        } catch (LearningPathException l) {
            throw new LearningPathException(l.getLocalizedMessage());
        }
    }
}
