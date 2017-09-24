package com.ims.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Department")
public class Department {

	@Id
	@Column(name = "DEPARTMENT_ID")
	private int departmentId;
	
	@Column(name = "DEPARTMENT_NAME")
	private String name;

	public Department() {}

	public Department(int depID, String name) {
		super();
		this.departmentId = depID;
		this.name = name;
	}



	public int getDepID() {
		return departmentId;
	}



	public void setDepID(int depID) {
		this.departmentId = depID;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Department [depID=" + departmentId + ", name=" + name + "]";
	}
	
	
	
	
	
}