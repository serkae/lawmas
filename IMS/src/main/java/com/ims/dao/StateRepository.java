package com.ims.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.State;


public interface StateRepository extends JpaRepository<State, Integer> {

}
