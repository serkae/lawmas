package com.ims.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.LineItem;

public interface LineItemRepository extends JpaRepository<LineItem, Integer>{

}
