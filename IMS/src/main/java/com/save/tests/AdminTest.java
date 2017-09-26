package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Admin;
import com.ims.repositories.AdminRepository;

@SpringBootApplication
public class AdminTest implements CommandLineRunner{
		
	@Autowired
	DataSource datasource;
	
	@Autowired
	AdminRepository aRepo;

	public static void main(String[] args) {
		SpringApplication.run(AdminTest.class, args);
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		Admin admin1 = new Admin(3, "Donald", "Trump", "thedon@gmail.com", "1234");
		
		Admin result = aRepo.saveAndFlush(admin1);
		System.out.println(result);
	}

}
