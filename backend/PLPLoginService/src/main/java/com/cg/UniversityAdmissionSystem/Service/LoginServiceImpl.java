package com.cg.UniversityAdmissionSystem.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.cg.UniversityAdmissionSystem.Entity.Login;
import com.cg.UniversityAdmissionSystem.Exception.NotFoundException;
import com.cg.UniversityAdmissionSystem.dao.LoginRepository;
import com.cg.UniversityAdmissionSystem.Exception.DuplicateException;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	LoginRepository loginRepo;
	
	
	public List<Login> getUsers()
	{
		return loginRepo.findAll();
		
	}
	
	@Override
	public Optional<Login> login(String userName, String password, String role) {
		if(loginRepo.findByUserNameAndPasswordAndRole(userName,password,role).isPresent())
		{
			return loginRepo.findByUserNameAndPasswordAndRole(userName,password,role);
		}
		else
		{
			throw new NotFoundException("LogIn information is incorrect");
		}
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public Login createNewMac(Login login) {
		if(loginRepo.findByUserName(login.getUserName())==null)
			return loginRepo.save(login);
		else
			throw new DuplicateException("Username is already present");
	}
}
