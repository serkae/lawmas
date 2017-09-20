package com.ims.beans;

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

@Entity
@Table(name="InventoryItem")
public class InventoryItem {
	
	@Id
	@Column(name="inv_item_id")
	@SequenceGenerator(name="inv_item_id_seq", sequenceName="inv_item_id_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="inv_item_id_seq")
	private int id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="DEPARTMENT_ID")
	private Department department;
	
	@Column(name="unit_price",nullable=false)
	private float unitPrice;
	
	@Column(name="quantity",nullable=false)
	private int quantity;
	
	@Column(name="description")
	private String description;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="discount_id")
	private Discount discount;
	
	@Column(name="image")
	private String image;
	
	@Column(name="rating")
	private float rating;

	public InventoryItem() {}
	
	public InventoryItem(int id, Department department, float unitPrice, int quantity, String description,
			Discount discount, String image, float rating) {
		super();
		this.id = id;
		this.department = department;
		this.unitPrice = unitPrice;
		this.quantity = quantity;
		this.description = description;
		this.discount = discount;
		this.image = image;
		this.rating = rating;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(float unitPrice) {
		this.unitPrice = unitPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	

	public Department getDepartment() {
		return department;
	}



	public void setDepartment(Department department) {
		this.department = department;
	}



	public Discount getDiscount() {
		return discount;
	}



	public void setDiscount(Discount discount) {
		this.discount = discount;
	}



	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}



	@Override
	public String toString() {
		return "InventoryItem [id=" + id + ", department=" + department.toString() + ", unitPrice=" + unitPrice + ", quantity="
				+ quantity + ", description=" + description + ", discount=" + discount.getDescription() + ", image=" + image
				+ ", rating=" + rating + "]";
	}

	
	
	
}