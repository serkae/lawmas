package com.ims.dtos;

import java.sql.Timestamp;

import com.ims.beans.Customer;

public class OrderDto {
	
	private int id;
	private Customer customer;
	private Timestamp orderdate;
	private boolean autheticated;
	public OrderDto(int id, Customer customer, Timestamp orderdate, boolean autheticated) {
		super();
		this.id = id;
		this.customer = customer;
		this.orderdate = orderdate;
		this.autheticated = autheticated;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Timestamp getOrderdate() {
		return orderdate;
	}
	public void setOrderdate(Timestamp orderdate) {
		this.orderdate = orderdate;
	}
	public boolean isAutheticated() {
		return autheticated;
	}
	public void setAutheticated(boolean autheticated) {
		this.autheticated = autheticated;
	}
	@Override
	public String toString() {
		return "OrderDto [id=" + id + ", customer=" + customer + ", orderdate=" + orderdate + ", autheticated="
				+ autheticated + "]";
	}
	
	

}
