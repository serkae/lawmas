package com.ims.dtos;

public class ProductReviewDto {
	private int id;
	private int rating;
	private String description;
	
	public ProductReviewDto() {}

	public ProductReviewDto(int id, int rating, String description) {
		super();
		this.id = id;
		this.rating = rating;
		this.description = description;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "ProductReviewDto [id=" + id + ", rating=" + rating + ", description=" + description + "]";
	}
	
}
