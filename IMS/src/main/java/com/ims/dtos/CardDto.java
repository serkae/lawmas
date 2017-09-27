package com.ims.dtos;

public class CardDto {

	private int id;
	private String cardnumber;
	private String nameoncard;
	private String expiration;
	private String securitycode;
	private boolean authenticated;
	
	public CardDto(int id, String cardnumber, String nameoncard, String expiration, String securitycode,
			boolean authenticated) {
		super();
		this.id = id;
		this.cardnumber = cardnumber;
		this.nameoncard = nameoncard;
		this.expiration = expiration;
		this.securitycode = securitycode;
		this.authenticated = authenticated;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCardnumber() {
		return cardnumber;
	}

	public void setCardnumber(String cardnumber) {
		this.cardnumber = cardnumber;
	}

	public String getNameoncard() {
		return nameoncard;
	}

	public void setNameoncard(String nameoncard) {
		this.nameoncard = nameoncard;
	}

	public String getExpiration() {
		return expiration;
	}

	public void setExpiration(String expiration) {
		this.expiration = expiration;
	}

	public String getSecuritycode() {
		return securitycode;
	}

	public void setSecuritycode(String securitycode) {
		this.securitycode = securitycode;
	}

	public boolean isAuthenticated() {
		return authenticated;
	}

	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}

	@Override
	public String toString() {
		return "CardDto [id=" + id + ", cardnumber=" + cardnumber + ", nameoncard=" + nameoncard + ", expiration="
				+ expiration + ", securitycode=" + securitycode + ", authenticated=" + authenticated + "]";
	}
	
	
	
	


}
