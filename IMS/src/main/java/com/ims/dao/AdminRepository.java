package com.ims.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.beans.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer>{

}
