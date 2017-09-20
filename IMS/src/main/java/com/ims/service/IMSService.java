package com.ims.service;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.ims.dao.IMSDao;

public class IMSService {

	private IMSDao dao;

	public IMSService() {
		AbstractApplicationContext ac = new ClassPathXmlApplicationContext("beans.xml");

		IMSDao dao = (IMSDao) ac.getBean("myDAO");
		this.dao = dao;
	}

}
