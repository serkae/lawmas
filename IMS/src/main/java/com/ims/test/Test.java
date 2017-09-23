package com.ims.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ims.dao.CustomerRepository;
import com.ims.service.IMSService;

@SpringBootApplication
public class Test implements CommandLineRunner{
	
	@Autowired
	CustomerRepository cRepo;
	
	public static void main(String[] args) {
		SpringApplication.run(Test.class , args);
		
	}

	@Override
	public void run(String... arg0) throws Exception {
		// TODO Auto-generated method stub
		
	}
}
