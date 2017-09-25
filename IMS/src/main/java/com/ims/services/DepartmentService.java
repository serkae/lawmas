package com.ims.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.beans.Department;
import com.ims.daos.DepartmentDao;
import com.ims.dtos.DepartmentDto;

@Service
public class DepartmentService {

	@Autowired
	private DepartmentDao departmentDao;

	public void setAdminDao(DepartmentDao departmentDao) {
		this.departmentDao = departmentDao;
	}
	
	public DepartmentDto addDepartment(DepartmentDto dDto) {
		//set db
		Department d = new Department();
		d.setName(dDto.getName());
		//add
		departmentDao.addDepartment(d);
		//get back
		d = departmentDao.getDepartmentByName(d.getName());
		if(d != null) {
			dDto.setActionApplied(true);
		}
		else {
			dDto.setActionApplied(false);
		}
		return dDto;
	}
	
	public List<Department> getAllDepartments(){
		return departmentDao.getAll();
	}
	
	public DepartmentDto updateDepartment(Department d) {
		//init dto
		DepartmentDto dDto = new DepartmentDto();
		dDto.setName(d.getName());
		
		//send update, if failed then post action failed and return
		try {
			departmentDao.updateDepartment(d);
		}
		catch(Exception e) {
			e.printStackTrace();
			dDto.setActionApplied(false);
			return dDto;
		}
		//successful, so true
		dDto.setActionApplied(true);
		return dDto;
	} 
	
	public DepartmentDto removeDepartment(DepartmentDto dDto) {
		//set db
		Department d = new Department();
		//get back
		d = departmentDao.getDepartmentByName(dDto.getName());
		if(d != null) {
			departmentDao.removeDepartment(d);
			dDto.setActionApplied(true);
		}
		else {
			dDto.setActionApplied(false);
		}
		return dDto;
	}
}
