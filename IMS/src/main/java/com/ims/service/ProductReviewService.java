package com.ims.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import com.ims.beans.ProductReview;

import com.ims.dao.ProductReviewRepository;

@Component
@Transactional
public class ProductReviewService {

	@Autowired
	private ProductReviewRepository aRepo;
	
	public ProductReviewService() {
		
	}
	
	public void setProductReviewRepo(ProductReviewRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addReview(ProductReview s) {
		aRepo.save(s);
	}
	public List<ProductReview> getAll(){
		return (List<ProductReview>) aRepo.findAll();
	}
	public ProductReview getReviewById(int id) {
		return aRepo.findOne(id);
	}
	public void updateReview(ProductReview s) {
		aRepo.saveAndFlush(s);
	}
	public void removeReview(ProductReview s) {
		aRepo.delete(s);
	}
}
