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
	private int depID;
	
	@Column(name = "DEPARTMENT_NAME")
	private String name;

	public Department() {}

	public Department(int depID, String name) {
		super();
		this.depID = depID;
		this.name = name;
	}



	public int getDepID() {
		return depID;
	}



	public void setDepID(int depID) {
		this.depID = depID;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Department [depID=" + depID + ", name=" + name + "]";
	}
	
	
	
	
	
}