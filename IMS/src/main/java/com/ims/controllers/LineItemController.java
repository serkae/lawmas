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

import com.ims.beans.LineItem;
import com.ims.services.InventoryItemService;
import com.ims.services.LineItemService;

@RestController
@RequestMapping("/lineItem")
public class LineItemController {

	@Autowired
	LineItemService liservice;
	
	@Autowired
	InventoryItemService iiservice;
	
	public void setLiService(LineItemService liservice) {
		this.liservice = liservice;
	}
	
	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<LineItem> createOrder(@RequestBody LineItem i){
		System.out.println(i);
		iiservice.getById(i.getItem().getId());
		System.out.println("Creating order: " + i.getId());
		
		return new ResponseEntity<LineItem>(liservice.createOrUpdateLineItem(i), HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/update",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<LineItem> updateOrder(@RequestBody LineItem i){
		System.out.println(i);
		System.out.println("Creating order: " + i.getId());
		return new ResponseEntity<LineItem>(liservice.createOrUpdateLineItem(i), HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/getAll",method=(RequestMethod.GET),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<List<LineItem>> getAllOrders(){
		System.out.println("Listing orders: ");
		return new ResponseEntity<List<LineItem>>(liservice.getAllLineItems(), HttpStatus.OK);
		
	}

	

	@RequestMapping(value="/getOrder",method=(RequestMethod.GET),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<LineItem> getOrder(int id){
		System.out.println("Listing orders: ");
		return new ResponseEntity<LineItem>(liservice.getLineItem(id), HttpStatus.OK);
		
	}


	@RequestMapping(value="/delete",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<String> removeOrder(@RequestBody LineItem i){
		System.out.println("removing order: ");
		liservice.deleteLineItem(i);
		return new ResponseEntity<String>("true", HttpStatus.OK);
		
	}
}
