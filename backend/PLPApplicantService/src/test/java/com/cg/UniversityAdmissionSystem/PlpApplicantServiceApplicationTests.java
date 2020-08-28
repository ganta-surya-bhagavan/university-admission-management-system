package com.cg.UniversityAdmissionSystem;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cg.UniversityAdmissionSystem.Entity.Applicant;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlpApplicantServiceApplicationTests {

	@LocalServerPort
	int randomServerPort;
	
	
	
	@Test
	public void testGetAllApplicantSuccess() throws URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();
		final String url = "http://localhost:"+randomServerPort+"/applicantList";
		URI endPointURL = new URI(url);
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(endPointURL,String.class);
		Assertions.assertEquals(200,responseEntity.getStatusCodeValue());
		Assertions.assertNotEquals("",responseEntity.getBody());
	}
	
	@Test
	public void testGetAllScheduleSuccess() throws URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();
		final String url = "http://localhost:"+randomServerPort+"/applicantList/scheduleProgramId";
		URI endPointURL = new URI(url);
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(endPointURL,String.class);
		Assertions.assertEquals(200,responseEntity.getStatusCodeValue());
		Assertions.assertNotEquals("",responseEntity.getBody());
	}
	/*
	 * @Test public void testGetApplicantFailure() throws URISyntaxException {
	 * RestTemplate restTemplate = new RestTemplate(); final String url =
	 * "http://localhost:"+randomServerPort+"/applicantList/id=1"; URI endPointURL =
	 * new URI(url); try { restTemplate.getForEntity(endPointURL, Applicant.class);
	 * Assertions.fail(); } catch(HttpClientErrorException exception){
	 * Assertions.assertEquals(404,exception.getRawStatusCode());
	 * Assertions.assertTrue(exception.getMessage()!=null&&exception.getMessage().
	 * equals("No Applicant found with applicantId=1.")); } }
	 */

}
