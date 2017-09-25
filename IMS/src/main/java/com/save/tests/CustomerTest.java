package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.repositories.CustomerRepository;
import com.ims.repositories.StateRepository;

@SpringBootApplication
public class CustomerTest implements CommandLineRunner {
	
	@Autowired
	DataSource datasource;
	

	@Autowired
	CustomerRepository cRepo;
	
	@Autowired
	StateRepository ss;

	public static void main(String[] args) {
		SpringApplication.run(CustomerTest.class, args);
		
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		//Customer cust1 = new Customer(1,
		//		 "Bob", "Barker", "bbarker@gmail.com", "1234", "1313 Mockingbird Lane", 
		//		"Honolulu", ss.findOne(11), "96808", "555-656-1111" );
		
		//	Customer result = cRepo.save(cust1);
		//	System.out.println(result);	
	}
}
