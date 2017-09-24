package com.ims.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.InventoryItem;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Integer> {

}
