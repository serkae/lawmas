package com.ims.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.ProductReview;
import com.ims.daos.ProductReviewDao;
import com.ims.dtos.ProductReviewDto;


@Service
public class ProductReviewService {

	@Autowired
	private ProductReviewDao productReviewDao;

	public void setAdminDao(ProductReviewDao productReviewDao) {
		this.productReviewDao = productReviewDao;
	}
	
	public ProductReviewDto createOrUpdateAdmin(ProductReview productReview) {
		//add to Db
		productReview = productReviewDao.saveReview(productReview);
		//create dto
		ProductReviewDto productReviewDto = new ProductReviewDto(productReview.getId(),productReview.getRating(),productReview.getDescription());
		return productReviewDto;
	}
	
	public void removeAdmin(ProductReview productReview) {
		// remove from DB
		productReviewDao.removeReview(productReview);
	}
	
	public List<ProductReview> getAll() {
		return productReviewDao.getAll();
	}

}
