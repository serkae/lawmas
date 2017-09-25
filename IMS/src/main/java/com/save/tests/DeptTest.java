package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Department;
import com.ims.repositories.DepartmentRepository;

@SpringBootApplication
public class DeptTest implements CommandLineRunner{
	@Autowired
	DataSource datasource;
	
	@Autowired
	DepartmentRepository dRepo;

	public static void main(String[] args) {
		SpringApplication.run(DeptTest.class, args);
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		Department dept1 = new Department(6, "Candy");
		
		Department result = dRepo.save(dept1);
		System.out.println(result);
	}

}
