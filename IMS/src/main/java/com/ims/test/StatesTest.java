package com.ims.test;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.ims.service.StatesService;

@SpringBootApplication
public class StatesTest {
	
	@Autowired
	DataSource datasource;
	
	@Autowired
	StatesService ss;

	public static void main(String[] args) {
		SpringApplication.run(StatesTest.class, args);
		
	}

}
