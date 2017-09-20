package com.ims.beans.third;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.ims.beans.first.Customer;

@Entity
@Table(name="Orders")
public class Order implements Serializable {
    
    private static final long serialVersionID = 1L;
    
    @Id
    @Column(name="ORDER_ID")
    @SequenceGenerator(name="ORDERID_SEQ", sequenceName="ORDERID_SEQ")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ORDERID_SEQ")
    private int id;
    
    @ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name="CUSTOMER_ID",nullable=false)
    private Customer customer;
    
    @Column(nullable = false)
    private Timestamp orderDate;
    
    public Order() {
        super();
    }
    
    public Order(int id, Customer customer, Timestamp orderDate) {
		super();
		this.id = id;
		this.customer = customer;
		this.orderDate = orderDate;
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
	public Date getOrderDate() {
        return orderDate;
    }
    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }
	@Override
	public String toString() {
		return "Order [id=" + id + ", customer=" + customer.toString() +", orderDate=" + orderDate
				+ "]";
	}
    
    
}