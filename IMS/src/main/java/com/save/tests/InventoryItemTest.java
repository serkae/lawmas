package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.repositories.DepartmentRepository;
import com.ims.repositories.InventoryItemRepository;

@SpringBootApplication
public class InventoryItemTest implements CommandLineRunner {
	@Autowired
	DataSource datasource;
	
	@Autowired
	DepartmentRepository dRepo;

	@Autowired
	InventoryItemRepository iiRepo;

	public static void main(String[] args) {
		SpringApplication.run(InventoryItemTest.class, args);
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		//InventoryItem item1 = new InventoryItem(4, dRepo.findOne(4) , 3.79f, 110, "Milk - Whole - Gallon");
		//InventoryItem item1 = new InventoryItem(1, "Milk - Whole - Gallon", 3.79f, 110);
		
		//InventoryItem result = iiRepo.save(item1);
		//System.out.println(result);
	}

}
