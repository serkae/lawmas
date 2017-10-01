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
import com.ims.services.InventoryItemService;

@RestController
@RequestMapping(value="/inventoryitem")
public class InventoryItemController {

	@Autowired
	private InventoryItemService inventoryItemService;

	public void setInventoryItemService(InventoryItemService inventoryItemService) {
		this.inventoryItemService = inventoryItemService;
	}

	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<InventoryItem> addItem(@RequestBody InventoryItem i){
		System.out.println("Creating: " + i.toString());
		return new ResponseEntity<InventoryItem>(inventoryItemService.createOrUpdate(i), HttpStatus.OK);
	}
	
	@RequestMapping(value="/getAll",method=(RequestMethod.GET),produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<List<InventoryItem>> getAllItems(){
		return new ResponseEntity<List<InventoryItem>>(inventoryItemService.getAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/update",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<InventoryItem> updateItem(@RequestBody InventoryItem i){
		System.out.println("Updating: " + i.toString());
		return new ResponseEntity<InventoryItem>(inventoryItemService.createOrUpdate(i), HttpStatus.OK);
	}
	
	@RequestMapping(value="/remove",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<String> removeItem(@RequestBody InventoryItem i){
		inventoryItemService.remove(i);
		return new ResponseEntity<String>("true", HttpStatus.OK);
	}
	
	@RequestMapping("/countByDept")
	public List<Object> findByItemsByDept() {
		return inventoryItemService.findDeptCount();
	}
	
	@RequestMapping("/countDiscountsByDept")
	public List<Object> findByDiscountedItemsByDept() {
		return inventoryItemService.findByDiscountedItemsByDept();
	}
	
}
