package com.ims.daoImps;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.Card;
import com.ims.repositories.CardRepository;

@Component
@Transactional
public class CardService {

	@Autowired
	private CardRepository aRepo;
	
	public CardService() {
		
	}
	
	public void setCardRepo(CardRepository aRepo) {
		this.aRepo = aRepo;
	}
	
	public void addCard(Card s) {
		aRepo.save(s);
	}
	public List<Card> getAll(){
		return (List<Card>) aRepo.findAll();
	}
	public Card getCardById(int id) {
		return aRepo.findOne(id);
	}
	public void updateCard(Card s) {
		aRepo.saveAndFlush(s);
	}
	public void removeCard(Card s) {
		aRepo.delete(s);
	}
}
