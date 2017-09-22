package com.ims.test;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import com.ims.dao.CustomerRepository;

public class CustomerTest implements CommandLineRunner{
	
	@Autowired
	DataSource datasource;
	

	@Autowired
	CustomerRepository cRepo;
	public static void main(String[] args) {
		SpringApplication.run(StatesTest.class, args);
		
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		System.out.println(datasource);
		
	}
}
