package com.ims.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ims.beans.InventoryItem;
import com.ims.beans.ProductReview;
import com.ims.dtos.ProductReviewDto;
import com.ims.services.InventoryItemService;
import com.ims.services.ProductReviewService;


@RestController
@RequestMapping(value="/productreview")
public class ProductReviewController {

	@Autowired
	private ProductReviewService productReviewService;
	
	public void setUserServiceImpl(ProductReviewService productReviewService) {
		this.productReviewService = productReviewService;
	}
	
	@Autowired
	private InventoryItemService inventoryItemService;
	
	public void setInventoryItemService(InventoryItemService inventoryItemService) {
		this.inventoryItemService = inventoryItemService;
	}

	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<ProductReviewDto> createOrReplace(@RequestBody ProductReview productReview){
		// Loading inventory item from database because of null department
		InventoryItem i = inventoryItemService.getById(productReview.getInventoryItem().getId());
		System.out.println("inventory item: " + i.toString());
		return new ResponseEntity<ProductReviewDto>(productReviewService.createOrUpdateAdmin(productReview), HttpStatus.OK);
	}
	
	@RequestMapping(value="/update",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<ProductReviewDto> update(@RequestBody ProductReview productReview){
		// Loading inventory item from database because of null department
		InventoryItem i = inventoryItemService.getById(productReview.getInventoryItem().getId());
		System.out.println("inventory item: " + i.toString());
		return new ResponseEntity<ProductReviewDto>(productReviewService.createOrUpdateAdmin(productReview), HttpStatus.OK);
	}

	@RequestMapping(value="/delete",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<String> removeReview(@RequestBody ProductReview productReview) {
		productReview.setInventoryItem(null);
		productReviewService.removeAdmin(productReview);
		return new ResponseEntity<String>("true", HttpStatus.OK);
	}

	@RequestMapping(value="/getAll",method=(RequestMethod.GET),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<List<ProductReview>> getAllReviews(){
		return new ResponseEntity<List<ProductReview>>(productReviewService.getAll(), HttpStatus.OK);
	}

}
