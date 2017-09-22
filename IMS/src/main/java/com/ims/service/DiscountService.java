package com.ims.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Discount;
import com.ims.dao.DiscoutRepository;

@Component
@Transactional
public class DiscountService {
	
	@Autowired
	private DiscoutRepository aRepo; //i spelled it wrong...
	
	public DiscountService() {
		
	}
	
	public void setDiscountRepo(DiscoutRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addDiscount(Discount s) {
		aRepo.save(s);
	}
	public List<Discount> getAll(){
		return (List<Discount>) aRepo.findAll();
	}
	public Discount getDiscountById(int id) {
		return aRepo.findOne(id);
	}
	public void updateState(Discount s) {
		aRepo.saveAndFlush(s);
	}
	public void removeDepartment(Discount s) {
		aRepo.delete(s);
	}

}
