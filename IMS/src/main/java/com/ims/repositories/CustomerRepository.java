package com.ims.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	List<Customer> findByEmailAndPassword(String email, String password);
	List<Customer> findBylastname(String lastname);
}
