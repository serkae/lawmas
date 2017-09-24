package com.ims.daoImps;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Order;
import com.ims.repositories.OrderRepository;


@Component
@Transactional
public class OrderService {

	@Autowired
	private OrderRepository aRepo;
	
	public OrderService() {
		
	}
	
	public void setOrderRepo(OrderRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addOrder(Order s) {
		aRepo.save(s);
	}
	public List<Order> getAll(){
		return (List<Order>) aRepo.findAll();
	}
	public Order getOrderById(int id) {
		return aRepo.findOne(id);
	}
	public void updateOrder(Order s) {
		aRepo.saveAndFlush(s);
	}
	public void removeOrder(Order s) {
		aRepo.delete(s);
	}
}
