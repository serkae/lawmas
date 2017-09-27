package com.ims.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.Customer;
import com.ims.beans.InventoryItem;
import com.ims.daos.CustomerDao;

@Service
public class CustomerService {

	@Autowired
	private CustomerDao customerDao;

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	public Customer createOrUpdate(Customer c) {
		return customerDao.createOrUpdateCustomer(c);
	}
	
	public List<Customer> getAll() {
		return customerDao.getAll();
	}

	public Customer getById(int i) {
		return customerDao.getCustomerById(i);
	}
	
	public void remove(Customer c) {
		customerDao.removeCustomer(c);
	}
}
