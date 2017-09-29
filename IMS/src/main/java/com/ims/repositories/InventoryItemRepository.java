package com.ims.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Department;
import com.ims.beans.Discount;
import com.ims.beans.InventoryItem;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Integer> {

	List<InventoryItem> findByDepartment(Department d);
	
	List<InventoryItem> findByDepartmentId(int d);
	
	List<InventoryItem> findByDiscount(Discount d);
	
	
}
