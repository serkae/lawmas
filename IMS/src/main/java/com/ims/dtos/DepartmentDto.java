package com.ims.dtos;

public class DepartmentDto {

	private String name;
	private boolean actionApplied;
	
	public DepartmentDto(String name, boolean actionApplied) {
		super();
		this.name = name;
		this.actionApplied = actionApplied;
	}
	public DepartmentDto() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isActionApplied() {
		return actionApplied;
	}
	public void setActionApplied(boolean actionApplied) {
		this.actionApplied = actionApplied;
	}
	
	
}
