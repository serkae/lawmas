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

import com.ims.beans.Customer;
import com.ims.beans.InventoryItem;
import com.ims.beans.LineItem;
import com.ims.beans.Order;
import com.ims.services.CustomerService;
import com.ims.services.InventoryItemService;
import com.ims.services.LineItemService;
import com.ims.services.OrderService;

@RestController
@RequestMapping("/lineItem")
public class LineItemController {

	@Autowired
	LineItemService liservice;
	
	@Autowired
	InventoryItemService iiservice;
	
	@Autowired
	OrderService oservice;
	
	@Autowired
	CustomerService cservice;
	
	public void setLiService(LineItemService liservice) {
		this.liservice = liservice;
	}
	public void setIiservice(InventoryItemService iiservice) {
		this.iiservice = iiservice;
	}
	public void setOservice(OrderService oservice) {
		this.oservice = oservice;
	}
	public void setCservice(CustomerService cservice) {
		this.cservice = cservice;
	}
	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<LineItem> createOrder(@RequestBody LineItem i){
		InventoryItem a = iiservice.getById(i.getInventoryItem().getId());
		Order o = oservice.getOrder(i.getOrder().getId());
		Customer c = cservice.getById(o.getCustomer().getId());
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
