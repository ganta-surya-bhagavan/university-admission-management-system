package com.cg.UniversityAdmissionSystem.Service;

import java.util.List;
import java.util.Optional;

import com.cg.UniversityAdmissionSystem.Entity.Login;


public interface LoginService {

	public Optional<Login> login(String userName,String password,String role);
	public Login createNewMac(Login login);
	public List<Login> getUsers();

}
