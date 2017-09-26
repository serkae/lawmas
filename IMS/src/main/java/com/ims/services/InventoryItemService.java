package com.ims.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.InventoryItem;
import com.ims.daos.InventoryItemDao;

@Service
public class InventoryItemService {

	@Autowired
	private InventoryItemDao inventoryItemDao;

	public void setInventoryItemDao(InventoryItemDao inventoryItemDao) {
		this.inventoryItemDao = inventoryItemDao;
	}

	public InventoryItem createOrUpdate(InventoryItem i) {
		return inventoryItemDao.createOrUpdateInventoryItem(i);
	}

	public List<InventoryItem> getAll() {
		return inventoryItemDao.getAll();
	}
	
	public InventoryItem getById(int i) {
		return inventoryItemDao.getInventoryItemById(i);
	}

	public void remove(InventoryItem i) {
		inventoryItemDao.removeInventoryItem(i);
	}
	
	
}
