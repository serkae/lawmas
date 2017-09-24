package com.ims.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Admin;
import com.ims.dao.AdminRepository;

@Component
@Transactional
public class AdminService {

	@Autowired
	private AdminRepository aRepo;
	
	public AdminService() {
		
	}
	
	public void setAdminRepo(AdminRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addAdmin(Admin s) {
		aRepo.save(s);
	}
	public List<Admin> getAll(){
		return (List<Admin>) aRepo.findAll();
	}
	public Admin getAdminById(int id) {
		return aRepo.findOne(id);
	}
	public void updateAdmin(Admin s) {
		aRepo.saveAndFlush(s);
	}
	public void removeAdmin(Admin s) {
		aRepo.delete(s);
	}
}
