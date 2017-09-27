package com.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Card;
import com.ims.daos.CardDao;
import com.ims.dtos.CardDto;

@Service

@Transactional
public class CardService {

	@Autowired
	private CardDao cDao;

	public void setcDao(CardDao cDao) {
		this.cDao = cDao;
	}
	
	public CardDto createCard(Card c) {
		c = cDao.addCard(c);
		CardDto dto = new CardDto(c.getId(), c.getCardnumber(), c.getNameoncard(), c.getExpiration(), 
				c.getSecuritycode(),true);
		return dto;
	}
	
	public void deleteCard(Card c) {
		cDao.removeCard(c);
	}
}
