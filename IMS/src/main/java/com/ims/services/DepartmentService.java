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

	public void setDepartmentDao(DepartmentDao departmentDao) {
		this.departmentDao = departmentDao;
	}
	
	public Department createOrUpdate(Department d) {
		return departmentDao.createOrUpdateDepartment(d);
	}
	
	public List<Department> getAll(){
		return departmentDao.getAll();
	}
	
	public Department getById(int id) {
		return departmentDao.getDepartmentById(id);
	}
	
	public DepartmentDto remove(Department d) {
		
		DepartmentDto dDto = new DepartmentDto();
		
		if(d != null) {
			dDto.setName(d.getName());
			departmentDao.removeDepartment(d);
			dDto.setActionApplied(true);
		}
		else {
			dDto.setName("null");
			dDto.setActionApplied(false);
		}
		return dDto;
	}
}
