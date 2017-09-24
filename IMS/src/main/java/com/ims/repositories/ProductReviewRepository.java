package com.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.ProductReview;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {

}
