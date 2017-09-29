package com.ims.dtos;

public class CustomerDto {


	private int id;
	private String email;
	private String password;
	private boolean authenticated;

	public CustomerDto(int id, String email, String password, boolean authenticated) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.authenticated = authenticated;
	}
	public CustomerDto() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isAuthenticated() {
		return authenticated;
	}
	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}
	@Override
	public String toString() {
		return "CustomerDto [id=" + id + ", email=" + email + ", password=" + password + ", authenticated="
				+ authenticated + "]";
	}

}
