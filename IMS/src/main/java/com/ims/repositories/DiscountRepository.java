package com.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Discount;

public interface DiscountRepository extends JpaRepository<Discount, Integer>{

}
