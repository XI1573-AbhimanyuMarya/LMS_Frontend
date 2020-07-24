package com.xebia.learningmanagement.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "employees")
public class Employee {
	@Id
	private String id;
	private String name;
	private String designation;
	private String email;
	private String baseLocation;
	private String cOEType;
	private String departmentName;
	private String sittingLocation;
	private String ownerName;
	private String contactNumber;
	private String reportingTo;
	private String clientLocation;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBaseLocation() {
		return baseLocation;
	}

	public void setBaseLocation(String baseLocation) {
		this.baseLocation = baseLocation;
	}

	public String getCOEType() {
		return cOEType;
	}

	public void setCOEType(String cOEType) {
		this.cOEType = cOEType;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getSittingLocation() {
		return sittingLocation;
	}

	public void setSittingLocation(String sittingLocation) {
		this.sittingLocation = sittingLocation;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getReportingTo() {
		return reportingTo;
	}

	public void setReportingTo(String reportingTo) {
		this.reportingTo = reportingTo;
	}

	public String getClientLocation() {
		return clientLocation;
	}

	public void setClientLocation(String clientLocation) {
		this.clientLocation = clientLocation;
	}

	public static List<Employee> of(List<EmployeeMetaData> employeeMetaDataList) {
		List<Employee> employeeResponseList=new ArrayList<>();
		for (EmployeeMetaData employeeMetaData : employeeMetaDataList) {
			Employee employee = new Employee();
			employee.setId(employeeMetaData.getEmployeeID());
			employee.setName(employeeMetaData.getFullName());
			employee.setEmail(employeeMetaData.getXebiaEmailID());
			employee.setContactNumber(employeeMetaData.getMobilePhone());
			employee.setDepartmentName(employeeMetaData.getDepartment());
			employee.setBaseLocation(employeeMetaData.getBaseLocation());
			employee.setDesignation(employeeMetaData.getDesignation());
			employee.setCOEType(employeeMetaData.getCOEType());
			employee.setOwnerName(employeeMetaData.getOwnerName());
			employee.setSittingLocation(employeeMetaData.getSittingLocationSystem());
			employee.setReportingTo(employeeMetaData.getReportingTo());
			employee.setClientLocation(employeeMetaData.getClientLocation());
			employeeResponseList.add(employee);
		}
		return employeeResponseList;
	}
}
