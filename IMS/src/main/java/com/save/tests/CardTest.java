package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.repositories.CardRepository;

@SpringBootApplication
public class CardTest implements CommandLineRunner {
	@Autowired
	DataSource datasource;
	
	@Autowired
	CardRepository cRepo;

	public static void main(String[] args) {
		SpringApplication.run(CardTest.class, args);
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		//Card card1 = new Card(150, "777-451231-15005", "Andrew Bonds", "04 21", "3657");
		
		cRepo.delete(100);
		//System.out.println(result);
	}

}
