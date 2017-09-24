package com.ims.daoImps;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.LineItem;
import com.ims.repositories.LineItemRepository;



@Component
@Transactional
public class LineItemService {

	@Autowired
	private LineItemRepository aRepo;
	
	public LineItemService() {
		
	}
	
	public void setLineItemRepo(LineItemRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addLineItem(LineItem s) {
		aRepo.save(s);
	}
	public List<LineItem> getAll(){
		return (List<LineItem>) aRepo.findAll();
	}
	public LineItem getLineItemById(int id) {
		return aRepo.findOne(id);
	}
	public void updateLineItem(LineItem s) {
		aRepo.saveAndFlush(s);
	}
	public void removeLineItem(LineItem s) {
		aRepo.delete(s);
	}
}
