package com.ims.daoImps;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Customer;
import com.ims.repositories.CustomerRepository;

@Component
@Transactional
public class CustomerService {
	
	@Autowired
	private CustomerRepository aRepo;
	
	public CustomerService() {
		
	}
	
	public void setCustomerRepo(CustomerRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addCustomer(Customer s) {
		aRepo.save(s);
	}
	public List<Customer> getAll(){
		return (List<Customer>) aRepo.findAll();
	}
	public Customer getCustomerById(int id) {
		return aRepo.findOne(id);
	}
	public void updateCustomer(Customer s) {
		aRepo.saveAndFlush(s);
	}
	public void removeCustomer(Customer s) {
		aRepo.delete(s);
	}

}
