package com.ims.daoImps;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.InventoryItem;
import com.ims.repositories.InventoryItemRepository;

@Component
@Transactional
public class InventoryItemService {

	@Autowired
	private InventoryItemRepository aRepo;
	
	public InventoryItemService() {
		
	}
	
	public void setInventoryItemRepo(InventoryItemRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addInventoryItem(InventoryItem s) {
		aRepo.save(s);
	}
	public List<InventoryItem> getAll(){
		return (List<InventoryItem>) aRepo.findAll();
	}
	public InventoryItem getInventoryItemById(int id) {
		return aRepo.findOne(id);
	}
	public void updateInventoryItem(InventoryItem s) {
		aRepo.saveAndFlush(s);
	}
	public void removeInventoryItem(InventoryItem s) {
		aRepo.delete(s);
	}
}