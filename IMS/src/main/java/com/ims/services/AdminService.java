package com.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.Admin;
import com.ims.daoImps.AdminDao;
import com.ims.dtos.AdminDto;

@Service
public class AdminService {

	@Autowired
	private AdminDao adminDao;

	public void setAdminDao(AdminDao adminDao) {
		this.adminDao = adminDao;
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
