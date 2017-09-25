package com.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.daos.InventoryItemDao;

@Service
public class InventoryItemService {

	@Autowired
	private InventoryItemDao inventoryItemDao;

	public void setInventoryItemDao(InventoryItemDao inventoryItemDao) {
		this.inventoryItemDao = inventoryItemDao;
	}
	
	
}
