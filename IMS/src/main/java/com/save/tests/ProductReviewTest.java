package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.repositories.InventoryItemRepository;
import com.ims.repositories.ProductReviewRepository;

@SpringBootApplication
public class ProductReviewTest implements CommandLineRunner {
	
	@Autowired
	DataSource datasource;
	
	@Autowired
	InventoryItemRepository iiRepo;

	@Autowired
	ProductReviewRepository prRepo;

	public static void main(String[] args) {
		SpringApplication.run(ProductReviewTest.class, args);
		
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
//		ProductReview prod1 = new ProductReview(3, iiRepo.findOne(2), 5, "and it don't rain in Indionapolis...");
		
//		ProductReview result = prRepo.save(prod1);
//		System.out.println(result);

	}

}
