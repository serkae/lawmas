package com.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.Admin;
import com.ims.daos.AdminDao;
import com.ims.dtos.AdminDto;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;

	public void setAdminDao(AdminDao adminDao) {
		this.adminDao = adminDao;
	}
	
	public AdminDto createAdmin(Admin admin) {
		//add to Db
		adminDao.addAdmin(admin);
		//get it back w/ id
		Admin a = adminDao.getAdminByUsernameAndPassword(admin.getEmail(),admin.getPassword());
		//create dto
		AdminDto adminDto = new AdminDto(a.getId(),a.getEmail(),a.getPassword(),true);
		
		return adminDto;
	}
	
	public AdminDto authenticateUser(AdminDto adminDto) {
		Admin admin = adminDao.getAdminByUsernameAndPassword(adminDto.getEmail(),adminDto.getPassword());
		if(admin != null) {
			adminDto.setAuthenticated(true);
			adminDto.setId(admin.getId());
		}
		
		return adminDto;
	}

}
