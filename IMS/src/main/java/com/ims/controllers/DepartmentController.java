package com.ims.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ims.beans.Department;
import com.ims.dtos.DepartmentDto;
import com.ims.services.DepartmentService;

@RestController
@RequestMapping(value="/department")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;
	
	public void setUserServiceImpl(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}
	
	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<DepartmentDto> addDepartment(@RequestBody DepartmentDto dDto){
		return new ResponseEntity<DepartmentDto>(departmentService.addDepartment(dDto), HttpStatus.OK);
	}
	
	@RequestMapping(value="/getAll",method=(RequestMethod.GET),produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<List<Department>> getAllDepartments(){
		return new ResponseEntity<List<Department>>(departmentService.getAllDepartments(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/update",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<DepartmentDto> updateDepartment(@RequestBody Department d){
		System.out.println("Updating: " + d.toString());
		return new ResponseEntity<DepartmentDto>(departmentService.updateDepartment(d), HttpStatus.OK);
	}
	
	@RequestMapping(value="/remove",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<DepartmentDto> removeDepartment(@RequestBody DepartmentDto dDto){
		return new ResponseEntity<DepartmentDto>(departmentService.removeDepartment(dDto), HttpStatus.OK);
	}
}
