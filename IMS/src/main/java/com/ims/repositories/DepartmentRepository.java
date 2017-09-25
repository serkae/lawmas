package com.ims.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ims.beans.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer>{

	List<Department> findByName(String name);
	
	@Modifying
	@Query("update Department d set d.name = ?1 where d.id = ?2")
	void setDepartmentById(String name, int id);
}
