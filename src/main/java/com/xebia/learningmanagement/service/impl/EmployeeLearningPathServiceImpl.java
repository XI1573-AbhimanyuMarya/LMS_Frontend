package com.xebia.learningmanagement.service.impl;

import com.xebia.learningmanagement.entity.Courses;
import com.xebia.learningmanagement.entity.LearningPath;
import com.xebia.learningmanagement.entity.LearningPathEmployees;
import com.xebia.learningmanagement.entity.User;
import com.xebia.learningmanagement.enums.EmailType;
import com.xebia.learningmanagement.exception.LearningPathException;
import com.xebia.learningmanagement.model.LearningPathDto;
import com.xebia.learningmanagement.model.UserDto;
import com.xebia.learningmanagement.repository.LearningPathEmployeesRepository;
import com.xebia.learningmanagement.service.EmployeeLearningPathService;
import com.xebia.learningmanagement.util.EmailSend;
import com.xebia.learningmanagement.util.ErrorBank;
import com.xebia.learningmanagement.util.MessageBank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeLearningPathServiceImpl implements EmployeeLearningPathService {
    @Autowired
    LearningPathEmployeesRepository learningPathEmployeesRepository;
    @Autowired
    LearningPathServiceImpl serviceimpl;
    @Autowired
    EmailSend emailSend;
    /***
     *
     * @param data
     * @throws LearningPathException
     */
    @Override
    public void deleteLearningPath(Map data) throws LearningPathException {
        Map<String,String> emailcontent=new HashMap<>();
        List<String> employeeLearningpathids = null;
        LearningPathEmployees learningpathemployees = null;
        try {
            employeeLearningpathids = (List) data.get("ids");
            if (employeeLearningpathids != null) {
                for (int i = 0; i < employeeLearningpathids.size(); i++) {
                    String id = String.valueOf(employeeLearningpathids.get(i));
                    learningpathemployees = learningPathEmployeesRepository.findById(Long.valueOf(id)).orElse(null);
                    if (learningpathemployees != null) {
                        emailcontent= emalcontent(learningpathemployees);
                        learningPathEmployeesRepository.deleteById(learningpathemployees.getId());
                        emailSend.sendEmailMethodUsingTemplate(EmailType.LEARNING_PATH_DISCARD.getValue(),emailcontent);
                    } else {
                        throw new LearningPathException(MessageBank.NO_DATA_FOUND);
                    }
                }
            } else {
                throw new LearningPathException(ErrorBank.ERROR_WHILE_DELETING);
            }
        } catch (LearningPathException l) {
            throw new LearningPathException(l.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /***
     *
     * @param learningpathemployees
     * @return
     */
    public Map emalcontent(LearningPathEmployees learningpathemployees) {
        Map<String,String> emailcontent=new HashMap<>();
        List<Courses> courselist=null;
        StringBuilder courses=new StringBuilder();
        try {
            courselist=  learningpathemployees.getLearningPath().getCourses();
            if(courselist!=null){
                for(int i=0;i<courselist.size();i++){
                    Courses course=courselist.get(i);
                    courses.append(course.getDescription().toString());
                }
            }
            emailcontent.put("Email", learningpathemployees.getEmployee().getUsername());
            emailcontent.put("learningPathName", learningpathemployees.getLearningPath().getName());
            emailcontent.put("madeFor", learningpathemployees.getEmployee().getFullName());
            emailcontent.put("assignedCourse", courses.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
        return  emailcontent;
    }
}
