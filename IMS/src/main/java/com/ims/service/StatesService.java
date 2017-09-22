package com.ims.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.State;
import com.ims.dao.StateRepository;

@Component
@Transactional
public class StatesService {

	@Autowired
	private StateRepository sRepo;
	
	public StatesService() {
		
	}
	
	public void setStateRepo(StateRepository sRepo) {
		this.sRepo = sRepo;
	}
	
	public void add(State s) {
		sRepo.save(s);
	}
	public List<State> getAll(){
		return (List<State>) sRepo.findAll();
	}
}
