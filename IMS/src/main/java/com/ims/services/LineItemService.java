package com.ims.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.LineItem;
import com.ims.beans.Order;
import com.ims.daos.LineItemDao;
import com.ims.repositories.LineItemRepository;

@Service
public class LineItemService {

	@Autowired
	LineItemDao dao;
	
	@Autowired
	LineItemRepository lineItemRepository;

	public void setDao(LineItemDao dao) {
		this.dao = dao;
	}
	
	public LineItem createOrUpdateLineItem(LineItem i) {
		return dao.addLineItem(i);
	}
	
	public List<LineItem> getAllLineItems(){
		return dao.getAll();
	}
	
	public List<LineItem> getAllLineItemsByOrder(Order o){
		return dao.getAllByOrder(o);
	}
	
	public LineItem getLineItem(int id){
		return dao.getLineItemById(id);
	}
	
	public void deleteLineItem(LineItem i) {
		dao.removeLineItem(i);
	}

	public List<Object> findBySoldByDate() {
		return lineItemRepository.findBySoldByDate();
	}
	
	public List<Object> findBySoldByDept() {
		return lineItemRepository.findBySoldByDept();
	}
}
