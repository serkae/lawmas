package com.ims.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ims.beans.Admin;
import com.ims.dtos.AdminDto;
import com.ims.services.AdminService;

@RestController
@RequestMapping(value="/admin")
public class AdminController {

	
	@Autowired
	private AdminService adminService;
	
	public void setUserServiceImpl(AdminService adminService) {
		this.adminService = adminService;
	}
	
	@RequestMapping(value="/auth",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<AdminDto> authenticateUser(@RequestBody AdminDto adminDto){
		System.out.println("Authenticating user: "+adminDto.getEmail());
		return new ResponseEntity<AdminDto>(adminService.authenticateUser(adminDto), HttpStatus.OK);
	}
	
	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<AdminDto> registerUser(@RequestBody Admin admin){
		System.out.println("Creating user: "+admin.getEmail());
		return new ResponseEntity<AdminDto>(adminService.createAdmin(admin), HttpStatus.OK);
		
	}
	

	
	
}
