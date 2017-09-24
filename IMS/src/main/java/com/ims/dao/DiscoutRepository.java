package com.ims.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Discount;

public interface DiscoutRepository extends JpaRepository<Discount, Integer>{

}
