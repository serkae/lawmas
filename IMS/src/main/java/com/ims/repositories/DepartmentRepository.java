package com.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer>{

}
