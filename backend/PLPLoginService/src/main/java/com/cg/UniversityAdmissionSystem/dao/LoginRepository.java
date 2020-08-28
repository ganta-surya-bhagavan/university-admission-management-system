package com.cg.UniversityAdmissionSystem.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.UniversityAdmissionSystem.Entity.Login;



public interface LoginRepository extends JpaRepository<Login, String> {
	public Optional<Login> findByUserNameAndPasswordAndRole(String username,String password,String role);
	 public Login findByUserName(String userName);
}
