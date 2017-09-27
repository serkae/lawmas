package com.ims.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{
	List<Order> findOrderByCustomerId(int id);
}
