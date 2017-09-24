package com.ims.dtos;

import java.io.Serializable;

public class TestDto  implements Serializable{

	
	
	private static final long serialVersionUID = -8022895271716275140L;
	
	private String test;

	public TestDto() {}
	
	public TestDto(String test) {
		this.test = test;
	}

	public String getTest() {
		return test;
	}

	public void setTest(String test) {
		this.test = test;
	}
	
}
