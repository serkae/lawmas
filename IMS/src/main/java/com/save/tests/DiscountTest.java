package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.repositories.DiscountRepository;
import com.ims.repositories.InventoryItemRepository;

@SpringBootApplication
public class DiscountTest implements CommandLineRunner {
	@Autowired
	DataSource datasource;
	
	@Autowired
	DiscountRepository dRepo;

	@Autowired
	InventoryItemRepository iiRepo;

	public static void main(String[] args) {
		SpringApplication.run(DiscountTest.class, args);
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		//Timestamp timestamp1 = java.sql.Timestamp.valueOf("2017-10-23 00:00:00.0");
		//Timestamp timestamp2 = java.sql.Timestamp.valueOf("2017-10-29 00:00:00.0");
		
		//System.out.println(date);
		
		//Discount discount1 = new Discount(1, iiRepo.findOne(1) , .20f, 2.00f, "2 dollars off", timestamp1, timestamp2);
		
		//Discount result = dRepo.saveAndFlush(discount1);
		//System.out.println(result);
	}

}
