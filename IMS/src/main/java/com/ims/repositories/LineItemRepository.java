package com.ims.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.LineItem;
import com.ims.beans.Order;

public interface LineItemRepository extends JpaRepository<LineItem, Integer>{

	List<LineItem> findByOrder(Order o);
	List<LineItem> findByOrderId(int id);
}
