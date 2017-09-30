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
import com.ims.beans.Order;
import com.ims.services.LineItemService;
import com.ims.services.OrderService;

@RestController
@RequestMapping(value = "/order")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	@Autowired
	private LineItemService lservice;
	
	public void setOrderService(OrderService orderService) {
		this.orderService = orderService;
	}
	public void setLservice(LineItemService lservice) {
		this.lservice = lservice;
	}
	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<Order> createOrder(@RequestBody Order o){
		return new ResponseEntity<Order>(orderService.createOrUpdateOrder(o), HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/update",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<Order> updateOrder(@RequestBody Order o){
		System.out.println("Creating card: " + o.getId());
		return new ResponseEntity<Order>(orderService.createOrUpdateOrder(o), HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/getAll",method=(RequestMethod.GET),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<List<Order>> getAllOrders(){
		System.out.println("Listing orders: ");
		return new ResponseEntity<List<Order>>(orderService.getAllOrders(), HttpStatus.OK);
		
	}
	

	@RequestMapping(value="/getAllByCustomerId",method=(RequestMethod.GET),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<List<Order>> getAllOrdersFromCustomerId(int id){
		System.out.println("Listing orders: ");
		return new ResponseEntity<List<Order>>(orderService.getAllOrdersFromCustomerId(id), HttpStatus.OK);
		
	}
	

	@RequestMapping(value="/getOrder",method=(RequestMethod.GET),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<Order> getOrder(int id){
		System.out.println("Listing orders: ");
		return new ResponseEntity<Order>(orderService.getOrder(id), HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/getPrice",method=(RequestMethod.GET),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<Integer> getPrice(int id){
		
		//get order obj
		Order o = orderService.getOrder(id);
		//get all line items by order
		List<LineItem> items = lservice.getAllLineItemsByOrder(o);
		
		//calculate price
		int price = 0;
		for(LineItem i : items) {
			//price = price + unitprice * quantity
			price += (i.getInventoryItem().getUnitPrice() * i.getQuantity());
		}
		
		return new ResponseEntity<Integer>(price, HttpStatus.OK);
		
	}


	@RequestMapping(value="/delete",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<String> removeOrder(@RequestBody Order o){
		System.out.println("removing order: ");
		o.setCustomer(null);
		orderService.deleteOrder(o);
		return new ResponseEntity<String>("true", HttpStatus.OK);
		
	}
}
