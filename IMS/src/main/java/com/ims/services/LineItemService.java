package com.ims.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.LineItem;
import com.ims.beans.Order;
import com.ims.daos.LineItemDao;
import com.ims.dtos.LineItemDto;

@Service
public class LineItemService {

	@Autowired
	LineItemDao dao;

	public void setDao(LineItemDao dao) {
		this.dao = dao;
	}

	public LineItemDto createOrUpdateLineItem(LineItem i) {
		i = dao.addLineItem(i);
		return new LineItemDto(i.getId(),i.getOrder().getId(),i.getQuantity(),i.getInventoryItem().getId());
	}

	public List<LineItemDto> getAllLineItems(){
		List<LineItemDto> dto = new ArrayList<LineItemDto>();

		List<LineItem> result = dao.getAll();
		for(LineItem i : result) {
			//dto format : id, orderid,quantity, inventoryitem id
			dto.add(new LineItemDto(i.getId(),i.getOrder().getId(),i.getQuantity(),i.getInventoryItem().getId()));
		}
		return dto;
	}

	public List<LineItemDto> getAllLineItemsByOrder(Order o){
		List<LineItemDto> dto = new ArrayList<LineItemDto>();

		List<LineItem> result = dao.getAllByOrder(o);
		for(LineItem i : result) {
			//dto format : id, orderid,quantity, inventoryitem id
			dto.add(new LineItemDto(i.getId(),i.getOrder().getId(),i.getQuantity(),i.getInventoryItem().getId()));
		}
		return dto;
	}

	public LineItemDto getLineItemDto(int id){
		LineItem i = dao.getLineItemById(id);
		return new LineItemDto(i.getId(),i.getOrder().getId(),i.getQuantity(),i.getInventoryItem().getId());
	}
	
	public LineItem getLineItem(int id){
		return dao.getLineItemById(id);
	}

	public void deleteLineItem(LineItem i) {
		dao.removeLineItem(i);
	}
}
