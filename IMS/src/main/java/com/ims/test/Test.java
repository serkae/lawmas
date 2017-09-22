package com.ims.test;

import org.springframework.beans.factory.annotation.Autowired;

import com.ims.service.IMSService;

public class Test {
	
	public static void main(String[] args) {
		IMSService service = new IMSService();
		System.out.println("DB connection done");
		
		
	}
}
