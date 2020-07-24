package com.xebia.learningmanagement.model;

import java.util.ArrayList;
import java.util.List;

public class EmployeeResponse {

	private String employeeId;

	private String name;

	private String email;

	private String contactNumber;

	private String departmentName;

	private String baseLocation;

	private String designation;

	private String cOEType;

	private String ownerName;

	private String sittingLocation;

	private String reportingTo;

	private String clientLocation;

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getBaseLocation() {
		return baseLocation;
	}

	public void setBaseLocation(String baseLocation) {
		this.baseLocation = baseLocation;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getcOEType() {
		return cOEType;
	}

	public void setCOEType(String cOEType) {
		this.cOEType = cOEType;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getSittingLocation() {
		return sittingLocation;
	}

	public void setSittingLocation(String sittingLocation) {
		this.sittingLocation = sittingLocation;
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

	public static List<EmployeeResponse> from(List<Employee> employees){
		List<EmployeeResponse> employeeResponseList=new ArrayList<>();
		for (Employee employee : employees) {
			EmployeeResponse employeeResponse  = new EmployeeResponse();
			employeeResponse.setEmployeeId(employee.getId());
			employeeResponse.setName(employee.getName());
			employeeResponse.setEmail(employee.getEmail());
			employeeResponse.setContactNumber(employee.getContactNumber());
			employeeResponse.setDepartmentName(employee.getDepartmentName());
			employeeResponse.setBaseLocation(employee.getBaseLocation());
			employeeResponse.setDesignation(employee.getDesignation());
			employeeResponse.setCOEType(employee.getCOEType());
			employeeResponse.setOwnerName(employee.getOwnerName());
			employeeResponse.setSittingLocation(employee.getSittingLocation());
			employeeResponse.setReportingTo(employee.getReportingTo());
			employeeResponse.setClientLocation(employee.getClientLocation());
			employeeResponseList.add(employeeResponse);
		}
		return employeeResponseList;
	}
}
