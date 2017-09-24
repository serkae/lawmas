package com.ims.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{

}
