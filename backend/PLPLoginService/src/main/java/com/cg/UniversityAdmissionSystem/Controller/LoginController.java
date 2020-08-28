package com.cg.UniversityAdmissionSystem.Controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.UniversityAdmissionSystem.Service.LoginService;
import com.cg.UniversityAdmissionSystem.util.JwtUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import com.cg.UniversityAdmissionSystem.Entity.AuthRequest;
import com.cg.UniversityAdmissionSystem.Entity.Login;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Api("Login Service")
public class LoginController {

	@Autowired
	LoginService loginService;
	Logger logger=LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
	
    @CrossOrigin(origins = "http://localhost:4200")
	@ApiOperation(value = "Check that Username And Password is correct or not")
	 @GetMapping(
	            value= "/userList/login",
	            headers = "Accept=application/json",
	            produces = "application/json"
	    )
	 public Optional<Login> login(@RequestParam("userName") String userName,
			 					  @RequestParam("password") String password,
			 					  @RequestParam("role") String role)
	 {
		logger.info("Login is Successfull");
		 return loginService.login(userName, password, role);
	 }
	 
	 @ApiOperation(value = "Add a New MAC")
	 @ApiResponses(value= {
				@ApiResponse(code = 200, message = "Successfully added to Login List"),
			    @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			    @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			    @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
		})
	 @PostMapping(value = "/userList", consumes = "application/json", produces = "application/json")
		public Login createNewMac(@ApiParam(value="Login in JSON Format")@RequestBody Login login) {
		 logger.info("MAC is created Successfully");
			return loginService.createNewMac(login);
		}
	 
	 @ApiOperation(value = "Get A User List")
	 @GetMapping(value = "/userList", produces = "application/json")
		public List<Login> getUserList() {
			List<Login> userList = null;

			userList = loginService.getUsers();
			logger.info("Return the UserList Successfully");

			return userList;
		}
	 @PostMapping("/authenticate")
	    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
	        try {
	            authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
	            );
	        } catch (Exception ex) {
	            throw new Exception("inavalid username/password");
	        }
	        return jwtUtil.generateToken(authRequest.getUserName());
	    }



}
