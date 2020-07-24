package com.xebia.learningmanagement.model;

import com.fasterxml.jackson.annotation.*;

import java.util.HashMap;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
		"modifiedTime",
		"Base Location",
		"Designation",
		"Xebia Email ID",
		"COE Type",
		"Full Name",
		"ownerID",
		"ApprovalStatus",
		"recordId",
		"Department",
		"Sitting Location (System)",
		"ownerName",
		"createdTime",
		"EmployeeID",
		"Mobile Phone",
		"Reporting To",
		"Client Location"
})
public class EmployeeMetaData {

	@JsonProperty("modifiedTime")
	private String modifiedTime;
	@JsonProperty("Base Location")
	private String baseLocation;
	@JsonProperty("Designation")
	private String designation;
	@JsonProperty("Xebia Email ID")
	private String xebiaEmailID;
	@JsonProperty("COE Type")
	private String cOEType;
	@JsonProperty("Full Name")
	private String fullName;
	@JsonProperty("ownerID")
	private String ownerID;
	@JsonProperty("ApprovalStatus")
	private String approvalStatus;
	@JsonProperty("recordId")
	private String recordId;
	@JsonProperty("Department")
	private String department;
	@JsonProperty("Sitting Location (System)")
	private String sittingLocationSystem;
	@JsonProperty("ownerName")
	private String ownerName;
	@JsonProperty("createdTime")
	private String createdTime;
	@JsonProperty("EmployeeID")
	private String employeeID;
	@JsonProperty("Mobile Phone")
	private String mobilePhone;
	@JsonProperty("Reporting To")
	private String reportingTo;
	@JsonProperty("Client Location")
	private String clientLocation;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("modifiedTime")
	public String getModifiedTime() {
		return modifiedTime;
	}

	@JsonProperty("modifiedTime")
	public void setModifiedTime(String modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

	@JsonProperty("Base Location")
	public String getBaseLocation() {
		return baseLocation;
	}

	@JsonProperty("Base Location")
	public void setBaseLocation(String baseLocation) {
		this.baseLocation = baseLocation;
	}

	@JsonProperty("Designation")
	public String getDesignation() {
		return designation;
	}

	@JsonProperty("Designation")
	public void setDesignation(String designation) {
		this.designation = designation;
	}

	@JsonProperty("Xebia Email ID")
	public String getXebiaEmailID() {
		return xebiaEmailID;
	}

	@JsonProperty("Xebia Email ID")
	public void setXebiaEmailID(String xebiaEmailID) {
		this.xebiaEmailID = xebiaEmailID;
	}

	@JsonProperty("COE Type")
	public String getCOEType() {
		return cOEType;
	}

	@JsonProperty("COE Type")
	public void setCOEType(String cOEType) {
		this.cOEType = cOEType;
	}

	@JsonProperty("Full Name")
	public String getFullName() {
		return fullName;
	}

	@JsonProperty("Full Name")
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	@JsonProperty("ownerID")
	public String getOwnerID() {
		return ownerID;
	}

	@JsonProperty("ownerID")
	public void setOwnerID(String ownerID) {
		this.ownerID = ownerID;
	}

	@JsonProperty("ApprovalStatus")
	public String getApprovalStatus() {
		return approvalStatus;
	}

	@JsonProperty("ApprovalStatus")
	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	@JsonProperty("recordId")
	public String getRecordId() {
		return recordId;
	}

	@JsonProperty("recordId")
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}

	@JsonProperty("Department")
	public String getDepartment() {
		return department;
	}

	@JsonProperty("Department")
	public void setDepartment(String department) {
		this.department = department;
	}

	@JsonProperty("Sitting Location (System)")
	public String getSittingLocationSystem() {
		return sittingLocationSystem;
	}

	@JsonProperty("Sitting Location (System)")
	public void setSittingLocationSystem(String sittingLocationSystem) {
		this.sittingLocationSystem = sittingLocationSystem;
	}

	@JsonProperty("ownerName")
	public String getOwnerName() {
		return ownerName;
	}

	@JsonProperty("ownerName")
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	@JsonProperty("createdTime")
	public String getCreatedTime() {
		return createdTime;
	}

	@JsonProperty("createdTime")
	public void setCreatedTime(String createdTime) {
		this.createdTime = createdTime;
	}

	@JsonProperty("EmployeeID")
	public String getEmployeeID() {
		return employeeID;
	}

	@JsonProperty("EmployeeID")
	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}

	@JsonProperty("Mobile Phone")
	public String getMobilePhone() {
		return mobilePhone;
	}

	@JsonProperty("Mobile Phone")
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	@JsonProperty("Reporting To")
	public String getReportingTo() {
		return reportingTo;
	}

	@JsonProperty("Reporting To")
	public void setReportingTo(String reportingTo) {
		this.reportingTo = reportingTo;
	}

	@JsonProperty("Client Location")
	public String getClientLocation() {
		return clientLocation;
	}

	@JsonProperty("Client Location")
	public void setClientLocation(String clientLocation) {
		this.clientLocation = clientLocation;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

}
