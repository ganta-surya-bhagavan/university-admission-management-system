package com.cg.UniversityAdmissionSystem.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.UniversityAdmissionSystem.Entity.User;



public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUserName(String username);
}
